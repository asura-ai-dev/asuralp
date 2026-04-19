import socials from "../social/socials.json";

type Social = {
  id: string;
  title: string;
  label: string;
  meta: string;
  href: string;
  text: string;
  characterImage: string;
};

const CHANNELS = socials as Social[];

export default function Sns() {
  return (
    <section className="section" id="sns">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-tag">ls ./social</div>
          <h2 className="sec-h">
            socials<span className="a">.json</span>
          </h2>
        </div>

        <div className="term section-term sns-term reveal">
          <div className="term-bar">
            <div className="dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="path">~/asura/social/socials.json</div>
            <div className="tabs" aria-hidden="true">
              <span className="act">socials.json</span>
              <span>content-plan.md</span>
              <span>links.log</span>
            </div>
          </div>

          <div className="term-body section-term-body">
            <div className="sns-grid">
              {CHANNELS.map((channel) => (
                <article className="sns-card reveal" key={channel.id}>
                  <div className="sns-card-base">
                    <div className={`sns-icon sns-${channel.id}`}>{channel.title[0]}</div>
                    <div className="sns-meta">{channel.meta}</div>
                    <h3>{channel.title}</h3>
                    <p>{channel.text}</p>
                    <a
                      className="btn ghost"
                      href={channel.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      open {channel.label}
                    </a>
                  </div>
                  <div className={`sns-character sns-character-${channel.id}`} aria-hidden="true">
                    <div className={`sns-character-glow sns-character-glow-${channel.id}`} />
                    <div
                      className={`sns-character-img sns-character-img-${channel.id}`}
                      style={{ backgroundImage: `url(${channel.characterImage})` }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
