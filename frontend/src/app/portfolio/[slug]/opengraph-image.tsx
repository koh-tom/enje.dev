import { ApiError, getProject } from "@/lib/api";
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
    const project = await getProject(slug);
    return renderOgImage({
      title: project.name,
      kicker: "enje.dev / Works",
      meta: project.period ?? undefined,
      tags: project.tech_stack,
    });
  } catch (error) {
    if (error instanceof ApiError && error.isNotFound) {
      return renderOgImage({
        title: "制作物が見つかりません",
        kicker: "enje.dev / Works",
      });
    }
    throw error;
  }
}
