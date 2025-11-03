import type { Metadata } from "next";
import { Achievements } from "@/components/about/Achievements";
import { BentoGrid } from "@/components/about/BentoGrid";
import { Philosophy } from "@/components/about/Philosophy";
import { ProfileHero } from "@/components/about/ProfileHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "enjeの経歴、専門スキル、これまでの実績、およびものづくりに対する開発哲学について紹介するページです。Webシステム開発からFPGA設計まで幅広く対応しています。",
  openGraph: {
    title: "About | enje.dev",
    description:
      "enjeの経歴、専門スキル、これまでの実績、およびものづくりに対する開発哲学について紹介するページです。Webシステム開発からFPGA設計まで幅広く対応しています。",
  },
};

export default function AboutPage() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "enje",
    "url": "https://enje.dev/about",
    "image": "https://enje.dev/favicon.ico",
    "jobTitle": "Web Developer & FPGA Researcher",
    "description": "Next.jsやRuby on Railsを用いたモダンなWebシステム開発から、FPGAやハードウェア、電子工作設計まで幅広く手掛けるマルチスタックエンジニア。",
    "sameAs": [
      "https://github.com/enje",
      "https://enje.dev"
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Person Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <main className="flex-grow">
        {/* プロフィールヒーロー: 写真と簡単な自己紹介 */}
        <ProfileHero />

        {/* Bento Grid: スキルや趣味、SNSなどをタイル状に配置 */}
        <BentoGrid />

        {/* 実績・資格: 受賞、資格取得、登壇などの実績 */}
        <Achievements />

        {/* 開発哲学: エンジニアとしての価値観や大切にしていること */}
        <Philosophy />
      </main>
    </div>
  );
}
