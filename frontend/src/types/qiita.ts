import { z } from "zod";
import type { PostSummary } from "./content";

/** Qiita API v2 の記事（使う項目だけ） */
export const qiitaItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.url(),
  created_at: z.string(),
  tags: z.array(z.object({ name: z.string() })),
});

export type QiitaItem = z.infer<typeof qiitaItemSchema>;

/** トップの「最近の記事」の 1 件。このサイトの記事か Qiita の記事 */
export type RecentEntry =
  | { kind: "post"; date: string | null; post: PostSummary }
  | { kind: "qiita"; date: string; item: QiitaItem };
