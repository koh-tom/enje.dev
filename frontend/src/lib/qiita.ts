import "server-only";
import { z } from "zod";
import { qiita } from "@/lib/site";
import type { PostSummary } from "@/types/content";
import {
  type QiitaItem,
  qiitaItemSchema,
  type RecentEntry,
} from "@/types/qiita";

const listSchema = z.array(qiitaItemSchema);

/**
 * Qiita の記事を新しい順に取得する。認証なし（60 回/時/IP）なので 1 時間キャッシュする。
 * 失敗したら例外。呼び出し側で空として扱う
 */
export async function getQiitaItems(limit = 3): Promise<QiitaItem[]> {
  const url = new URL(
    `https://qiita.com/api/v2/users/${encodeURIComponent(qiita.user)}/items`,
  );
  url.searchParams.set("page", "1");
  url.searchParams.set("per_page", String(limit));
  const response = await fetch(url, {
    headers: { accept: "application/json" },
    next: { tags: ["qiita"], revalidate: 3600 },
  });
  if (!response.ok) throw new Error(`Qiita API error ${response.status}`);
  return listSchema.parse(await response.json());
}

/** このサイトの記事と Qiita の記事を日付の新しい順に混ぜ、先頭 limit 件を返す */
export function mergeRecent(
  posts: PostSummary[],
  items: QiitaItem[],
  limit = 3,
): RecentEntry[] {
  const entries: RecentEntry[] = [
    ...posts.map((post) => ({
      kind: "post" as const,
      date: post.published_at,
      post,
    })),
    ...items.map((item) => ({
      kind: "qiita" as const,
      date: item.created_at,
      item,
    })),
  ];
  const time = (date: string | null) => (date ? new Date(date).getTime() : 0);
  return entries.sort((a, b) => time(b.date) - time(a.date)).slice(0, limit);
}
