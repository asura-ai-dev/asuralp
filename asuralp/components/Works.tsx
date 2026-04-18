const WORKS = [
  {
    category: "Web制作",
    title: "エステLP制作",
    meta: "5万円",
    description:
      "訴求整理からデザイン・実装まで対応したLP制作。見た目だけでなく、申込みにつながる導線まで含めて形にしました。",
    previewType: "visual",
    previewMain: "LP MOCK",
    previewSub: "スクショ or モック画像",
    tone: "peach",
  },
  {
    category: "システム開発",
    title: "シフト管理兼タイムカードシステム",
    meta: "現場オペレーション向け",
    description:
      "シフト確認と勤怠記録を分断せず、毎日の運用を一画面で回せるようにした業務システムです。",
    previewType: "visual",
    previewMain: "SYSTEM DEMO",
    previewSub: "スクショ or デモ画像",
    tone: "mint",
  },
  {
    category: "Claude Code導入講座",
    title: "月1対面講座",
    meta: "メンバー獲得済み",
    description:
      "Claude Codeを仕事にどう取り入れるかを、対面で伴走しながら伝える講座として展開しています。",
    previewType: "visual",
    previewMain: "OFFLINE CLASS",
    previewSub: "写真 or アイコン",
    tone: "peach",
  },
  {
    category: "note販売",
    title: "noteで Claude Code Skills 販売",
    meta: "好評",
    description:
      "実際に使える形へ整理した知見を記事化し、学んだその日に試しやすいコンテンツとして届けています。",
    previewType: "metric",
    previewMain: "skills on sale",
    previewSub: "reaction: good",
    tone: "mint",
  },
  {
    category: "YouTube",
    title: "登録者1,400人",
    meta: "収益化 2ヶ月で達成",
    description:
      "AIagentによって自律的に運用しています。",
    previewType: "metric",
    previewMain: "1,400 subscribers",
    previewSub: "monetized in 2 months",
    tone: "peach",
  },
] as const

export default function Works() {
  return (
    <section className="section" id="works">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-tag">./portfolio.sh --open</div>
          <h2 className="sec-h">
            portfolio<span className="a">.md</span>
          </h2>
        </div>

        <div className="term works-terminal reveal">
          <div className="term-bar">
            <div className="dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="path">~/asura/portfolio — latest.log — 132x40</div>
            <div className="tabs">
              <span className="act">works.tsx</span>
              <span>captures/</span>
              <span>results.md</span>
            </div>
          </div>

          <div className="term-body works-terminal-body">
            <span className="line out works-boot">&gt; LOADING portfolio...</span>

            <div className="portfolio-marquee">
              <div className="portfolio-marquee-track">
                {[0, 1].map((copyIndex) => (
                  <div
                    aria-hidden={copyIndex === 1}
                    className="portfolio-marquee-group"
                    key={copyIndex}
                  >
                    {WORKS.map((work) => (
                      <article
                        className={`portfolio-entry portfolio-${work.tone} reveal`}
                        key={`${copyIndex}-${work.category}`}
                      >
                        <div className="portfolio-entry-head">
                          <span>{work.category}</span>
                          <span className="portfolio-entry-rule" aria-hidden="true" />
                        </div>

                        <div className="portfolio-entry-grid">
                          <div className="portfolio-copy">
                            <h3>{work.title}</h3>
                            <p className="portfolio-meta">{work.meta}</p>
                          </div>

                          <div
                            className={`portfolio-preview portfolio-preview-${work.previewType}`}
                          >
                            <div className="portfolio-preview-main">
                              {work.previewMain}
                            </div>
                            <div className="portfolio-preview-sub">
                              {work.previewSub}
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
