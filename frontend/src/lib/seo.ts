import type { Metadata } from "next";
import { env } from "@/lib/env";

export const SITE = {
  name: "enje.dev",
  title: "enje.dev | Web開発 ⇔ FPGA研究",
  description:
    "Web開発とFPGA研究に関するポートフォリオ＆技術ブログ。制作したWebアプリケーションやFPGAなどのハードウェア開発に関するブログ記事、写真ギャラリーなどを掲載しています。",
  author: "enje",
  locale: "ja_JP",
  url: env.NEXT_PUBLIC_SITE_URL,
} as const;

type PageMeta = {
  title?: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  image?: string | null;
  publishedTime?: string | null;
  modifiedTime?: string | null;
  noIndex?: boolean;
};

/** 各ページの metadata はこれを通す。タイトルのテンプレートと canonical を揃える */
export function buildMetadata({
  title,
  description = SITE.description,
  path,
  type = "website",
  image,
  publishedTime,
  modifiedTime,
  noIndex = false,
}: PageMeta): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.title;
  return {
    title: title ?? SITE.title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type,
      ...(image ? { images: [{ url: image }] } : {}),
      ...(type === "article"
        ? {
            publishedTime: publishedTime ?? undefined,
            modifiedTime: modifiedTime ?? undefined,
            authors: [SITE.author],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/**
 * JSON-LD を安全に文字列化する。
 * `</script>` で閉じられないよう `<` をエスケープする。
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const jsonLd = {
  website: () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
  }),
  person: () => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.author,
    url: `${SITE.url}/about`,
    sameAs: ["https://github.com/koh-tom"],
  }),
  breadcrumb: (items: { name: string; path: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  }),
  blogPosting: (post: {
    slug: string;
    title: string;
    excerpt: string;
    published_at: string | null;
    updated_at: string;
    cover_image: string | null;
  }) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${SITE.url}/blog/${post.slug}`,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at,
    ...(post.cover_image ? { image: [`${SITE.url}${post.cover_image}`] } : {}),
    author: { "@type": "Person", name: SITE.author, url: `${SITE.url}/about` },
    publisher: { "@type": "Person", name: SITE.author, url: SITE.url },
  }),
};
