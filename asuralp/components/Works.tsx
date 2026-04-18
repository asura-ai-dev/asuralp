const WORKS = [
  {
    badge: "SAAS",
    title: "OpsFlow | 問い合わせ自動化",
    description:
      "営業・CS の一次対応を AI が受け、要点を人に引き継ぐ運用を構築。返信速度と対応漏れを改善。",
    metric: "reply time -78%",
  },
  {
    badge: "LP",
    title: "Launch Terminal | 新規LP制作",
    description:
      "HTMLで作られていた世界観を Next.js へ移し、更新しやすい構成と再利用しやすい部品に置き換え。",
    metric: "edit cost down",
  },
  {
    badge: "B2B",
    title: "Signal Board | 社内オペレーション可視化",
    description:
      "複数チャネルの通知を一箇所に集約し、エラーや優先度をターミナル風UIで一目で判断できるように設計。",
    metric: "ops clarity up",
  },
];

export default function Works() {
  return (
    <section className="section" id="works">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-tag">find ./works -type project</div>
          <h2 className="sec-h">
            selected <span className="a">works</span>
          </h2>
          <p className="sec-sub">
            実績はただ並べるのではなく、「何を変えたか」が伝わるように整理しています。
          </p>
        </div>

        <div className="works-grid">
          {WORKS.map((work) => (
            <article className="work reveal" key={work.title}>
              <div className="work-img">
                <div className="grid" />
                <div className="glow" />
                <div className="badge">{work.badge}</div>
                <div className="name">{work.title.split(" | ")[0]}</div>
              </div>
              <div className="work-body">
                <div className="work-tag">{work.badge} / PROJECT</div>
                <div className="work-h">{work.title}</div>
                <p className="work-d">{work.description}</p>
                <div className="work-meta">
                  <span>strategy · design · build</span>
                  <span className="up">{work.metric}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="works-notes">
          <article className="works-note reveal">
            <h3>What changed</h3>
            <p>
              単発の制作物ではなく、あとから直せる構成に作り替えることで、更新コストと説明コストを一緒に下げています。
            </p>
          </article>
          <article className="works-note reveal">
            <h3>Why it matters</h3>
            <p>
              LPは公開した瞬間が完成ではなく、改善の出発点です。だからこそ再編集しやすさを最初から設計に含めます。
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
