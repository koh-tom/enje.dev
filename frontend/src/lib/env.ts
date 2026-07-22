import { z } from "zod";

/**
 * サーバー側の環境変数。起動時に検証し、足りなければ即座に失敗させる。
 * クライアントで使えるのは NEXT_PUBLIC_ で始まるものだけ。
 */
const schema = z.object({
  API_URL: z.url().transform((v) => v.replace(/\/$/, "")),
  NEXT_PUBLIC_SITE_URL: z.url().transform((v) => v.replace(/\/$/, "")),
  REVALIDATE_SECRET: z.string().min(8),
});

const parsed = schema.safeParse({
  API_URL: process.env.API_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
});

if (!parsed.success) {
  const issues = parsed.error.issues.map(
    (i) => `${i.path.join(".")}: ${i.message}`,
  );
  throw new Error(
    `環境変数が不正です。frontend/.env.example を参照してください。\n${issues.join("\n")}`,
  );
}

export const env = parsed.data;
