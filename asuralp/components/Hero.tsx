"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ASCII_ART = String.raw`
    _   _____ __  _______  ___      ___    ___
   / | / ___// / / / __ \/   |    /   |  /  _/
  /  | \__ \/ / / / /_/ / /| |   / /| |  / /
 / /| |___/ / /_/ / _, _/ ___ |  / ___ |_/ /
/_/ |_|____/\____/_/ |_/_/  |_| /_/  |_/___/
`;

type HeroState = {
  t1: string;
  t2: string;
  t3: string;
  t4: string;
  t5: string;
};

const INITIAL_STATE: HeroState = {
  t1: "",
  t2: "",
  t3: "",
  t4: "",
  t5: "",
};

const sleep = (ms: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

async function typeText(
  update: (value: string) => void,
  text: string,
  delay: number,
) {
  for (let index = 0; index < text.length; index += 1) {
    update(text.slice(0, index + 1));
    // eslint-disable-next-line no-await-in-loop
    await sleep(delay);
  }
}

export default function Hero() {
  const [typed, setTyped] = useState(INITIAL_STATE);
  const [showAscii, setShowAscii] = useState(false);
  const [showSecondPrompt, setShowSecondPrompt] = useState(false);
  const [showThirdPrompt, setShowThirdPrompt] = useState(false);
  const [showCta, setShowCta] = useState(false);

  const prompt = useMemo(
    () => (
      <span className="prompt">
        <span className="u">asura</span>
        <span className="p">@</span>
        <span className="h">dev</span>
        <span className="p">:</span>
        <span className="nav-home">~</span>
        <span className="p">$</span>
      </span>
    ),
    [],
  );

  useEffect(() => {
    let active = true;

    const update = (key: keyof HeroState, value: string) => {
      if (!active) {
        return;
      }

      setTyped((current) => ({ ...current, [key]: value }));
    };

    const run = async () => {
      await sleep(300);
      await typeText((value) => update("t1", value), "cat ./hero.txt", 30);
      await sleep(240);
      await typeText(
        (value) => update("t2", value),
        "> 寝ない従業員を手にいれる。",
        14,
      );
      if (!active) {
        return;
      }

      setShowAscii(true);
      await sleep(260);
      setShowSecondPrompt(true);
      await typeText(
        (value) => update("t3", value),
        "cat ./why-asura.txt",
        28,
      );
      await sleep(220);
      await typeText(
        (value) => update("t4", value),
        "> ASURA.AI が裏側の業務を休まず支え、あなたは企画や判断に集中できます。",
        12,
      );
      await sleep(240);
      setShowThirdPrompt(true);
      await typeText(
        (value) => update("t5", value),
        "./portfolio.sh --open",
        26,
      );
      if (active) {
        setShowCta(true);
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="term hero-term">
          <div className="term-bar">
            <div className="dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="path">~/asura/lp — next dev — 132x40</div>
            <div className="tabs">
              <span className="act">hero.tsx</span>
              <span>about.md</span>
              <span>contact.json</span>
            </div>
          </div>

          <div className="term-body">
            <span className="line">
              {prompt} <span className="cmd">{typed.t1}</span>
            </span>
            <span className="line out hero-copy">{typed.t2}</span>

            {showAscii ? (
              <div className="ascii-wrap" aria-label="ASURA.AI ascii logo">
                <pre className="ascii ascii-hero">
                  {ASCII_ART}
                  {"\n"}ASURA.AI
                </pre>
              </div>
            ) : null}

            {showSecondPrompt ? (
              <span className="line">
                {prompt} <span className="cmd">{typed.t3}</span>
              </span>
            ) : null}

            {typed.t4 ? <span className="line out">{typed.t4}</span> : null}

            {showThirdPrompt ? (
              <span className="line">
                {prompt} <span className="cmd">{typed.t5}</span>
                <span className="cursor" aria-hidden="true" />
              </span>
            ) : null}

            {showCta ? (
              <div className="term-cta">
                <Link className="btn primary" href="#cta">
                  $ ./contact.sh
                </Link>
                <Link className="btn ghost" href="#works">
                  cat ./works/*
                </Link>
                <Link className="btn ghost" href="#service">
                  ls ./services
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
