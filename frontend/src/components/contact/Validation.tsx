import { z } from "zod";

export const contactSchema = z.object({
  name: z //名前 : 1~16文字
    .string()
    .min(1, "名前が入力されていません。")
    .max(16, "最大16文字までです。"),

  email: z.email({
    message: "メールアドレスの形式で入力してください。",
  }),

  subject: z //件名 : 1~50文字
    .string()
    .min(1, "件名が入力されていません。")
    .max(50, "最大50文字までです。"),

  message: z //本文 : 1~200文字
    .string()
    .min(1, "本文が入力されていません。")
    .max(200, "最大200文字までです。"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
