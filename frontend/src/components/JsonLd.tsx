import { serializeJsonLd } from "@/lib/seo";

type JsonLdProps = { data: Record<string, unknown> };

/** 構造化データを <script type="application/ld+json"> として埋め込む */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: serializeJsonLd で < をエスケープ済み
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
