import { ApiError, getPost } from "@/lib/api";
import { formatDate } from "@/lib/format";
import { OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    return renderOgImage({
      title: post.title,
      kicker: "enje.dev / Blog",
      meta: formatDate(post.published_at),
      tags: post.tags.map((t) => t.name),
    });
  } catch (error) {
    if (error instanceof ApiError && error.isNotFound) {
      return renderOgImage({
        title: "記事が見つかりません",
        kicker: "enje.dev / Blog",
      });
    }
    throw error;
  }
}
