import {
  type Post,
  type Tag,
} from "@/components/blog/BlogPostCard";
import { BlogList } from "@/components/blog/BlogList";

// サーバーサイドでブログ記事データを取得
async function getPosts(): Promise<Post[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error(
      "API URLが設定されていません。フォールバックデータを使用します。",
    );
    return fallbackPosts;
  }

  try {
    const res = await fetch(`${apiUrl}/posts`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error("記事取得失敗、フォールバックデータを使用");
      return fallbackPosts;
    }
    const posts = await res.json();
    // APIに新しいフィールドがない場合、プレースホルダーを追加
    return posts.map((p: Post) => ({
      ...p,
      image_url: p.image_url || "/images/placeholder-blog.png",
      reading_time: p.reading_time || Math.ceil(p.content.length / 1000),
    }));
  } catch (_error) {
    console.error("API接続エラー、フォールバックデータを使用", _error);
    return fallbackPosts;
  }
}

// フィルターUI用に全タグを取得
async function getTags(): Promise<Tag[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return [];

  try {
    const res = await fetch(`${apiUrl}/tags`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch (_error) {
    return [];
  }
}

// APIが利用できない場合のフォールバックデータ
const fallbackPosts: Post[] = [
  {
    id: 1,
    title: "My First Blog Post",
    content:
      "This is the content of my first blog post. It talks about Ruby and Rails.",
    published_at: new Date().toISOString(),
    tags: [
      { id: 1, name: "Ruby" },
      { id: 2, name: "Rails" },
    ],
    image_url: "/images/placeholder-blog.png",
    reading_time: 5,
  },
  {
    id: 2,
    title: "Building a Portfolio with Next.js",
    content:
      "This post details the process of building a modern portfolio site using Next.js, React, and TypeScript.",
    published_at: new Date().toISOString(),
    tags: [
      { id: 3, name: "Next.js" },
      { id: 4, name: "React" },
    ],
    image_url: "/images/placeholder-blog.png",
    reading_time: 8,
  },
];

export default async function BlogPage() {
  const posts = await getPosts();
  const tags = await getTags();

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Blog / ブログ</h1>
        <p className="text-lg text-muted-foreground mt-2">
          技術や開発、日常についての思考を綴っています。
        </p>
      </header>

      <BlogList initialPosts={posts} tags={tags} />
    </div>
  );
}
