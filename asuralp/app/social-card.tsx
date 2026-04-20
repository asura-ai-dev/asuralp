import { ImageResponse } from "next/og";

type CardSize = {
  width: number;
  height: number;
};

const brand = {
  bg: "#0a0d0b",
  bg2: "#0f1411",
  peach: "#ffb07a",
  mint: "#7fe3a8",
  fg: "#dfe8e1",
  fgDim: "#7a8a80",
  line: "rgba(127, 227, 168, 0.24)"
};

async function loadFonts() {
  try {
    const [monoData, decoData] = await Promise.all([
      fetch(
        "https://fonts.gstatic.com/s/jetbrainsmono/v23/tDbY2o-flEEny0FZhsfZ0J-GAa6-Lf4QGd4.woff"
      ).then((res) => res.arrayBuffer()),
      fetch(
        "https://fonts.gstatic.com/s/firacode/v27/uU9NCBsR6Z2vfE9aq3bh3dSDxA.woff"
      ).then((res) => res.arrayBuffer())
    ]);

    return [
      {
        name: "JetBrains Mono",
        data: monoData,
        style: "normal" as const
      },
      {
        name: "Fira Code",
        data: decoData,
        style: "normal" as const
      }
    ];
  } catch {
    return [];
  }
}

export async function generateSocialCard(size: CardSize) {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: `linear-gradient(135deg, ${brand.bg} 0%, ${brand.bg2} 100%)`,
          color: brand.fg,
          padding: "48px"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(127,227,168,0.03) 2px, rgba(127,227,168,0.03) 3px)"
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -100,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(255,176,122,0.18)",
            filter: "blur(50px)"
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -100,
            bottom: -120,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(127,227,168,0.2)",
            filter: "blur(50px)"
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: `1px solid ${brand.line}`,
            borderRadius: 14,
            padding: "44px",
            background: "rgba(15, 20, 17, 0.84)"
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "JetBrains Mono",
              fontSize: 30,
              color: brand.peach,
              letterSpacing: "0.08em"
            }}
          >
            &gt; asura.dev
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Fira Code",
                fontSize: 72,
                lineHeight: 1,
                color: brand.fg
              }}
            >
              ASURA
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "JetBrains Mono",
                fontSize: 34,
                color: brand.mint
              }}
            >
              Terminal LP
            </div>
            <div
              style={{
                display: "flex",
                fontFamily: "JetBrains Mono",
                fontSize: 24,
                color: brand.fgDim,
                maxWidth: 860,
                lineHeight: 1.5
              }}
            >
              built solo, scaled with agents — terminal.html の世界観を受け継ぐ
              Next.jsランディングページ
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "JetBrains Mono",
              fontSize: 22,
              color: brand.fgDim
            }}
          >
            <div style={{ display: "flex" }}>asura.dev</div>
            <div style={{ display: "flex", color: brand.mint }}>systems operational ●</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts
    }
  );
}
