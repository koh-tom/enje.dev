import { ProfileHero } from "@/components/about/ProfileHero";
import { BentoGrid } from "@/components/about/BentoGrid";
import { Philosophy } from "@/components/about/Philosophy";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow">
        {/* プロフィールヒーロー: 写真と簡単な自己紹介 */}
        <ProfileHero />

        {/* Bento Grid: スキルや趣味、SNSなどをタイル状に配置 */}
        <BentoGrid />

        {/* 開発哲学: エンジニアとしての価値観や大切にしていること */}
        <Philosophy />
      </main>
    </div>
  );
}
