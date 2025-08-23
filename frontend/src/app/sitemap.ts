import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // 基本的なページ
  const routes = [
    "",
    "/blog",
    "/portfolio",
    "/about",
    "/contact",
    "/gallery",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // ブログ記事の動的取得 (エラー時は空配列)
  let postRoutes: any[] = [];
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl}/posts`);
      if (res.ok) {
        const posts = await res.json();
        postRoutes = posts.map((post: any) => ({
          url: `${baseUrl}/blog/${post.id}`,
          lastModified: new Date(post.updated_at || post.published_at),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
      }
    } catch (e) {
      console.error("Sitemap post fetch error", e);
    }
  }

  return [...routes, ...postRoutes];
}
