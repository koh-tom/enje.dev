import { getPost } from "@/lib/posts";
import { Header } from "@/components/layout/Header";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next"; // Metadataの型をインポート

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

// サーバーコンポーネントとしてMetadataを生成
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

export default async function BlogIdLayout({ params, children }: Props) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header title={post.title} />
      <main className="flex-grow">
        {children}
      </main>
    </>
  );
}
