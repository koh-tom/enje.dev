import { ImageResponse } from "next/og";

export const runtime = "edge";

// Next.js standard sizes for favicons
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e1b4b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#3b82f6",
          fontWeight: 900,
          borderRadius: "8px",
          border: "1px solid rgba(59,130,246,0.3)",
          fontFamily: "sans-serif",
        }}
      >
        e
      </div>
    ),
    {
      ...size,
    }
  );
}
