import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "enje.dev | Web開発 ⇔ FPGA研究";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  // Load Noto Sans JP Bold font dynamically from CDN
  let fontData: ArrayBuffer | null = null;
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5.0.19/files/noto-sans-jp-japanese-700-normal.woff"
    );
    if (res.ok) {
      fontData = await res.arrayBuffer();
    }
  } catch (e) {
    console.error("Failed to load Japanese font", e);
  }

  const fonts = fontData
    ? [
        {
          name: "Noto Sans JP",
          data: fontData,
          weight: 700 as const,
          style: "normal" as const,
        },
      ]
    : [];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #311042 100%)",
          fontFamily: "Noto Sans JP, sans-serif",
          color: "white",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Neon glowing decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Outer subtle border */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
            right: "30px",
            bottom: "30px",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "24px",
            display: "flex",
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Tagline / Category */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                padding: "8px 20px",
                borderRadius: "9999px",
                fontSize: "20px",
                fontWeight: "bold",
                color: "#0f172a",
                boxShadow: "0 4px 20px rgba(59,130,246,0.3)",
              }}
            >
              PORTFOLIO & BLOG
            </span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: "68px",
              fontWeight: 900,
              textAlign: "center",
              margin: "0 0 24px 0",
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
              background: "linear-gradient(to right, #ffffff, #f1f5f9, #cbd5e1)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            enje.dev
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              textAlign: "center",
              margin: 0,
              maxWidth: "800px",
              lineHeight: "1.6",
            }}
          >
            Web開発 ⇔ FPGA研究
          </p>
        </div>

        {/* Footer branding */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "60px",
            right: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            paddingTop: "20px",
          }}
        >
          <span style={{ fontSize: "18px", color: "#64748b", fontWeight: "bold" }}>
            https://enje.dev
          </span>
          <span
            style={{
              fontSize: "18px",
              color: "#3b82f6",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981" }} />
            Active Portfolio
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
