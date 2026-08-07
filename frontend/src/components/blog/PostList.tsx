"use client";

import { useDeferredValue, useId, useState } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Field";
import type { PostSummary } from "@/types/content";
import { PostCard } from "./PostCard";

type PostListProps = { posts: PostSummary[] };

/** 表示中のページ内をキーワードで絞り込む。タグ絞り込みとページ送りはサーバー側 */
export function PostList({ posts }: PostListProps) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query.trim().toLowerCase());
  const inputId = useId();

  const filtered = deferred
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(deferred) ||
          post.excerpt.toLowerCase().includes(deferred) ||
          post.tags.some((tag) => tag.name.toLowerCase().includes(deferred)),
      )
    : posts;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <label htmlFor={inputId} className="text-sm text-ink-soft">
          このページの記事を検索
        </label>
        <Input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="キーワード、タグ名"
          autoComplete="off"
        />
      </div>
      <p className="text-sm text-ink-soft" aria-live="polite">
        {filtered.length} 件
      </p>
      {filtered.length === 0 ? (
        <EmptyState
          title="見つかりませんでした"
          description="別のキーワードで試してみてください。"
        />
      ) : (
        <ul className="flex flex-col gap-5">
          {filtered.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
