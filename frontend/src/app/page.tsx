import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Timeline } from "@/components/home/Timeline";
import { WorksPreview } from "@/components/home/WorksPreview";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Skills } from "@/components/home/Skills";

/*
 * ホーム画面
 * 各セクションを組み合わせたページ
 */

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex-grow">
        <Hero />
        <About />
        <Timeline />
        <WorksPreview />
        <BlogPreview />
        <Skills />
      </main>
    </div>
  );
}
