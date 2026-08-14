import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { buildMetadata } from "@/lib/seo";

const description =
  "enje.devへのお問い合わせページです。制作のご依頼、ご質問、協業のご提案など、こちらからお気軽にご連絡ください。";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8">
      <SectionTitle as="h1" sub="Contact">
        連絡
      </SectionTitle>
      <p className="text-ink-soft">
        ご質問やコメントなど、お気軽にお送りください。
      </p>
      <ContactForm />
    </div>
  );
}
