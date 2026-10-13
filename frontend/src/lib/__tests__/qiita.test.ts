import { afterEach, describe, expect, it, vi } from "vitest";
import { getQiitaItems, mergeRecent } from "@/lib/qiita";
import type { PostSummary } from "@/types/content";
import type { QiitaItem } from "@/types/qiita";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);
afterEach(() => fetchMock.mockReset());

const item = (id: string, created_at: string): QiitaItem => ({
  id,
  title: `Qiita ${id}`,
  url: `https://qiita.com/lamela/items/${id}`,
  created_at,
  tags: [{ name: "C++" }],
});

const post = (slug: string, published_at: string | null): PostSummary => ({
  slug,
  title: slug,
  excerpt: "",
  reading_time: 1,
  cover_image: null,
  status: "published",
  published_at,
  updated_at: "2026-01-01T00:00:00+09:00",
  tags: [],
});

describe("getQiitaItems", () => {
  it("ユーザーの記事を件数指定で取得し、1 時間キャッシュする", async () => {
    fetchMock.mockResolvedValue(
      Response.json([
        { ...item("a", "2026-05-18T23:07:41+09:00"), body: "長い本文" },
      ]),
    );
    const items = await getQiitaItems(3);
    expect(items).toEqual([item("a", "2026-05-18T23:07:41+09:00")]);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe(
      "https://qiita.com/api/v2/users/lamela/items?page=1&per_page=3",
    );
    expect(init.next).toEqual({ tags: ["qiita"], revalidate: 3600 });
  });

  it("エラー応答は例外", async () => {
    fetchMock.mockResolvedValue(new Response("rate limited", { status: 403 }));
    await expect(getQiitaItems()).rejects.toThrow(/403/);
  });
});

describe("mergeRecent", () => {
  it("両方を日付の新しい順に混ぜて先頭だけ返す", () => {
    const entries = mergeRecent(
      [
        post("new", "2026-09-01T00:00:00+09:00"),
        post("old", "2025-01-01T00:00:00+09:00"),
      ],
      [
        item("mid", "2026-05-18T23:07:41+09:00"),
        item("older", "2025-12-25T23:22:06+09:00"),
      ],
      3,
    );
    expect(
      entries.map((e) => (e.kind === "post" ? e.post.slug : e.item.id)),
    ).toEqual(["new", "mid", "older"]);
  });
});
