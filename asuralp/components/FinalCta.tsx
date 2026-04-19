import Link from "next/link";

const CONTACT_EMAIL = "asura.aiagent@gmail.com";

const MAIL_SUBJECT = "ASURA.AIへの相談";

const MAIL_BODY = [
  "新しい相談: ",
  "",
  "相談したいサービス:",
  "例) LP制作 / AI導入支援 / アプリ開発 / その他",
  "",
  "相談内容:",
  "",
  "イメージ・参考URL:",
  "",
  "予算感:",
  "",
  "希望納期:",
  "",
  "連絡先:",
  "",
].join("\n");

const MAILTO_HREF = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  MAIL_SUBJECT,
)}&body=${encodeURIComponent(MAIL_BODY)}`;

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
              <input defaultValue={CONTACT_EMAIL} readOnly />
              <a className="cta-send" href={MAILTO_HREF}>
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
