const PAIN_LOGS = [
  {
    title: "人手不足",
    lines: ["人が足りない。募集しても来ない。", "来てもすぐ辞める。"],
  },
  {
    title: "AIわからない",
    lines: ["やりたいことはあるのに、何から始めればいいかわからない。"],
  },
  {
    title: "外注高い",
    lines: ["HP制作で50万、100万... 個人で出せる額じゃない。"],
  },
  {
    title: "時間がない",
    lines: ["経営者は忙しい。効率化したいけど、手が回らない。"],
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
            問題をふわっとした悩みのままにせず、ターミナルに流れるログのように見える化します。
            何が詰まりの原因かを整理し、どこから解決すればいいかまで一緒に決めます。
          </p>
        </div>

        <div className="pain-term term reveal">
          <div className="term-bar">
            <div className="dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="path">~/asura/issues/errors.log</span>
            <div className="tabs" aria-hidden="true">
              <span className="act">stream</span>
              <span>live</span>
            </div>
          </div>

          <div className="pain-body term-body">
            <p className="pain-command">
              <span className="prompt">$</span> tail -f errors.log
            </p>

            <div className="pain-stream">
              {PAIN_LOGS.map((pain) => (
                <article className="pain-entry" key={pain.title}>
                  <p className="pain-line pain-line-error">
                    <span className="pain-prefix">&gt;</span>
                    <span>
                      <span className="pain-level">ERROR:</span>
                      <span className="pain-title">{pain.title}</span>
                    </span>
                  </p>

                  {pain.lines.map((line) => (
                    <p className="pain-line pain-line-detail" key={line}>
                      <span className="pain-prefix">&gt;</span>
                      <span>{line}</span>
                    </p>
                  ))}
                </article>
              ))}

              <div className="pain-entry pain-entry-resolving">
                <p className="pain-line pain-line-resolving">
                  <span className="pain-prefix">&gt;</span>
                  <span className="pain-status">RESOLVING...</span>
                </p>
                <p className="pain-line pain-line-detail pain-line-detail-strong">
                  <span className="pain-prefix">&gt;</span>
                  <span>大丈夫です。解決できます。</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
