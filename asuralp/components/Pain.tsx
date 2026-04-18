const PAINS = [
  {
    code: "E_SLOW_BUILD",
    title: "外注で開発が遅い・伝わらない",
    fix: "技術理解のある開発者が直接伴走し、要件から実装まで会話のズレを減らします。",
  },
  {
    code: "E_OVER_BUDGET",
    title: "制作会社の見積もりが高い",
    fix: "MVPに必要な機能だけを切り出し、小さく作って早く検証する進め方を取ります。",
  },
  {
    code: "E_NO_OPS",
    title: "作って終わりで運用が回らない",
    fix: "監視、通知、改善ループまで初期設計に含め、納品後も回る状態を作ります。",
  },
  {
    code: "E_AI_UNUSED",
    title: "AIを業務に活かせていない",
    fix: "営業、調査、問い合わせ一次対応など、止まっている工程をエージェント化します。",
  },
];

export default function Pain() {
  return (
    <section className="section" id="pain">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-tag">tail -f errors.log</div>
          <h2 className="sec-h">
            ERROR を <span className="a">RESOLVING</span> に変える
          </h2>
          <p className="sec-sub">
            どこで詰まっているかを技術の言葉に翻訳し、解決策まで一本の線でつなぎます。
          </p>
        </div>

        <div className="pain-list reveal">
          {PAINS.map((pain) => (
            <article className="pain-row" key={pain.code}>
              <div className="err">{pain.code}</div>
              <h3>{pain.title}</h3>
              <p className="fix">{pain.fix}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
