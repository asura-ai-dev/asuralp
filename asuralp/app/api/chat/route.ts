import { NextResponse } from "next/server";

type ChatPayload = {
  message?: string;
  payload?: {
    service?: string;
    answers?: Record<string, string>;
    contact?: string;
  };
};

const FALLBACK_REPLY =
  "ありがとうございます!内容を確認し、折り返しご連絡します。少々お待ちください。";

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

const normalizeText = (value: string | undefined) => value?.trim() ?? "";

const formatDiscordContent = (body: ChatPayload) => {
  const message = normalizeText(body.message);
  const service = normalizeText(body.payload?.service);
  const contact = normalizeText(body.payload?.contact);
  const answers = body.payload?.answers ?? {};
  const time = new Date().toISOString();

  if (service) {
    const answerLines = Object.entries(answers)
      .map(([key, value]) => {
        const answer = value.trim();

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
    `Time: ${time}`,
    `Message: ${message}`,
  ].join("\n");
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatPayload;
    const content = formatDiscordContent(body);

    if (!content) {
      return NextResponse.json(
        { ok: false, error: "message or payload is required" },
        { status: 400 },
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (webhookUrl) {
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
      reply: webhookUrl
        ? "ありがとうございます!内容を確認し、折り返しご連絡します。少々お待ちください。"
        : FALLBACK_REPLY,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid request body" },
      { status: 400 },
    );
  }
}
