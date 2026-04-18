import { NextResponse } from "next/server";

type ChatPayload = {
  message?: string;
};

const FALLBACK_REPLY =
  "メッセージを受け取りました。内容を確認して、折り返しご連絡します。";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatPayload;
    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        { ok: false, error: "message is required" },
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
          content: [
            "New inquiry from ASURA LP",
            `Time: ${new Date().toISOString()}`,
            `Message: ${message}`,
          ].join("\n"),
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
        ? "送信できました。Discord に通知し、折り返しの準備を始めています。"
        : FALLBACK_REPLY,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid request body" },
      { status: 400 },
    );
  }
}
