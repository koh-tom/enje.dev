"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type ContactFormValues,
  contactSchema,
} from "@/components/contact/Validation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
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
  );
}
