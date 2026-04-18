"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
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
    text: "ASURA.AI です。相談したい内容を1〜2文で送ってください。",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [statusText, setStatusText] = useState("待機中");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

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

  const appendMessage = (message: ChatMessage) => {
    setMessages((current) => [...current, message]);
  };

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const trimmedInput = input.trim();

    if (!trimmedInput || isSending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmedInput,
    };

    appendMessage(userMessage);
    setInput("");
    setIsSending(true);
    setStatusText("送信中...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedInput }),
      });

      const data = (await response.json()) as ChatResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "送信に失敗しました。");
      }

      appendMessage({
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text:
          data.reply ??
          "送信ありがとうございます。内容を受け取り、折り返し準備を始めます。",
      });
      setStatusText("送信完了");
    } catch (error) {
      appendMessage({
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        text:
          error instanceof Error
            ? `エラー: ${error.message}`
            : "エラー: 送信に失敗しました。時間をおいて再度お試しください。",
      });
      setStatusText("エラーが発生しました");
    } finally {
      setIsSending(false);
    }
  };

  const handleComposerKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit();
    }
  };

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
                placeholder="相談内容を入力してください"
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
          </div>
        </aside>
      ) : null}
    </div>
  );
}
