import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { formatDate, toDateTimeAttr } from "@/lib/format";
import type { PostSummary } from "@/types/content";

type PostCardProps = { post: PostSummary; headingLevel?: "h2" | "h3" };

/** 記事一覧の 1 件。枠線だけのカード */
export function PostCard({
  post,
  headingLevel: Heading = "h3",
}: PostCardProps) {
  return (
    <article className="frame flex flex-col gap-2 p-5 hover:-rotate-[0.3deg]">
      <div className="flex flex-wrap items-baseline gap-x-3 text-sm text-ink-soft">
        <time dateTime={toDateTimeAttr(post.published_at)}>
          {formatDate(post.published_at)}
        </time>
        <span>{post.reading_time} 分で読める</span>
        {post.status === "draft" && <Tag>下書き</Tag>}
      </div>
      <Heading className="text-h3">
        <Link
          href={`/blog/${post.slug}`}
          className="no-underline hover:underline-wavy"
        >
          {post.title}
        </Link>
      </Heading>
      {post.excerpt && <p className="text-ink-soft">{post.excerpt}</p>}
      {post.tags.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li key={tag.slug}>
              <Tag>{tag.name}</Tag>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
