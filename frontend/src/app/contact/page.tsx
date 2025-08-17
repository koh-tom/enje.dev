"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { contactSchema, type ContactFormValues } from "@/components/contact/Validation";
import { zodResolver } from "@hookform/resolvers/zod";


/*
 * Contactページ
 * 
 *
 */

export default function Contact() {
  const resolver = zodResolver(contactSchema);
  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    resolver,
  });

  const onSubmit = (values: ContactFormValues) => {
    console.log("contact submit:", values);
  };

  return (
    <section className="py-24 px-4 bg-gray-900 text-white min-h-screen">
      <div className="max-w-xl mx-auto py-12">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Contact / お問い合わせ
          </h1>
          <p className="text-gray-400">
            ご質問やコメントなど、お気軽にお送りください。
          </p>
        </div>

        <div className="bg-white/5 dark:bg-gray-900 backdrop-blur-sm border border-white/10 dark:border-gray-800 p-8 rounded-2xl shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">お名前</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="お名前を入力してください"
                        className="bg-white/5 border-white/10 focus:border-blue-500 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      メールアドレス
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="bg-white/5 border-white/10 focus:border-blue-500 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">件名</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ご用件を入力してください"
                        className="bg-white/5 border-white/10 focus:border-blue-500 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">
                      メッセージ本文
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="メッセージ内容を入力してください"
                        rows={5}
                        className="bg-white/5 border-white/10 focus:border-blue-500 transition-colors resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                メッセージを送信
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
