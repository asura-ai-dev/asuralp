"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

type Step =
  | "start"
  | "lp-1"
  | "lp-2"
  | "lp-3"
  | "ai-1"
  | "ai-2"
  | "app-1"
  | "app-2"
  | "other-1"
  | "contact"
  | "done";

type ServiceLabel =
  | "LP制作"
  | "AI導入支援"
  | "アプリ開発"
  | "Claude Code講座"
  | "その他";

type ChatOption = {
  label: string;
};

type InquiryPayload = {
  service: ServiceLabel;
  answers: Record<string, string>;
  contact: string;
};

type ChatResponse = {
  error?: string;
  ok?: boolean;
  reply?: string;
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "assistant-initial",
    role: "assistant",
    text: "こんにちは!ASURA.AIです。ご興味のあるサービスを選んでください。",
  },
];

const STEP_OPTIONS: Partial<Record<Step, ChatOption[]>> = {
  start: [
    { label: "LP制作" },
    { label: "AI導入支援" },
    { label: "アプリ開発" },
    { label: "Claude Code講座" },
    { label: "その他" },
  ],
  "lp-3": [
    { label: "5万円未満" },
    { label: "5万〜10万円" },
    { label: "10万〜20万円" },
    { label: "20万円以上" },
    { label: "相談したい" },
  ],
  "ai-2": [
    { label: "ほぼない" },
    { label: "少し使ったことがある" },
    { label: "日常的に使っている" },
  ],
  "app-2": [
    { label: "Webアプリ" },
    { label: "スマホアプリ(iOS/Android)" },
    { label: "業務ツール・Chrome拡張など" },
    { label: "まだ決めていない" },
  ],
};

const TEXT_STEPS: Step[] = [
  "lp-1",
  "lp-2",
  "ai-1",
  "app-1",
  "other-1",
  "contact",
];

const TEXT_PLACEHOLDERS: Partial<Record<Step, string>> = {
  "lp-1": "例: 美容サロン、士業、採用サービスなど",
  "lp-2": "参考URL、雰囲気、スクリーンショットの説明など",
  "ai-1": "例: 問い合わせ対応に時間がかかる、資料作成を効率化したいなど",
  "app-1": "例: 予約管理、社内ツール、マッチングアプリなど",
  "other-1": "相談したい内容を入力してください",
  contact: "メールアドレス、Xアカウント、希望の連絡方法など",
};

const createMessageId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [step, setStep] = useState<Step>("start");
  const [service, setService] = useState<ServiceLabel | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [optionsDisabled, setOptionsDisabled] = useState(false);
  const [statusText, setStatusText] = useState("待機中");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const optionLockRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, step]);

  useEffect(() => {
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const appendMessage = (role: ChatMessage["role"], text: string) => {
    setMessages((current) => [
      ...current,
      {
        id: createMessageId(role),
        role,
        text,
      },
    ]);
  };

  const appendAssistantMessages = (texts: string[]) => {
    setMessages((current) => [
      ...current,
      ...texts.map((text) => ({
        id: createMessageId("assistant"),
        role: "assistant" as const,
        text,
      })),
    ]);
  };

  const moveToContactStep = () => {
    setStep("contact");
    appendMessage(
      "assistant",
      "最後に、ご連絡先をお願いします。(メールアドレス、またはXのDMなど連絡手段を教えてください)",
    );
    setStatusText("連絡先の入力待ち");
  };

  const sendFinalInquiry = async (contact: string, nextAnswers: Record<string, string>) => {
    if (!service) {
      appendMessage(
        "assistant",
        "エラー: サービス種別が確認できませんでした。もう一度最初からお試しください。",
      );
      setStatusText("エラーが発生しました");
      return;
    }

    const payload: InquiryPayload = {
      service,
      answers: nextAnswers,
      contact,
    };

    setIsSending(true);
    setStatusText("送信中...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `新しい相談: ${service}`,
          payload,
        }),
      });

      const data = (await response.json()) as ChatResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "送信に失敗しました。");
      }

      appendMessage(
        "assistant",
        data.reply ??
          "ありがとうございます!内容を確認し、折り返しご連絡します。少々お待ちください。",
      );
      setStep("done");
      setStatusText("送信完了");
    } catch (error) {
      appendMessage(
        "assistant",
        error instanceof Error
          ? `エラー: ${error.message}`
          : "エラー: 送信に失敗しました。時間をおいて再度お試しください。",
      );
      setStatusText("エラーが発生しました");
    } finally {
      setIsSending(false);
    }
  };

  const handleOptionSelect = (option: ChatOption) => {
    if (optionLockRef.current || isSending) {
      return;
    }

    optionLockRef.current = true;
    setOptionsDisabled(true);
    appendMessage("user", option.label);

    if (step === "start") {
      const selectedService = option.label as ServiceLabel;

      setService(selectedService);

      if (selectedService === "LP制作") {
        setStep("lp-1");
        appendMessage("assistant", "LP制作ですね!まず業種を教えてください。");
        setStatusText("業種の入力待ち");
      } else if (selectedService === "AI導入支援") {
        setStep("ai-1");
        appendMessage(
          "assistant",
          "AI導入支援ですね!現在の業務で一番の課題は何ですか?",
        );
        setStatusText("課題の入力待ち");
      } else if (selectedService === "アプリ開発") {
        setStep("app-1");
        appendMessage(
          "assistant",
          "アプリ開発ですね!どんなものを作りたいですか?",
        );
        setStatusText("作りたいものの入力待ち");
      } else if (selectedService === "Claude Code講座") {
        appendAssistantMessages([
          "Claude Code導入講座に興味ありがとうございます!詳細はYouTubeメンバーシップで公開しています。",
          "YouTubeメンバーシップページはこちら → https://www.youtube.com/channel/UCuO_HCuBEM6v3wrko3Iu8Hw",
        ]);
        setStep("done");
        setStatusText("案内完了");
      } else {
        setStep("other-1");
        appendMessage("assistant", "お気軽にご記入ください!");
        setStatusText("内容の入力待ち");
      }
    } else if (step === "lp-3") {
      const nextAnswers = { ...answers, budget: option.label };
      setAnswers(nextAnswers);
      moveToContactStep();
    } else if (step === "ai-2") {
      const nextAnswers = { ...answers, aiExperience: option.label };
      setAnswers(nextAnswers);
      moveToContactStep();
    } else if (step === "app-2") {
      const nextAnswers = { ...answers, appType: option.label };
      setAnswers(nextAnswers);
      moveToContactStep();
    }

    setOptionsDisabled(false);
    optionLockRef.current = false;
  };

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || isSending || !TEXT_STEPS.includes(step)) {
      return;
    }

    appendMessage("user", trimmedInput);
    setInput("");

    if (step === "lp-1") {
      setAnswers((current) => ({ ...current, industry: trimmedInput }));
      setStep("lp-2");
      appendMessage(
        "assistant",
        "イメージや参考サイトはありますか?(URLや截图でもOKです)",
      );
      setStatusText("イメージの入力待ち");
      return;
    }

    if (step === "lp-2") {
      setAnswers((current) => ({ ...current, image: trimmedInput }));
      setStep("lp-3");
      appendMessage("assistant", "予算感を教えてください。");
      setStatusText("予算感の選択待ち");
      return;
    }

    if (step === "ai-1") {
      setAnswers((current) => ({ ...current, challenge: trimmedInput }));
      setStep("ai-2");
      appendMessage(
        "assistant",
        "これまでAIツール(ChatGPT、Copilotなど)を使った経験はありますか?",
      );
      setStatusText("AI経験の選択待ち");
      return;
    }

    if (step === "app-1") {
      setAnswers((current) => ({ ...current, appIdea: trimmedInput }));
      setStep("app-2");
      appendMessage("assistant", "アプリの種別はどれですか?");
      setStatusText("アプリ種別の選択待ち");
      return;
    }

    if (step === "other-1") {
      const nextAnswers = { ...answers, detail: trimmedInput };
      setAnswers(nextAnswers);
      moveToContactStep();
      return;
    }

    if (step === "contact") {
      const nextAnswers = { ...answers };
      setAnswers(nextAnswers);
      await sendFinalInquiry(trimmedInput, nextAnswers);
    }
  };

  const handleComposerKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      void handleSubmit();
    }
  };

  const currentOptions = STEP_OPTIONS[step] ?? [];
  const isTextStep = TEXT_STEPS.includes(step);

  return (
    <div className={`chatbot${isOpen ? " is-open" : ""}`}>
      <button
        aria-controls="asura-chatbot-panel"
        aria-expanded={isOpen}
        className="chatbot-toggle"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="chatbot-toggle-label">
          {isOpen ? "close chat" : "open chat"}
        </span>
        <span aria-hidden="true" className="chatbot-toggle-state">
          {isOpen ? "[-]" : "[+]"}
        </span>
      </button>

      {isOpen ? (
        <aside
          aria-label="ASURA chat bot"
          className="chatbot-panel term reveal in"
          id="asura-chatbot-panel"
        >
          <div className="term-bar chatbot-bar">
            <div className="dots">
              <span />
              <span />
              <span />
            </div>
            <div className="path">asura-chat.sh</div>
          </div>

          <div className="term-body chatbot-body">
            <div className="chatbot-header">
              <p className="chatbot-title">$ ./asura-chat.sh --interactive</p>
              <p className="chatbot-sub">
                要件整理、相談、見積もり前の壁打ちに使えます。
              </p>
            </div>

            <div
              aria-live="polite"
              aria-relevant="additions text"
              className="chatbot-messages"
            >
              {messages.map((message) => (
                <div
                  className={`chatbot-message is-${message.role}`}
                  key={message.id}
                >
                  <div className="chatbot-message-role">
                    {message.role === "user" ? "$ you" : "> asura"}
                  </div>
                  <p className="chatbot-message-text">{message.text}</p>
                </div>
              ))}

              {isSending ? (
                <div className="chatbot-message is-assistant is-pending">
                  <div className="chatbot-message-role">{"> asura"}</div>
                  <p className="chatbot-message-text">typing...</p>
                </div>
              ) : null}

              <div ref={messagesEndRef} />
            </div>

            {currentOptions.length > 0 ? (
              <div className="chatbot-options">
                {currentOptions.map((option) => (
                  <button
                    className="chatbot-option"
                    disabled={isSending || optionsDisabled}
                    key={option.label}
                    onClick={() => handleOptionSelect(option)}
                    type="button"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            ) : null}

            {isTextStep ? (
              <form className="chatbot-form" onSubmit={handleSubmit}>
                <label className="chatbot-label" htmlFor="asura-chatbot-input">
                  message
                </label>
                <textarea
                  className="chatbot-input"
                  id="asura-chatbot-input"
                  name="message"
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleComposerKeyDown}
                  placeholder={TEXT_PLACEHOLDERS[step] ?? "相談内容を入力してください"}
                  rows={3}
                  value={input}
                />

                <div className="chatbot-footer">
                  <div aria-live="polite" className="chatbot-status">
                    {statusText}
                  </div>
                  <button
                    className="chatbot-submit btn"
                    disabled={isSending || input.trim().length === 0}
                    type="submit"
                  >
                    {isSending ? "SENDING..." : "SEND"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="chatbot-footer">
                <div aria-live="polite" className="chatbot-status">
                  {statusText}
                </div>
              </div>
            )}
          </div>
        </aside>
      ) : null}
    </div>
  );
}
