import type { Post, Tag } from "@/components/blog/BlogPostCard"; // 型を再利用

export { Post, Tag }; // 他の場所からもインポートできるようにエクスポート

export async function getPost(id: string): Promise<Post | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URLが設定されていません。");
    return null;
  }

  try {
    const res = await fetch(`${apiUrl}/posts/${id}`, {
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
