import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { JsonLd } from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Tag";
import { ApiError, getProject } from "@/lib/api";
import { buildMetadata, jsonLd } from "@/lib/seo";
import type { Project } from "@/types/content";

export const revalidate = 3600;

type Params = Promise<{ slug: string }>;

async function loadProject(slug: string): Promise<Project> {
  try {
    return await getProject(slug);
  } catch (error) {
    if (error instanceof ApiError && error.isNotFound) notFound();
    throw error;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadProject(slug);
  return buildMetadata({
    title: project.name,
    description: project.summary || `${project.name} の詳細`,
    path: `/portfolio/${project.slug}`,
    noIndex: project.status === "draft",
  });
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await loadProject(slug);
  const links = [
    { label: "GitHub", href: project.links.github, icon: "github" as const },
    { label: "Demo", href: project.links.demo, icon: "external" as const },
  ].filter(
    (
      link,
    ): link is { label: string; href: string; icon: "github" | "external" } =>
      Boolean(link.href),
  );

  return (
    <article className="flex flex-col gap-8">
      <JsonLd
        data={jsonLd.breadcrumb([
          { name: "Home", path: "" },
          { name: "Works", path: "/portfolio" },
          { name: project.name, path: `/portfolio/${project.slug}` },
        ])}
      />

      <Link
        href="/portfolio"
        className="inline-flex items-center gap-1 self-start text-sm no-underline hover:underline-wavy"
      >
        <Icon name="arrowLeft" size={16} /> 制作物一覧
      </Link>

      <header className="flex flex-col gap-3 border-b-2 border-ink pb-6">
        <p className="font-display text-2xl text-ink-soft">
          No. {String(project.position).padStart(2, "0")}
        </p>
        <h1 className="text-h1">{project.name}</h1>
        {project.summary && <p className="text-lg">{project.summary}</p>}
        <dl className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
          {project.period && (
            <>
              <dt className="text-ink-soft">期間</dt>
              <dd>{project.period}</dd>
            </>
          )}
          {project.tech_stack.length > 0 && (
            <>
              <dt className="text-ink-soft">技術</dt>
              <dd>
                <ul className="flex flex-wrap gap-1.5">
                  {project.tech_stack.map((tech) => (
                    <li key={tech}>
                      <Tag>{tech}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </>
          )}
        </dl>
        {links.length > 0 && (
          <ul className="flex flex-wrap gap-3">
            {links.map((link) => (
              <li key={link.label}>
                <ButtonLink
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={link.icon} size={16} /> {link.label}
                </ButtonLink>
              </li>
            ))}
          </ul>
        )}
      </header>

      {project.cover_image && (
        <Image
          src={project.cover_image}
          alt=""
          width={1200}
          height={630}
          priority
          className="frame h-auto w-full p-0"
        />
      )}

      {project.body_html ? (
        <ArticleBody html={project.body_html} />
      ) : (
        <p className="text-ink-soft">詳細は準備中です。</p>
      )}
    </article>
  );
}
