import type { Metadata } from "next";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getProjects } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 3600;

const description =
  "enjeの制作実績・プロジェクト一覧です。Next.jsやRuby on Railsを用いたモダンなWebアプリケーション開発から、FPGA/電子工作プロジェクトまで、幅広く手掛けた作品を掲載しています。";

export const metadata: Metadata = buildMetadata({
  title: "Works",
  description,
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-8">
      <SectionTitle as="h1" sub="Works">
        制作物
      </SectionTitle>
      {projects.length === 0 ? (
        <EmptyState title="まだ制作物がありません" description="準備中です。" />
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} headingLevel="h2" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
