import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
// Project型を再利用
import type { Project } from "@/components/portfolio/ProjectCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  let project: Project | null = null;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/projects/${id}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const projectData = await res.json();
        // APIに画像がない場合、プレースホルダーを使用
        project = {
          ...projectData,
          image_url: projectData.image_url || "/images/placeholder-project.png",
        };
      }
    } catch (error) {
      console.error("API接続エラー", error);
    }
  } else {
    console.error("API URLが設定されていません。");
  }

  if (!project) {
    notFound(); // 404ページを表示
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft size={16} />
        Back to Portfolio
      </Link>

      <main>
        {/* プロジェクトヘッダー */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {project.name}
          </h1>
          <div className="flex flex-wrap gap-4 items-center">
            <Button asChild>
              <a
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo <ExternalLink className="ml-2" size={16} />
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a
                href={project.github_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2" size={16} />
                GitHub
              </a>
            </Button>
          </div>
        </section>

        {/* キービジュアル */}
        <section className="mb-12">
          <Image
            src={project.image_url}
            alt={`${project.name} screenshot`}
            width={1200}
            height={675}
            className="rounded-lg border object-cover w-full"
          />
        </section>

        {/* プロジェクト詳細 */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                About this project
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                Challenges & Solutions
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.challenges}
              </p>
            </section>
          </div>

          <aside>
            <section className="mb-8">
              <h3 className="text-xl font-bold mb-4">My Role</h3>
              <p className="text-muted-foreground">{project.myRole}</p>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.split(",").map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
