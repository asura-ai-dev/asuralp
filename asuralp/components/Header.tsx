"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SOCIALS = [
  { href: "#sns", label: "yt" },
  { href: "#sns", label: "note" },
  { href: "#sns", label: "x" },
];

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
        <Link href="#service">service</Link>
        <Link href="#works">works</Link>
        <Link href="#profile">profile</Link>
        <Link href="#faq">faq</Link>
        <div className="nav-socials" aria-label="social links">
          {SOCIALS.map((social) => (
            <Link className="nav-social" href={social.href} key={social.label}>
              {social.label}
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
