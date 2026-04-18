"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import socials from "../social/socials.json";

type Social = {
  href: string;
  id: string;
  label: string;
  title: string;
};

const SOCIALS = socials as Social[];

function SocialIcon({ id }: { id: string }) {
  if (id === "yt") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M5 7.5h14v9H5z" />
        <path d="m10 9.5 5 2.5-5 2.5z" />
      </svg>
    );
  }

  if (id === "note") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7 4.5h7.5L18 8v11.5H7z" />
        <path d="M14.5 4.5V8H18" />
        <path d="M10 11h5" />
        <path d="M10 14h4" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m7 6 10 12" />
      <path d="M17 6 7 18" />
      <path d="M5 12h14" />
    </svg>
  );
}

export default function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";

    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
  };

  return (
    <nav className="nav">
      <div className="nav-l">
        <div className="dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="nav-title">
          <b>asura</b>@dev:<span className="nav-home">~</span>$
        </div>
      </div>

      <div className="nav-r">
        <div className="nav-links">
          <Link href="#service">service</Link>
          <Link href="#works">works</Link>
          <Link href="#profile">profile</Link>
          <Link href="#faq">faq</Link>
        </div>
        <div className="nav-socials" aria-label="social links">
          {SOCIALS.map((social) => (
            <Link
              aria-label={`open ${social.title}`}
              className={`nav-social nav-social-${social.id}`}
              href={social.href}
              key={social.label}
              rel="noreferrer"
              target="_blank"
              title={social.title}
            >
              <SocialIcon id={social.id} />
            </Link>
          ))}
        </div>
        <button className="theme-tog" onClick={toggleTheme} type="button">
          [{theme}]
        </button>
      </div>
    </nav>
  );
}
