import { ProjectCard, type Project } from "@/components/portfolio/ProjectCard";

// サーバーサイドでプロジェクト一覧を取得
// ISR (revalidate: 60) を設定して、高速表示とデータ鮮度を両立
async function getProjects(): Promise<Project[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error(
      "API URLが設定されていません。フォールバックデータを使用します。",
    );
    return fallbackProjects;
  }

  try {
    const res = await fetch(`${apiUrl}/projects`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    // APIに画像がない場合、プレースホルダーを使用
    return data.map((p: Project) => ({
      ...p,
      image_url: p.image_url || "/images/placeholder-project.png",
    }));
  } catch (error) {
    console.error("API接続エラー、フォールバックデータを使用", error);
    return fallbackProjects;
  }
}

// APIが利用できない場合のフォールバックデータ
const fallbackProjects: Project[] = [
  {
    id: 1,
    name: "Project Alpha",
    description:
      "A web application for managing tasks and collaborating with teams.",
    image_url: "/images/placeholder-project.png",
    tech_stack: "Built with Next.js, TypeScript, Ruby on Rails",
    github_link: "#",
    demo_link: "#",
  },
  {
    id: 2,
    name: "Project Beta",
    description:
      "An e-commerce platform with a focus on user experience and performance.",
    image_url: "/images/placeholder-project.png",
    tech_stack: "React,Node.js,PostgreSQL",
    github_link: "#",
    demo_link: "#",
  },
  {
    id: 3,
    name: "Project Gamma",
    description: "A mobile app for tracking fitness goals and daily activity.",
    image_url: "/images/placeholder-project.png",
    tech_stack: "React Native,Firebase,GraphQL",
    github_link: "#",
    demo_link: "#",
  },
];

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Portfolio / 制作実績
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          これまでに制作したプロジェクトを紹介します。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
