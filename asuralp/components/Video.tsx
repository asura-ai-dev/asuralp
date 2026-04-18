const VIDEO_ITEMS = [
  {
    slot: "slot 01",
    status: "launch trailer / pending",
  },
  {
    slot: "slot 02",
    status: "product walkthrough / pending",
  },
  {
    slot: "slot 03",
    status: "agent workflow / pending",
  },
  {
    slot: "slot 04",
    status: "customer story / pending",
  },
];

export default function Video() {
  return (
    <section className="section hscroll-sec" id="video">
      <div className="hscroll-head reveal wrap">
        <div>
          <div className="sec-tag">ls ./videos</div>
          <h2 className="sec-h">
            video <span className="a">queue</span>
          </h2>
        </div>
      </div>

      <div className="video-marquee reveal">
        <div className="video-marquee-track">
          {[0, 1].map((copyIndex) => (
            <div
              aria-hidden={copyIndex === 1}
              className="video-marquee-group"
              key={copyIndex}
            >
              {VIDEO_ITEMS.map((item) => (
                <article className="video-card" key={`${copyIndex}-${item.slot}`}>
                  <div className="video-card-screen">
                    <span className="video-card-badge">COMING SOON</span>
                    <div className="video-card-title">coming soon</div>
                  </div>
                  <div className="video-card-meta">
                    <span>{item.slot}</span>
                    <span>{item.status}</span>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
