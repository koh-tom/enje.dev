import { BlogPostCard, type Post } from "@/components/blog/BlogPostCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// サーバーサイドで最新のブログ投稿を取得
async function getLatestPosts(): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return [];

  try {
    // APIから最新3件を取得
    const res = await fetch(
      `${apiUrl}/posts?_sort=id&_order=desc&_limit=3`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return []; // エラー時は空配列
    const posts = await res.json();
    return posts.map((p: Post) => ({
      ...p,
      image_url: p.image_url || "/images/placeholder-blog.png",
      reading_time: p.reading_time || Math.ceil(p.content.length / 1000),
    }));
  } catch (error) {
    console.error("Failed to fetch latest posts:", error);
    return []; // エラー時は空配列
  }
}

export async function BlogPreview() {
  const latestPosts = await getLatestPosts();

  return (
    <section id="blog-preview" className="py-20 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">From the Blog</h2>
          <Button asChild variant="outline">
            <Link href="/blog">Read all posts</Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
