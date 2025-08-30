import { About } from "@/components/home/About";
import { BlogPreview } from "@/components/home/BlogPreview";
import { Hero } from "@/components/home/Hero";
import { Skills } from "@/components/home/Skills";
import { Timeline } from "@/components/home/Timeline";
import { WorksPreview } from "@/components/home/WorksPreview";

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
