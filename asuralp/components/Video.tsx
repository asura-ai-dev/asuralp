"use client";

import { useState } from "react";

const VIDEO_ITEMS = [
  {
    slot: "slot 01",
    title: "ASURA video 01",
    videoId: "BlH4HxTEJKw",
    status: "youtube / ready",
  },
  {
    slot: "slot 02",
    title: "ASURA video 02",
    videoId: "tTUkZsWVP3M",
    status: "youtube / ready",
  },
  {
    slot: "slot 03",
    title: "ASURA video 03",
    videoId: "KPPAgGfuYL0",
    status: "youtube / ready",
  },
  {
    slot: "slot 04",
    title: "ASURA video 04",
    videoId: "IaU7rkb7M3U",
    status: "youtube / ready",
  },
];

export default function Video() {
  const [activeVideoKey, setActiveVideoKey] = useState<string | null>(null);
  const [isTouchingTrack, setIsTouchingTrack] = useState(false);

  const isPaused = Boolean(activeVideoKey) || isTouchingTrack;

  return (
    <section className="section" id="video">
      <div className="wrap">
        <div className="sec-head reveal">
          <div className="sec-tag">ls ./videos</div>
          <h2 className="sec-h">
            videos<span className="a">.md</span>
          </h2>
        </div>

        <div className="term section-term reveal">
          <div className="term-bar">
            <div className="dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="path">~/asura/media/videos.md</div>
            <div className="tabs" aria-hidden="true">
              <span className="act">videos.md</span>
              <span>queue.log</span>
              <span>thumbnails/</span>
            </div>
          </div>

          <div className="term-body section-term-body video-term-body">
            <div
              className="video-marquee reveal"
              onPointerCancel={() => setIsTouchingTrack(false)}
              onPointerDown={() => setIsTouchingTrack(true)}
              onPointerLeave={() => setIsTouchingTrack(false)}
              onPointerUp={() => setIsTouchingTrack(false)}
            >
              <div
                className={`video-marquee-track${isPaused ? " is-paused" : ""}`}
              >
                {[0, 1].map((copyIndex) => (
                  <div
                    aria-hidden={copyIndex === 1}
                    className="video-marquee-group"
                    key={copyIndex}
                  >
                    {VIDEO_ITEMS.map((item) => {
                      const videoKey = `${copyIndex}-${item.videoId}`;

                      return (
                        <article className="video-card" key={`${copyIndex}-${item.slot}`}>
                          <div className="video-card-screen">
                            {activeVideoKey === videoKey ? (
                              <iframe
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                loading="lazy"
                                src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1`}
                                tabIndex={copyIndex === 1 ? -1 : undefined}
                                title={item.title}
                              />
                            ) : (
                              <button
                                aria-label={`${item.title}を再生`}
                                className="video-thumb"
                                onClick={() => setActiveVideoKey(videoKey)}
                                tabIndex={copyIndex === 1 ? -1 : undefined}
                                type="button"
                              >
                                <img
                                  alt=""
                                  decoding="async"
                                  loading={copyIndex === 0 ? "eager" : "lazy"}
                                  src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`}
                                />
                                <span className="video-play" aria-hidden="true" />
                                <span className="video-card-badge">WATCH</span>
                              </button>
                            )}
                          </div>
                          <div className="video-card-meta">
                            <span>{item.slot}</span>
                            <span>{item.status}</span>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
