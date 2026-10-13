import { PostCard } from "@/components/blog/PostCard";
import { QiitaCard } from "@/components/blog/QiitaCard";
import { Intro } from "@/components/home/Intro";
import { SkillsTable } from "@/components/home/SkillsTable";
import { Timeline } from "@/components/home/Timeline";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Icon } from "@/components/ui/Icon";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getPosts, getProjects } from "@/lib/api";
import { getQiitaItems, mergeRecent } from "@/lib/qiita";
import { qiita } from "@/lib/site";

export const revalidate = 3600;

export default async function HomePage() {
  const [{ data: posts }, projects, qiitaItems] = await Promise.all([
    getPosts({ per: 3 }),
    getProjects(),
    // Qiita は外部サービス。落ちていてもトップは出し、このサイトの記事だけ並べる
    getQiitaItems(3).catch((error) => {
      console.error(error);
      return [];
    }),
  ]);
  const recent = mergeRecent(posts, qiitaItems, 3);
  const featured = projects.slice(0, 3);

  return (
    <div className="flex flex-col gap-20">
      <Intro />

      <section aria-labelledby="posts-heading">
        <SectionTitle sub="Recent posts">
          <span id="posts-heading">最近の記事</span>
        </SectionTitle>
        {recent.length === 0 ? (
          <EmptyState
            title="まだ記事がありません"
            description="最初の記事を準備中です。"
          />
        ) : (
          <ul className="flex flex-col gap-5">
            {recent.map((entry) =>
              entry.kind === "post" ? (
                <li key={`post-${entry.post.slug}`}>
                  <PostCard post={entry.post} />
                </li>
              ) : (
                <li key={`qiita-${entry.item.id}`}>
                  <QiitaCard item={entry.item} />
                </li>
              ),
            )}
          </ul>
        )}
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <ButtonLink
            href={qiita.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Qiita の記事 <Icon name="external" size={16} />
          </ButtonLink>
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
