import Link from "next/link";
import type { PageMeta } from "@/types/content";

type PaginationProps = { meta: PageMeta; buildHref: (page: number) => string };

export function Pagination({ meta, buildHref }: PaginationProps) {
  if (meta.total_pages <= 1) return null;
  const prev = meta.page > 1 ? meta.page - 1 : null;
  const next = meta.page < meta.total_pages ? meta.page + 1 : null;
  return (
    <nav
      aria-label="ページ送り"
      className="flex items-center justify-between border-t border-rule pt-4"
    >
      {prev ? (
        <Link href={buildHref(prev)} className="font-display text-xl">
          ← 新しい記事
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm text-ink-soft">
        {meta.page} / {meta.total_pages}
      </span>
      {next ? (
        <Link href={buildHref(next)} className="font-display text-xl">
          古い記事 →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
