const SERVICES = [
  {
    id: "SVC/01",
    title: "LP / Web制作",
    lead: "あなたのビジネスを、最速でWebに。",
    description: "まずはモックをお見せします。",
    meta: "5万円〜 / 最短3日納品",
  },
  {
    id: "SVC/02",
    title: "AI導入サポート",
    lead: "「AIって何から始めれば...？」",
    description: "そんな疑問に、現場を知る人間が答えます。",
    meta: "要相談 / まずは無料相談から",
  },
  {
    id: "SVC/03",
    title: "Claude Code導入講座",
    lead: "Coming Soon",
    description: "公開準備中です。もう少々お待ちください。",
    meta: "",
  },
  {
    id: "SVC/04",
    title: "アプリ開発",
    lead: "業務効率化ツールから、オリジナルアプリまで",
    description: "あなたの課題を、アプリで解決します",
    meta: "要相談",
  },
];

export default function Service() {
  return (
    <section className="section" id="service">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-tag">ls ./services</div>
          <h2 className="sec-h">
            services<span className="a">.json</span>
          </h2>
          <p className="sec-sub">
            企画、設計、実装、公開後の運用までを1つの流れで扱えるよう、役割ごとにサービスを整理しています。
          </p>
        </div>

        <div className="svc-grid">
          {SERVICES.map((service) => (
            <article className="svc reveal" key={service.id}>
              <div className="svc-id">{service.id}</div>
              <h3>{service.title}</h3>
              <div className="svc-copy">
                <p className="svc-lead">{service.lead}</p>
                <p>{service.description}</p>
              </div>
              {service.meta ? <p className="svc-meta">{service.meta}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
