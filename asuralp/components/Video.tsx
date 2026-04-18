"use client";

import { useRef } from "react";

const VIDEO_ITEMS = [
  "coming soon / launch trailer",
  "terminal mode demo / product walk-through",
  "agent workflow / behind the scenes",
  "customer story / before and after",
];

export default function Video() {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: number) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    track.scrollBy({
      left: direction * 340,
      behavior: "smooth",
    });
  };

  return (
    <section className="section hscroll-sec" id="video">
      <div className="hscroll-head reveal wrap">
        <div>
          <div className="sec-tag">ls ./videos</div>
          <h2 className="sec-h">
            video <span className="a">queue</span>
          </h2>
          <p className="sec-sub">
            次に出すコンテンツもターミナルの世界観で統一し、横に流しながら見せる構成にしています。
          </p>
        </div>
        <div className="hscroll-arrows">
          <button
            aria-label="scroll videos left"
            className="arrow-btn"
            onClick={() => scrollByCard(-1)}
            type="button"
          >
            ←
          </button>
          <button
            aria-label="scroll videos right"
            className="arrow-btn"
            onClick={() => scrollByCard(1)}
            type="button"
          >
            →
          </button>
        </div>
      </div>

      <div className="hscroll video-scroll reveal" ref={trackRef}>
        {VIDEO_ITEMS.map((item, index) => (
          <article className="video-card" key={item}>
            <div className="video-card-screen">
              <span className="video-card-badge">COMING SOON</span>
              <div className="video-card-title">{item}</div>
            </div>
            <div className="video-card-meta">
              <span>slot 0{index + 1}</span>
              <span>render pending</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
