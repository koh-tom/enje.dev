import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/api";
import { SITE } from "@/lib/seo";

const staticRoutes = [
  "",
  "/blog",
  "/portfolio",
  "/gallery",
  "/about",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  // 記事は全ページ分をたどる
  let page = 1;
  let totalPages = 1;
  do {
    const { data, meta } = await getPosts({ page, per: 100 });
    totalPages = meta.total_pages;
    for (const post of data) {
      if (post.status !== "published") continue;
      entries.push({
        url: `${SITE.url}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    page += 1;
  } while (page <= totalPages);

  for (const project of await getProjects()) {
    if (project.status !== "published") continue;
    entries.push({
      url: `${SITE.url}/portfolio/${project.slug}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
