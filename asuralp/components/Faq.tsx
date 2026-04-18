"use client";

import { useState } from "react";

type FaqItem = {
  answer: string;
  question: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "AIって難しそうなんですけど...",
    answer:
      "大丈夫です。まずはあなたのやりたいことを聞かせてください。AIの知識がなくても、一緒に最適な方法を見つけます。",
  },
  {
    question: "料金の目安は？",
    answer:
      "LP制作は3万円〜です。AI導入サポート・アプリ開発は、まずは無料相談でお話を聞かせてください。",
  },
  {
    question: "どのくらいの期間でできますか？",
    answer:
      "LP制作は2日以内にモックをお見せします。",
  },
  {
    question: "電話やオンライン会議はありますか？",
    answer:
      "基本的にメール・チャット・DMで対応しています。お互いの時間を大切にしたいので、まずはテキストでお気軽にご相談ください。",
  },
  {
    question: "まずは相談だけでもいいですか？",
    answer:
      "もちろんです。無料相談からどうぞ。チャットでも、メールでもお気軽に。",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = hoveredIndex ?? openIndex;

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-tag">man asura</div>
          <h2 className="sec-h">
            faq<span className="a">.md</span>
          </h2>
        </div>

        <div className="term section-term reveal">
          <div className="term-bar">
            <div className="dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="path">~/asura/docs/faq.md</div>
            <div className="tabs" aria-hidden="true">
              <span className="act">faq.md</span>
              <span>pricing.md</span>
              <span>support.log</span>
            </div>
          </div>

          <div className="term-body section-term-body">
            <div className="faq">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = activeIndex === index;
                const answerId = `faq-answer-${index}`;
                const questionId = `faq-question-${index}`;

                return (
                  <div
                    className="faq-item"
                    key={item.question}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() =>
                      setHoveredIndex((current) =>
                        current === index ? null : current,
                      )
                    }
                  >
                    <button
                      aria-controls={answerId}
                      aria-expanded={isOpen}
                      className={`faq-q${isOpen ? " open" : ""}`}
                      id={questionId}
                      onBlur={() =>
                        setHoveredIndex((current) =>
                          current === index ? null : current,
                        )
                      }
                      onFocus={() => setHoveredIndex(index)}
                      onClick={() => handleToggle(index)}
                      type="button"
                    >
                      <span className="q">{item.question}</span>
                      <span aria-hidden="true" className="t">
                        {isOpen ? "[-]" : "[+]"}
                      </span>
                    </button>

                    <div
                      aria-hidden={!isOpen}
                      aria-labelledby={questionId}
                      className="faq-a"
                      id={answerId}
                      role="region"
                    >
                      {item.answer}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
