import type { Metadata } from "next";
import { Pagination } from "@/components/blog/Pagination";
import { PostList } from "@/components/blog/PostList";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TagLink } from "@/components/ui/Tag";
import { getPosts, getTags } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

const description =
  "enjeの技術ブログです。Webシステム開発（Next.js, Railsなど）、FPGA設計、電子工作、および日々の技術的な学びや知見についてアウトプットしています。";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description,
  path: "/blog",
});

type SearchParams = Promise<{ tag?: string; page?: string }>;

function parsePage(value: string | undefined) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : 1;
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { tag, page: rawPage } = await searchParams;
  const page = parsePage(rawPage);
  const [{ data: posts, meta }, tags] = await Promise.all([
    getPosts({ tag, page }),
    getTags(),
  ]);

  const buildHref = (p: number) => {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/blog?${qs}` : "/blog";
  };

  return (
    <div className="flex flex-col gap-8">
      <SectionTitle as="h1" sub="Blog">
        記事
      </SectionTitle>

      {tags.length > 0 && (
        <nav
          aria-label="タグで絞り込む"
          className="flex flex-wrap items-center gap-2"
        >
          <TagLink href="/blog" active={!tag}>
            すべて
          </TagLink>
          {tags.map((t) => (
            <TagLink
              key={t.slug}
              href={`/blog?tag=${encodeURIComponent(t.slug)}`}
              active={tag === t.slug}
            >
              {t.name}
              {t.posts_count != null && (
                <span className="ml-1 text-xs opacity-70">{t.posts_count}</span>
              )}
            </TagLink>
          ))}
        </nav>
      )}

      {posts.length === 0 ? (
        <EmptyState
          title="まだ記事がありません"
          description={
            tag
              ? "このタグの記事はまだありません。"
              : "最初の記事を準備中です。"
          }
        />
      ) : (
        <PostList posts={posts} />
      )}

      <Pagination meta={meta} buildHref={buildHref} />
    </div>
  );
}
