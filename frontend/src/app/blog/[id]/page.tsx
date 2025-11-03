import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { getPost, type Tag } from "@/lib/posts";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound(); // 404ページを表示
  }

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [post.image_url],
    "datePublished": post.published_at,
    "dateModified": post.published_at,
    "author": [{
      "@type": "Person",
      "name": "enje",
      "url": "https://enje.dev/about"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "enje.dev",
      "logo": {
        "@type": "ImageObject",
        "url": "https://enje.dev/favicon.ico"
      }
    },
    "description": post.content.slice(0, 150)
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://enje.dev"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://enje.dev/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://enje.dev/blog/${id}`
      }
    ]
  };

  return (
    <main className="container mx-auto px-4 py-12">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
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
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </main>
  );
}
