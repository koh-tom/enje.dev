"use server";

import { headers } from "next/headers";
import {
  ApiError,
  type ContactInput,
  contactInputSchema,
  sendContact,
} from "@/lib/api";

export type ContactState = {
  status: "idle" | "sent" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string>>;
  values?: Partial<ContactInput>;
};

/** 利用者の IP。Vercel は x-forwarded-for の先頭に接続元を入れる */
async function clientIp() {
  const list = await headers();
  const forwarded = list.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || list.get("x-real-ip");
}

/** お問い合わせフォームの Server Action。検証してから Rails に送る */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? ""),
  };

  const parsed = contactInputSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactInput;
      fieldErrors[key] ??= issue.message;
    }
    // honeypot に値があれば送信済みのふりをする
    if (fieldErrors.website) return { status: "sent" };
    return {
      status: "error",
      message: "入力内容を確認してください",
      fieldErrors,
      values: raw,
    };
  }

  try {
    await sendContact(parsed.data, { clientIp: await clientIp() });
    return { status: "sent" };
  } catch (error) {
    const message =
      error instanceof ApiError && error.code === "rate_limited"
        ? "送信回数が多すぎます。しばらく待ってから再度お試しください"
        : error instanceof ApiError && error.code === "unavailable"
          ? "現在お問い合わせは受け付けていません。GitHub や Bluesky からご連絡ください"
          : "送信に失敗しました。時間をおいて再度お試しください";
    return { status: "error", message, values: raw };
  }
}
