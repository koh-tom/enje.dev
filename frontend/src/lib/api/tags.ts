import { z } from "zod";
import { type Tag, tagSchema } from "@/types/content";
import { apiGet, CACHE_TAGS } from "./client";

const listSchema = z.object({ data: z.array(tagSchema) });

export async function getTags(): Promise<Tag[]> {
  const { data } = await apiGet("/tags", listSchema, {
    tags: [CACHE_TAGS.tags, CACHE_TAGS.posts],
  });
  return data;
}
