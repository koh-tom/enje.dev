import { ImageResponse } from "next/og";

export const runtime = "edge";

// Standard Apple touch icon size
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 110,
          background: "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e1b4b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#3b82f6",
          fontWeight: 900,
          borderRadius: "40px",
          border: "4px solid rgba(59,130,246,0.3)",
          fontFamily: "sans-serif",
          boxShadow: "0 0 30px rgba(59,130,246,0.5)",
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
