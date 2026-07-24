import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";
import { CACHE_TAGS, type CacheTag } from "@/lib/api/client";
import { env } from "@/lib/env";

const bodySchema = z.object({
  tags: z
    .array(z.enum(Object.values(CACHE_TAGS) as [CacheTag, ...CacheTag[]]))
    .min(1),
});

function secretMatches(given: string | null) {
  if (!given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(env.REVALIDATE_SECRET);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * POST /api/revalidate  { "tags": ["posts"] }
 * Rails の Revalidator から呼ばれ、ISR キャッシュをタグ単位で破棄する
 */
export async function POST(request: Request) {
  if (!secretMatches(request.headers.get("x-revalidate-secret"))) {
    return NextResponse.json(
      { error: { code: "unauthorized" } },
      { status: 401 },
    );
  }
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "invalid", message: "tags を指定してください" } },
      { status: 422 },
    );
  }
  for (const tag of parsed.data.tags) revalidateTag(tag, "max");
  return NextResponse.json({
    revalidated: parsed.data.tags,
    at: new Date().toISOString(),
  });
}
