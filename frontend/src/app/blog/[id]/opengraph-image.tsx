import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Image({ params }: Props) {
  const { id } = await params;
  const apiUrl = process.env.API_URL;

  let title = "Blog Post";
  let tags: string[] = [];
  let dateStr = "";

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/posts/${id}`);
      if (res.ok) {
        const post = await res.json();
        title = post.title || title;
        if (post.tags && Array.isArray(post.tags)) {
          tags = post.tags;
        } else if (post.tag_list && Array.isArray(post.tag_list)) {
          tags = post.tag_list;
        } else if (typeof post.tags === "string") {
          tags = post.tags.split(",").map((t: string) => t.trim());
        }
        dateStr = post.published_at || post.created_at || "";
      }
    } catch (e) {
      console.error("Failed to fetch post data for OG image", e);
    }
  }

  // Format date if present
  let formattedDate = "";
  if (dateStr) {
    try {
      const date = new Date(dateStr);
      if (!Number.isNaN(date.getTime())) {
        formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
          date.getDate()
        ).padStart(2, "0")}`;
      }
    } catch (e) {
      // Ignore parsing errors
    }
  }

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
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #090d16 0%, #111827 60%, #1e1b4b 100%)",
          fontFamily: "Noto Sans JP, sans-serif",
          color: "white",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Neon glowing decorative shapes */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            right: "-15%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top bar with branding */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#3b82f6",
              letterSpacing: "0.05em",
            }}
          >
            enje.dev / TECH BLOG
          </span>
          {formattedDate && (
            <span
              style={{
                fontSize: "20px",
                color: "#64748b",
                fontWeight: "bold",
              }}
            >
              {formattedDate}
            </span>
          )}
        </div>

        {/* Main Content Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: "40px",
            marginBottom: "40px",
            width: "100%",
          }}
        >
          {/* Tags list */}
          {tags.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              {tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: "rgba(59, 130, 246, 0.15)",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                    padding: "6px 16px",
                    borderRadius: "8px",
                    fontSize: "18px",
                    color: "#60a5fa",
                    fontWeight: "bold",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Dynamic Article Title */}
          <h1
            style={{
              fontSize: title.length > 30 ? "46px" : "56px",
              fontWeight: 900,
              lineHeight: "1.4",
              textAlign: "left",
              margin: 0,
              color: "white",
              letterSpacing: "-0.01em",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              maxHeight: "240px",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom Branding / URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "24px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              color: "#94a3b8",
              fontWeight: "bold",
            }}
          >
            Read the full article at https://enje.dev/blog/{id}
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
