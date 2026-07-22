import { z } from "zod";
import {
  type Paginated,
  type Post,
  type PostSummary,
  pageMetaSchema,
  postSchema,
  postSummarySchema,
} from "@/types/content";
import { apiGet, CACHE_TAGS } from "./client";

const listSchema = z.object({
  data: z.array(postSummarySchema),
  meta: pageMetaSchema,
});
const detailSchema = z.object({ data: postSchema });

export type PostListParams = { tag?: string; page?: number; per?: number };

export async function getPosts(
  params: PostListParams = {},
): Promise<Paginated<PostSummary>> {
  return apiGet("/posts", listSchema, {
    tags: [CACHE_TAGS.posts],
    searchParams: { tag: params.tag, page: params.page, per: params.per },
  });
}

export async function getPost(slug: string): Promise<Post> {
  const { data } = await apiGet(
    `/posts/${encodeURIComponent(slug)}`,
    detailSchema,
    {
      tags: [CACHE_TAGS.posts],
    },
  );
  return data;
}
