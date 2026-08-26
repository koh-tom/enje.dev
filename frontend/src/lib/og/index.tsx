import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * OG 用フォントはリポジトリに同梱する（Noto Sans JP 700、日本語サブセット）。
 * ビルド時や実行時にネットワークへ依存させない。
 * next.config.ts の outputFileTracingIncludes で standalone にも含める。
 */
const FONT_PATH = path.join(process.cwd(), "src/lib/og/NotoSansJP-700.woff");
let fontCache: Promise<ArrayBuffer> | null = null;

function loadFont(): Promise<ArrayBuffer> {
  fontCache ??= readFile(FONT_PATH).then((buf) =>
    buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
  );
  return fontCache;
}

type OgProps = {
  title: string;
  kicker?: string;
  meta?: string;
  tags?: string[];
};

/**
 * OG 画像。紙（白）にインク（navy）の 2 色、太い枠線、角丸なし。
 */
export async function renderOgImage({
  title,
  kicker,
  meta,
  tags = [],
}: OgProps) {
  const font = await loadFont();
  const fonts = font
    ? [
        {
          name: "Noto Sans JP",
          data: font,
          weight: 700 as const,
          style: "normal" as const,
        },
      ]
    : [];
  const ink = "#132257";
  const paper = "#ffffff";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: paper,
        color: ink,
        padding: 40,
        fontFamily: "Noto Sans JP, sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: `6px solid ${ink}`,
          padding: "48px 56px",
          backgroundImage: `linear-gradient(${ink}14 1px, transparent 1px), linear-gradient(90deg, ${ink}14 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
          }}
        >
          <span>{kicker ?? SITE.name}</span>
          {meta && <span style={{ opacity: 0.7 }}>{meta}</span>}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 28 ? 52 : 64,
            lineHeight: 1.35,
            fontWeight: 700,
            maxHeight: 300,
            overflow: "hidden",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  border: `3px solid ${ink}`,
                  padding: "4px 14px",
                  fontSize: 24,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span style={{ fontSize: 26, borderBottom: `4px solid ${ink}` }}>
            {SITE.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    </div>,
    { ...OG_SIZE, fonts },
  );
}
