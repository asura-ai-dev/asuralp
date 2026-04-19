import { NextResponse } from "next/server";

type ChatPayload = {
  message?: string;
  payload?: {
    service?: string;
    answers?: Record<string, string>;
    contact?: string;
  };
};

type IncomingChatPayload = {
  message?: unknown;
  payload?: {
    service?: unknown;
    answers?: unknown;
    contact?: unknown;
  };
};

const FALLBACK_REPLY =
  "ご要望を確認しました。内容を確認し、折り返しご連絡します。";

const MAX_BODY_BYTES = 10_000;
const MAX_FIELD_LENGTH = 800;
const MAX_DISCORD_CONTENT_LENGTH = 1_900;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

const ALLOWED_SERVICE_LABELS = new Set([
  "LP制作",
  "AI導入支援",
  "アプリ開発",
  "Claude Code講座",
  "その他",
]);

const JAPAN_TIME_FORMATTER = new Intl.DateTimeFormat("ja-JP", {
  day: "2-digit",
  hour: "2-digit",
  hour12: false,
  hourCycle: "h23",
  minute: "2-digit",
  month: "2-digit",
  second: "2-digit",
  timeZone: "Asia/Tokyo",
  year: "numeric",
});

const ANSWER_LABELS: Record<string, string> = {
  industry: "業種",
  image: "イメージ",
  budget: "予算感",
  challenge: "業務課題",
  aiExperience: "AI経験",
  appIdea: "作りたいもの",
  appType: "アプリ種別",
  detail: "相談内容",
};

const ALLOWED_ANSWER_KEYS = new Set(Object.keys(ANSWER_LABELS));

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const normalizeText = (value: unknown, maxLength = MAX_FIELD_LENGTH) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
};

const sanitizeDiscordText = (value: string) =>
  value
    .replace(/@/g, "@\u200B")
    .replace(
      /https:\/\/(?:canary\.|ptb\.)?discord(?:app)?\.com\/api\/webhooks\/\S+/gi,
      "[discord-webhook-redacted]",
    );

const limitDiscordContent = (content: string) => {
  if (content.length <= MAX_DISCORD_CONTENT_LENGTH) {
    return content;
  }

  return `${content.slice(0, MAX_DISCORD_CONTENT_LENGTH)}\n[内容が長いため一部省略]`;
};

const formatJapanTime = (date = new Date()) => {
  const parts = JAPAN_TIME_FORMATTER.formatToParts(date);
  const valueByType = Object.fromEntries(
    parts.map((part) => [part.type, part.value]),
  );

  return `${valueByType.year}-${valueByType.month}-${valueByType.day} ${valueByType.hour}:${valueByType.minute}:${valueByType.second} JST`;
};

const formatDiscordContent = (body: ChatPayload) => {
  const message = sanitizeDiscordText(normalizeText(body.message));
  const service = sanitizeDiscordText(normalizeText(body.payload?.service));
  const contact = sanitizeDiscordText(normalizeText(body.payload?.contact));
  const answers = body.payload?.answers ?? {};
  const time = formatJapanTime();

  if (service) {
    const answerLines = Object.entries(answers)
      .map(([key, value]) => {
        if (!ALLOWED_ANSWER_KEYS.has(key)) {
          return null;
        }

        const answer = sanitizeDiscordText(normalizeText(value));

        if (!answer) {
          return null;
        }

        return `${ANSWER_LABELS[key] ?? key}: ${answer}`;
      })
      .filter((line): line is string => Boolean(line));

    return [
      `新しい相談: ${service}`,
      ...answerLines,
      contact ? `連絡先: ${contact}` : null,
      `時刻: ${time}`,
    ]
      .filter((line): line is string => Boolean(line))
      .join("\n");
  }

  if (!message) {
    return "";
  }

  return [
    "New inquiry from ASURA LP",
    `Time (JST): ${time}`,
    `Message: ${message}`,
  ].join("\n");
};

const createError = (error: string, status: number, headers?: HeadersInit) =>
  NextResponse.json({ ok: false, error }, { status, headers });

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const normalizePayload = (body: IncomingChatPayload): ChatPayload | null => {
  const message = normalizeText(body.message);

  if (!isRecord(body.payload)) {
    return message ? { message } : null;
  }

  const service = normalizeText(body.payload.service, 80);

  if (service && !ALLOWED_SERVICE_LABELS.has(service)) {
    return null;
  }

  const contact = normalizeText(body.payload.contact);
  const answers: Record<string, string> = {};

  if (isRecord(body.payload.answers)) {
    Object.entries(body.payload.answers).forEach(([key, value]) => {
      if (!ALLOWED_ANSWER_KEYS.has(key)) {
        return;
      }

      const answer = normalizeText(value);

      if (answer) {
        answers[key] = answer;
      }
    });
  }

  if (!service && !message) {
    return null;
  }

  return {
    message,
    payload: {
      service,
      answers,
      contact,
    },
  };
};

const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
};

const checkRateLimit = (key: string) => {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, retryAfter: 0 };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return { allowed: true, retryAfter: 0 };
};

const toHost = (value: string | undefined) => {
  if (!value) {
    return null;
  }

  const trimmedValue = value.trim();

  try {
    if (trimmedValue.includes("://")) {
      return new URL(trimmedValue).host.toLowerCase();
    }

    return trimmedValue.toLowerCase();
  } catch {
    return trimmedValue.toLowerCase();
  }
};

const getAllowedHosts = (request: Request) => {
  const hosts = [
    request.headers.get("host") ?? undefined,
    request.headers.get("x-forwarded-host") ?? undefined,
    process.env.VERCEL_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.ALLOWED_ORIGIN,
  ]
    .flatMap((value) => value?.split(",") ?? [])
    .map((value) => toHost(value.trim()))
    .filter((value): value is string => Boolean(value));

  return new Set(hosts);
};

const isAllowedOrigin = (request: Request) => {
  const origin = request.headers.get("origin");

  if (!origin) {
    return false;
  }

  const originHost = toHost(origin);

  if (!originHost) {
    return false;
  }

  return getAllowedHosts(request).has(originHost);
};

const isAllowedDiscordWebhook = (webhookUrl: string) => {
  try {
    const url = new URL(webhookUrl);
    const isDiscordHost =
      url.hostname === "discord.com" ||
      url.hostname === "discordapp.com" ||
      url.hostname.endsWith(".discord.com") ||
      url.hostname.endsWith(".discordapp.com");

    return (
      url.protocol === "https:" &&
      isDiscordHost &&
      url.pathname.startsWith("/api/webhooks/")
    );
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  try {
    if (!isAllowedOrigin(request)) {
      return createError("request origin is not allowed", 403);
    }

    const rateLimit = checkRateLimit(getClientIp(request));

    if (!rateLimit.allowed) {
      return createError("too many requests", 429, {
        "Retry-After": String(rateLimit.retryAfter),
      });
    }

    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.toLowerCase().includes("application/json")) {
      return createError("content-type must be application/json", 415);
    }

    const contentLength = Number(request.headers.get("content-length") ?? "0");

    if (contentLength > MAX_BODY_BYTES) {
      return createError("request body is too large", 413);
    }

    const rawBody = await request.text();

    if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
      return createError("request body is too large", 413);
    }

    const body = normalizePayload(
      JSON.parse(rawBody) as IncomingChatPayload,
    );

    if (!body) {
      return createError("message or payload is required", 400);
    }

    const content = limitDiscordContent(formatDiscordContent(body));

    if (!content) {
      return NextResponse.json(
        { ok: false, error: "message or payload is required" },
        { status: 400 },
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (webhookUrl) {
      if (!isAllowedDiscordWebhook(webhookUrl)) {
        return createError("notification endpoint is not configured", 500);
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "ASURA LP Bot",
          content,
        }),
      });

      if (!response.ok) {
        return NextResponse.json(
          { ok: false, error: "failed to notify discord" },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({
      ok: true,
      reply: FALLBACK_REPLY,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid request body" },
      { status: 400 },
    );
  }
}
