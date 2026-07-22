import { z } from "zod";
import { apiPost } from "./client";

export const contactInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "お名前を入力してください")
    .max(50, "50 文字以内で入力してください"),
  email: z.email("メールアドレスの形式で入力してください").max(254),
  subject: z
    .string()
    .trim()
    .min(1, "件名を入力してください")
    .max(100, "100 文字以内で入力してください"),
  message: z
    .string()
    .trim()
    .min(1, "本文を入力してください")
    .max(2000, "2000 文字以内で入力してください"),
  website: z.string().max(0).optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactInputSchema>;

export async function sendContact(input: ContactInput): Promise<void> {
  await apiPost("/contacts", { contact: input }, z.null());
}
