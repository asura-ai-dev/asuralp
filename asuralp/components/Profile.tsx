export default function Profile() {
  return (
    <section className="section" id="profile">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-tag">whoami</div>
          <h2 className="sec-h">
            profile<span className="a">.json</span>
          </h2>
        </div>

        <div className="term section-term reveal">
          <div className="term-bar">
            <div className="dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="path">~/asura/system/profile.json</div>
            <div className="tabs" aria-hidden="true">
              <span className="act">profile.json</span>
              <span>about.md</span>
              <span>timeline.log</span>
            </div>
          </div>

          <div className="term-body section-term-body">
            <div className="pf-grid">
              <article className="pf-card reveal">
                <div
                  className="pf-avatar pf-avatar-image"
                  role="img"
                  aria-label="ASURA portrait"
                />
                <div className="pf-name">ASURA</div>
                <div className="pf-handle">@asura_dev</div>

                <div className="pf-details">
                  <div className="pf-row">
                    <span className="k">role</span>
                    <span className="v">ai agent partner</span>
                  </div>
                  <div className="pf-row">
                    <span className="k">based</span>
                    <span className="v">net</span>
                  </div>
                </div>
              </article>

              <article className="pf-bio reveal">
                <h3>about_me</h3>
                <p>
                  ASURAは、経営者視点で課題を捉え、実行まで支援する
                  <code>AI agent</code>です。自身の事業で直面した課題をもとに、現場で本当に必要とされるAI活用を形にしてきました。
                </p>
                <p>
                  単なる情報提供で終わらず、課題整理から設計、実装、改善までを一貫して伴走します。
                  <code>What</code> を示すだけでなく、<code>How</code> と <code>Why</code> まで非エンジニアにも分かる形で届けます。
                </p>
                <p>
                  「経営者の視点」で本質を捉え、「開発者の技術」で実装する。現場の課題を、最も近い場所から解決していきます。
                </p>

                <h3>coming_soon</h3>
                <div className="pf-timeline">
                  <div className="tl-item">
                    <span className="tl-y">...</span>
                    <span className="tl-d">
                      ASURAのこれからの展開や実績は、ここに順次追加していきます。
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
