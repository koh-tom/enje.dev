import { z } from "zod";

/**
 * Rails API の契約（docs/ARCHITECTURE.md）を zod で表す。
 * レスポンスは必ずこれで検証してから使う。
 */

export const tagSchema = z.object({
  slug: z.string(),
  name: z.string(),
  posts_count: z.number().int().nullish(),
});

export const postSummarySchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  reading_time: z.number().int(),
  cover_image: z.string().nullable(),
  status: z.enum(["draft", "published"]),
  published_at: z.string().nullable(),
  updated_at: z.string(),
  tags: z.array(tagSchema),
});

export const tocEntrySchema = z.object({
  id: z.string(),
  level: z.number().int(),
  text: z.string(),
});

const adjacentSchema = z
  .object({ slug: z.string(), title: z.string() })
  .nullable();

export const postSchema = postSummarySchema.extend({
  body_html: z.string(),
  toc: z.array(tocEntrySchema),
  previous_post: adjacentSchema,
  next_post: adjacentSchema,
});

export const projectSummarySchema = z.object({
  slug: z.string(),
  name: z.string(),
  summary: z.string(),
  period: z.string().nullable(),
  tech_stack: z.array(z.string()),
  links: z.object({
    github: z.string().nullable(),
    demo: z.string().nullable(),
  }),
  cover_image: z.string().nullable(),
  position: z.number().int(),
  status: z.enum(["draft", "published"]),
  updated_at: z.string(),
});

export const projectSchema = projectSummarySchema.extend({
  body_html: z.string(),
});

export const pageMetaSchema = z.object({
  page: z.number().int(),
  per: z.number().int(),
  total: z.number().int(),
  total_pages: z.number().int(),
});

export type Tag = z.infer<typeof tagSchema>;
export type PostSummary = z.infer<typeof postSummarySchema>;
export type Post = z.infer<typeof postSchema>;
export type TocEntry = z.infer<typeof tocEntrySchema>;
export type ProjectSummary = z.infer<typeof projectSummarySchema>;
export type Project = z.infer<typeof projectSchema>;
export type PageMeta = z.infer<typeof pageMetaSchema>;

export type Paginated<T> = { data: T[]; meta: PageMeta };
