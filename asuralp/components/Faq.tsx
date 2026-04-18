"use client";

import { useState } from "react";

type FaqItem = {
  answer: string;
  question: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "最小予算はいくらから？",
    answer:
      "プロトタイプ開発で¥300k〜、本格的なSaaS開発で¥1.5M〜。月額顧問契約は¥80k/月から承ります。",
  },
  {
    question: "どれくらいで出来上がりますか？",
    answer:
      "MVPは2〜4週間、フル機能のWebアプリで6〜12週間が目安。要件次第で前後しますので、まずは相談ください。",
  },
  {
    question: "納品後の保守も対応しますか？",
    answer:
      "月額保守プラン(¥50k〜)で対応します。AIエージェントによる監視・自動修復もセットで提供できます。",
  },
  {
    question: "技術相談だけでもOK？",
    answer:
      "単発相談(¥30k/h)または月額顧問契約で対応可能。アーキ設計やコードレビューだけでも大丈夫です。",
  },
  {
    question: "遠方ですが対応可能？",
    answer:
      "フルリモート対応です。日本全国・海外問わずSlack/Notion/Zoomで完結します。",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-tag">man asura</div>
          <h2 className="sec-h">
            f.a.q<span className="a">.</span>
          </h2>
        </div>

        <div className="faq reveal">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;
            const questionId = `faq-question-${index}`;

            return (
              <div className="faq-item" key={item.question}>
                <button
                  aria-controls={answerId}
                  aria-expanded={isOpen}
                  className={`faq-q${isOpen ? " open" : ""}`}
                  id={questionId}
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
    </section>
  );
}
