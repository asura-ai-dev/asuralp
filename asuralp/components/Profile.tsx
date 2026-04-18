const STACK = [
  "Next.js",
  "TypeScript",
  "Node.js",
  "Bun",
  "OpenAI",
  "Postgres",
  "Cloudflare",
  "Vercel",
];

const TIMELINE = [
  ["2026", "AI運用込みのLP/業務改善案件を複数支援"],
  ["2025", "個人開発とクライアントワークを両立する体制を確立"],
  ["2024", "AIとWeb制作を横断するワークフローを整備"],
  ["2022", "要件整理から実装まで一気通貫で担うスタイルへ移行"],
];

export default function Profile() {
  return (
    <section className="section" id="profile">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-tag">whoami</div>
          <h2 className="sec-h">
            profile<span className="a">.json</span>
          </h2>
          <p className="sec-sub">
            何が作れるかだけでなく、どう考えて進めるかも伝わるようにプロフィールを構成しています。
          </p>
        </div>

        <div className="pf-grid">
          <article className="pf-card reveal">
            <div className="pf-avatar">a</div>
            <div className="pf-name">ASURA</div>
            <div className="pf-handle">@asura_dev</div>

            <div className="pf-details">
              <div className="pf-row">
                <span className="k">role</span>
                <span className="v">solo builder</span>
              </div>
              <div className="pf-row">
                <span className="k">based</span>
                <span className="v">tokyo / remote</span>
              </div>
              <div className="pf-row">
                <span className="k">focus</span>
                <span className="v">lp + app + ai ops</span>
              </div>
              <div className="pf-row">
                <span className="k">status</span>
                <span className="v pf-live">accepting</span>
              </div>
            </div>

            <div className="pf-stack">
              {STACK.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>

          <article className="pf-bio reveal">
            <h3>about_me</h3>
            <p>
              企画、設計、実装、改善までを一人でつなぎつつ、AIエージェントを運用レイヤーに組み込む仕事をしています。
              <code>How</code> と <code>Why</code> を文章と画面の両方で説明できる形に落とすのが得意です。
            </p>
            <p>
              非エンジニアにも分かる資料構成を意識しながら、コードの中では再利用しやすい部品と変更しやすい構造を先に作ります。
            </p>

            <h3>timeline</h3>
            <div className="pf-timeline">
              {TIMELINE.map(([year, text]) => (
                <div className="tl-item" key={year}>
                  <span className="tl-y">{year}</span>
                  <span className="tl-d">{text}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
