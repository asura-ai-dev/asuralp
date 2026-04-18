const CHANNELS = [
  {
    id: "yt",
    title: "YouTube",
    meta: "@asura.dev",
    text: "プロダクトの裏側や、個人開発をどう回しているかを動画で分かりやすく解説します。",
  },
  {
    id: "note",
    title: "note",
    meta: "@asura_dev",
    text: "判断の背景や設計思想を、図解と文章でゆっくり読める形に整理して発信します。",
  },
  {
    id: "x",
    title: "X",
    meta: "@asura_dev",
    text: "日々の改善ログや実験結果を短い単位で共有し、プロダクトが育つ過程を見せます。",
  },
];

export default function Sns() {
  return (
    <section className="section" id="sns">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-tag">ls ./social</div>
          <h2 className="sec-h">
            socials<span className="a">.json</span>
          </h2>
          <p className="sec-sub">
            SNS も役割を分けて運用し、動画、文章、短文で同じテーマを別の角度から届けています。
          </p>
        </div>

        <div className="sns-grid">
          {CHANNELS.map((channel) => (
            <article className="sns-card reveal" key={channel.id}>
              <div className={`sns-icon sns-${channel.id}`}>{channel.title[0]}</div>
              <div className="sns-meta">{channel.meta}</div>
              <h3>{channel.title}</h3>
              <p>{channel.text}</p>
              <a className="btn ghost" href="#cta">
                open {channel.id}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
