import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fira_Code, JetBrains_Mono } from "next/font/google";

import "../styles/globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono"
});

const deco = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-deco"
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  "http://localhost:3000";

const description = "AIエージェントで、企業の業務を24時間自動化するサービス";

export const metadata: Metadata = {
  title: "ASURA | Terminal LP",
  description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "ASURA | Terminal LP",
    description,
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 630,
        alt: "ASURA.AI terminal landing page"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ASURA | Terminal LP",
    description,
    images: ["/twitter-image.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja" data-theme="dark" suppressHydrationWarning>
      <body className={`${mono.variable} ${deco.variable}`}>
        <div className="bg-blobs" aria-hidden="true" />
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
