import { PostCard } from "@/components/blog/PostCard";
import { Intro } from "@/components/home/Intro";
import { SkillsTable } from "@/components/home/SkillsTable";
import { Timeline } from "@/components/home/Timeline";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getPosts, getProjects } from "@/lib/api";

export const revalidate = 3600;

export default async function HomePage() {
  const [{ data: posts }, projects] = await Promise.all([
    getPosts({ per: 3 }),
    getProjects(),
  ]);
  const featured = projects.slice(0, 3);

  return (
    <div className="flex flex-col gap-20">
      <Intro />

      <section aria-labelledby="posts-heading">
        <SectionTitle sub="Recent posts">
          <span id="posts-heading">最近の記事</span>
        </SectionTitle>
        {posts.length === 0 ? (
          <EmptyState
            title="まだ記事がありません"
            description="最初の記事を準備中です。"
          />
        ) : (
          <ul className="flex flex-col gap-5">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 text-right">
          <ButtonLink href="/blog">記事一覧へ →</ButtonLink>
        </div>
      </section>

      <section aria-labelledby="works-heading">
        <SectionTitle sub="Works">
          <span id="works-heading">制作物</span>
        </SectionTitle>
        {featured.length === 0 ? (
          <EmptyState title="まだ制作物がありません" />
        ) : (
          <ul className="grid gap-5 md:grid-cols-3">
            {featured.map((project) => (
              <li key={project.slug}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 text-right">
          <ButtonLink href="/portfolio">制作物一覧へ →</ButtonLink>
        </div>
      </section>

      <section aria-labelledby="skills-heading">
        <SectionTitle sub="Skills">
          <span id="skills-heading">技術スタック</span>
        </SectionTitle>
        <SkillsTable />
      </section>

      <section aria-labelledby="timeline-heading">
        <SectionTitle sub="Timeline">
          <span id="timeline-heading">これまでの歩み</span>
        </SectionTitle>
        <Timeline />
      </section>
    </div>
  );
}
