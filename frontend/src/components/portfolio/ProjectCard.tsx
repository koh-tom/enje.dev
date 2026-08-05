import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { ProjectSummary } from "@/types/content";

type ProjectCardProps = { project: ProjectSummary; headingLevel?: "h2" | "h3" };

export function ProjectCard({
  project,
  headingLevel: Heading = "h3",
}: ProjectCardProps) {
  return (
    <article className="frame flex h-full flex-col gap-2 p-5 hover:-rotate-[0.3deg]">
      <div className="flex items-baseline justify-between gap-2 text-sm text-ink-soft">
        <span className="font-display text-lg">
          No. {String(project.position).padStart(2, "0")}
        </span>
        {project.period && <span>{project.period}</span>}
      </div>
      <Heading className="text-h3">
        <Link
          href={`/portfolio/${project.slug}`}
          className="no-underline hover:underline-wavy"
        >
          {project.name}
        </Link>
      </Heading>
      {project.summary && (
        <p className="flex-1 text-ink-soft">{project.summary}</p>
      )}
      {project.tech_stack.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {project.tech_stack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
