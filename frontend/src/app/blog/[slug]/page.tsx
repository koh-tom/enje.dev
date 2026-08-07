import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { Toc } from "@/components/blog/Toc";
import { JsonLd } from "@/components/JsonLd";
import { Icon } from "@/components/ui/Icon";
import { TagLink } from "@/components/ui/Tag";
import { ApiError, getPost } from "@/lib/api";
import { formatDate, toDateTimeAttr } from "@/lib/format";
import { buildMetadata, jsonLd } from "@/lib/seo";
import type { Post } from "@/types/content";

export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

async function loadPost(slug: string): Promise<Post> {
  try {
    return await getPost(slug);
  } catch (error) {
    if (error instanceof ApiError && error.isNotFound) notFound();
    throw error;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.published_at,
    modifiedTime: post.updated_at,
    noIndex: post.status === "draft",
  });
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await loadPost(slug);

  return (
    <article className="flex flex-col gap-8">
      <JsonLd data={jsonLd.blogPosting(post)} />
      <JsonLd
        data={jsonLd.breadcrumb([
          { name: "Home", path: "" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      <Link
        href="/blog"
        className="inline-flex items-center gap-1 self-start text-sm no-underline hover:underline-wavy"
      >
        <Icon name="arrowLeft" size={16} /> 記事一覧
      </Link>

      <header className="flex flex-col gap-3 border-b-2 border-ink pb-6">
        <div className="flex flex-wrap items-baseline gap-x-3 text-sm text-ink-soft">
          <time dateTime={toDateTimeAttr(post.published_at)}>
            {formatDate(post.published_at)}
          </time>
          <span>{post.reading_time} 分で読める</span>
          {post.status === "draft" && <span className="font-bold">下書き</span>}
        </div>
        <h1 className="text-h1">{post.title}</h1>
        {post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <li key={tag.slug}>
                <TagLink href={`/blog?tag=${encodeURIComponent(tag.slug)}`}>
                  {tag.name}
                </TagLink>
              </li>
            ))}
          </ul>
        )}
      </header>

      {post.cover_image && (
        <Image
          src={post.cover_image}
          alt=""
          width={1200}
          height={630}
          priority
          className="frame h-auto w-full p-0"
        />
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_16rem] lg:items-start">
        <ArticleBody html={post.body_html} />
        <aside className="lg:sticky lg:top-6">
          <Toc entries={post.toc} />
        </aside>
      </div>

      <nav
        aria-label="前後の記事"
        className="grid gap-4 border-t border-rule pt-6 sm:grid-cols-2"
      >
        {post.previous_post ? (
          <Link
            href={`/blog/${post.previous_post.slug}`}
            className="frame flex flex-col gap-1 p-4 no-underline hover:-rotate-[0.3deg]"
          >
            <span className="text-sm text-ink-soft">← 前の記事</span>
            <span className="font-bold">{post.previous_post.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {post.next_post && (
          <Link
            href={`/blog/${post.next_post.slug}`}
            className="frame flex flex-col gap-1 p-4 text-right no-underline hover:rotate-[0.3deg]"
          >
            <span className="text-sm text-ink-soft">次の記事 →</span>
            <span className="font-bold">{post.next_post.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
