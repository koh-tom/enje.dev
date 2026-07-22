import "server-only";
import type { z } from "zod";
import { env } from "@/lib/env";

/** fetch のキャッシュタグ。Rails の Revalidator と揃える */
export const CACHE_TAGS = {
  posts: "posts",
  projects: "projects",
  tags: "tags",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

/** API が返すエラー。404 は呼び出し側で notFound() に変換する */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly details?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ApiError";
  }

  get isNotFound() {
    return this.status === 404;
  }
}

type GetOptions = {
  tags: CacheTag[];
  /** 秒。既定 1 時間。タグによる再検証が主で、これは保険 */
  revalidate?: number;
  searchParams?: Record<string, string | number | undefined>;
};

function buildUrl(path: string, searchParams?: GetOptions["searchParams"]) {
  const url = new URL(`${env.API_URL}${path}`);
  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (value !== undefined && value !== "")
      url.searchParams.set(key, String(value));
  }
  return url;
}

async function toApiError(response: Response) {
  const body = (await response.json().catch(() => null)) as {
    error?: {
      code?: string;
      message?: string;
      details?: Record<string, string[]>;
    };
  } | null;
  return new ApiError(
    response.status,
    body?.error?.code ?? "unknown",
    body?.error?.message ?? `API error ${response.status}`,
    body?.error?.details,
  );
}

/**
 * GET してレスポンスを zod で検証する。
 * ネットワーク失敗やスキーマ不一致は例外にする（ISR は失敗時に前回の結果を使い続ける）。
 */
export async function apiGet<T extends z.ZodType>(
  path: string,
  schema: T,
  { tags, revalidate = 3600, searchParams }: GetOptions,
): Promise<z.infer<T>> {
  const response = await fetch(buildUrl(path, searchParams), {
    headers: { accept: "application/json" },
    next: { tags, revalidate },
  });
  if (!response.ok) throw await toApiError(response);
  return schema.parse(await response.json());
}

/** POST。キャッシュしない */
export async function apiPost<T extends z.ZodType>(
  path: string,
  body: unknown,
  schema: T,
): Promise<z.infer<T>> {
  const response = await fetch(buildUrl(path), {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!response.ok) throw await toApiError(response);
  const text = await response.text();
  return schema.parse(text ? JSON.parse(text) : null);
}
