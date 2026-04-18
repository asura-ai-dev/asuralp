import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="section cta-sec" id="cta">
      <div className="wrap">
        <div className="cta-term reveal">
          <div className="term-bar">
            <div className="dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="path">contact.sh</div>
          </div>

          <div className="cta-body">
            <div className="cta-prompt">$ ./contact.sh --start</div>
            <h2 className="cta-h">
              let's <span className="a">build</span>
              <br />
              something <span className="b">together</span>
            </h2>
            <p className="cta-sub">
              相談内容がまだ曖昧でも大丈夫です。やりたいこと、困っていること、今止まっている理由から一緒に整理できます。
            </p>

            <div className="cta-input">
              <span>→</span>
              <input defaultValue="hello@asura.ai" readOnly />
              <a className="cta-send" href="mailto:hello@asura.ai">
                MAIL
              </a>
            </div>

            <div className="cta-row">
              <Link className="btn primary" href="#top">
                reboot LP
              </Link>
              <Link className="btn ghost" href="#faq">
                read faq
              </Link>
              <Link className="btn ghost" href="#sns">
                open media
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
