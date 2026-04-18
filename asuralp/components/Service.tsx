const SERVICES = [
  {
    id: "SVC/01",
    title: "web app build",
    description:
      "LPからSaaSまで、見える画面だけでなくAPIやDBまで含めて一気通貫で設計・実装します。",
    tags: ["Next.js", "TypeScript", "Bun", "Postgres"],
  },
  {
    id: "SVC/02",
    title: "ai agent design",
    description:
      "問い合わせ、調査、社内オペレーションを自動化するAIエージェントを、業務に合わせて組み込みます。",
    tags: ["OpenAI", "MCP", "Automation", "Slack"],
  },
  {
    id: "SVC/03",
    title: "architecture support",
    description:
      "何をどう作るかだけでなく、なぜその構成にするのかまで、非エンジニアにも分かる形で整理します。",
    tags: ["Review", "DX", "Infra", "Roadmap"],
  },
  {
    id: "SVC/04",
    title: "launch & operate",
    description:
      "公開後の改善、計測、通知フローまで含めて、止まらず育つプロダクトに整えます。",
    tags: ["Analytics", "Webhook", "Monitoring", "Growth"],
  },
];

export default function Service() {
  return (
    <section className="section" id="service">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-tag">ls ./services</div>
          <h2 className="sec-h">
            what we <span className="a">build</span>
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
              <p>{service.description}</p>
              <div className="svc-tags">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
