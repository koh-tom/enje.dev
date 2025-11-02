import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "enje.devへのお問い合わせページです。制作のご依頼、ご質問、協業のご提案など、こちらからお気軽にご連絡ください。",
  openGraph: {
    title: "Contact | enje.dev",
    description:
      "enje.devへのお問い合わせページです。制作のご依頼、ご質問、協業のご提案など、こちらからお気軽にご連絡ください。",
  },
};

export default function ContactPage() {
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
          <p className="text-red-500">
            現在実装中のため、ご連絡は直接メールもしくはGitHubまでお願いします。
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
