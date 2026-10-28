import { blog, routes, work } from "@/resources";
import { getSortedPosts } from "@/utils/utils";

/** One post or project in the command palette. Built on the server, sent to the header. */
export type SearchEntry = {
  id: string;
  kind: "post" | "project";
  title: string;
  href: string;
  /** Words the palette also matches on: subtitle, summary and tag. */
  keywords: string;
  publishedAt: string;
};

const keywordsOf = (metadata: { subtitle?: string; summary: string; tag?: string }) =>
  [metadata.subtitle, metadata.summary, typeof metadata.tag === "string" ? metadata.tag : ""]
    .filter(Boolean)
    .join(" ");

/**
 * Posts and projects, newest first, from front matter only (never the body), so what the header
 * sends to the browser stays small. Sections whose route is off are left out.
 */
export function buildSearchIndex(): SearchEntry[] {
  const posts: SearchEntry[] = routes["/blog"]
    ? getSortedPosts(["src", "app", "blog", "posts"]).map((post) => ({
        id: `post:${post.slug}`,
        kind: "post",
        title: post.metadata.title,
        href: `${blog.path}/${post.slug}`,
        keywords: keywordsOf(post.metadata),
        publishedAt: post.metadata.publishedAt,
      }))
    : [];

  const projects: SearchEntry[] = routes["/work"]
    ? getSortedPosts(["src", "app", "work", "projects"]).map((project) => ({
        id: `project:${project.slug}`,
        kind: "project",
        title: project.metadata.title,
        href: `${work.path}/${project.slug}`,
        keywords: keywordsOf(project.metadata),
        publishedAt: project.metadata.publishedAt,
      }))
    : [];

  return [...posts, ...projects];
}
