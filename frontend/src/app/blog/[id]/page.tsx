import { Badge } from "@/components/ui/badge";
import type { Post, Tag } from "@/components/blog/BlogPostCard"; // 型を再利用
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import remarkGfm from "remark-gfm";

type Props = {
  params: Promise<{ id: string }>;
};

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      next: { revalidate: 3600 }, // 1時間キャッシュ
    });

    if (!res.ok) return null;
    const postData = await res.json();
    return {
      ...postData,
      image_url: postData.image_url || "/images/placeholder-blog.png",
      reading_time:
        postData.reading_time || Math.ceil(postData.content.length / 1000),
    };
  } catch (error) {
    console.error("API接続エラー", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: "Post Not Found | My Portfolio",
    };
  }

  return {
    title: `${post.title} | My Portfolio & Blog`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160),
      images: [post.image_url],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound(); // 404ページを表示
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="text-sm text-muted-foreground">
              <span>
                Published on {new Date(post.published_at).toLocaleDateString()}
              </span>
              <span className="mx-2">•</span>
              <span>{post.reading_time} min read</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag: Tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </header>

          <div className="mb-8">
            <Image
              src={post.image_url}
              alt={`${post.title} header image`}
              width={1200}
              height={675}
              className="rounded-lg border object-cover w-full"
              priority // メイン記事画像の読み込みを優先
            />
          </div>

          {/* Markdownからの美しいタイポグラフィにproseを適用 */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
}
