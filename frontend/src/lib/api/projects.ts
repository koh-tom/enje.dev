import { z } from "zod";
import {
  type Project,
  type ProjectSummary,
  projectSchema,
  projectSummarySchema,
} from "@/types/content";
import { apiGet, CACHE_TAGS } from "./client";

const listSchema = z.object({ data: z.array(projectSummarySchema) });
const detailSchema = z.object({ data: projectSchema });

export async function getProjects(): Promise<ProjectSummary[]> {
  const { data } = await apiGet("/projects", listSchema, {
    tags: [CACHE_TAGS.projects],
  });
  return data;
}

export async function getProject(slug: string): Promise<Project> {
  const { data } = await apiGet(
    `/projects/${encodeURIComponent(slug)}`,
    detailSchema,
    {
      tags: [CACHE_TAGS.projects],
    },
  );
  return data;
}
