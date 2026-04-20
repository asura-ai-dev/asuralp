const WORKS = [
  {
    category: "Web制作",
    title: "エステLP制作",
    meta: "OUKI. / LP",
    description:
      "訴求整理からデザイン・実装まで対応したLP制作。見た目だけでなく、申込みにつながる導線まで含めて形にしました。",
    linkLabel: "screenshot",
    image: "/images/portfolio-ouki.png",
    imageAlt: "OUKI.エステLPのファーストビュー",
    previewLabel: "LIVE SCREENSHOT",
    tone: "peach",
  },
  {
    category: "システム開発",
    title: "シフト管理兼タイムカードシステム",
    meta: "現場オペレーション向け",
    description:
      "シフト確認と勤怠記録を分断せず、毎日の運用を一画面で回せるようにした業務システムです。",
    linkLabel: "screenshot",
    image: "/images/portfolio-shift.png",
    imageAlt: "シフト管理兼タイムカードシステムのスタッフ選択画面",
    previewLabel: "APP SCREENSHOT",
    tone: "mint",
  },
  {
    category: "Claude Code導入講座",
    title: "月1対面講座",
    meta: "メンバー獲得済み",
    description:
      "Claude Codeを仕事にどう取り入れるかを、対面で伴走しながら伝える講座として展開しています。",
    linkLabel: "coming soon",
    previewLabel: "COMING SOON",
    tone: "peach",
  },
  {
    category: "note販売",
    title: "noteで Claude Code Skills 販売",
    meta: "好評",
    description:
      "実際に使える形へ整理した知見を記事化し、学んだその日に試しやすいコンテンツとして届けています。",
    href: "https://note.com/sura_asura/n/n29585a178989?sub_rt=share_sb",
    linkLabel: "note.com",
    previewLabel: "OPEN NOTE",
    tone: "mint",
  },
  {
    category: "YouTube",
    title: "登録者1,400人",
    meta: "収益化 2ヶ月で達成",
    description:
      "AIagentによって自律的に運用しています。",
    href: "https://www.youtube.com/channel/UCuO_HCuBEM6v3wrko3Iu8Hw",
    linkLabel: "youtube.com",
    previewLabel: "OPEN CHANNEL",
    tone: "peach",
  },
] as const

function PortfolioEntry({
  work,
}: {
  work: (typeof WORKS)[number]
}) {
  const hasHref = "href" in work
  const hasImage = "image" in work

  const content = (
    <>
      <div className="portfolio-entry-head">
        <span>{work.category}</span>
        <span className="portfolio-entry-rule" aria-hidden="true" />
      </div>

      <div className="portfolio-entry-grid">
        <div className="portfolio-copy">
          <h3>{work.title}</h3>
          <p className="portfolio-meta">{work.meta}</p>
          <p className="portfolio-description">{work.description}</p>
        </div>

        <div
          className={`portfolio-preview ${
            hasImage ? "portfolio-preview-image" : "portfolio-preview-link"
          }`}
        >
          {hasImage ? (
            <>
              <img
                alt={work.imageAlt}
                className="portfolio-shot"
                loading="lazy"
                src={work.image}
              />
              <div className="portfolio-preview-caption">
                <span>{work.previewLabel}</span>
                <span>{work.linkLabel}</span>
              </div>
            </>
          ) : (
            <div className="portfolio-link-preview">
              <span className="portfolio-link-kicker">{work.previewLabel}</span>
              <span className="portfolio-link-domain">{work.linkLabel}</span>
            </div>
          )}
        </div>

        <div className="portfolio-link-row">
          <span>{hasHref ? "open url" : work.linkLabel}</span>
          <span>{hasHref ? work.linkLabel : hasImage ? "画像のみ" : "準備中"}</span>
        </div>
      </div>
    </>
  )

  if (hasHref) {
    return (
      <a
        aria-label={`${work.title}を開く`}
        className={`portfolio-entry portfolio-${work.tone} reveal`}
        href={work.href}
        rel="noreferrer"
        target="_blank"
      >
        {content}
      </a>
    )
  }

  return (
    <article className={`portfolio-entry portfolio-${work.tone} reveal`}>
      {content}
    </article>
  )
}

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
                      <PortfolioEntry
                        key={`${copyIndex}-${work.category}`}
                        work={work}
                      />
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
