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

export const metadata: Metadata = {
  title: "ASURA | Terminal LP",
  description: "terminal.html の世界観を受け継ぐ Next.js ランディングページ基盤"
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
