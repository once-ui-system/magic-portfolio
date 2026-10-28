import { getPosts, getSortedPosts } from "@/utils/utils";

const PROJECTS_DIR = ["src", "app", "work", "projects"];
const POSTS_DIR = ["src", "app", "blog", "posts"];

const VIDEO = /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i;

/** First still image of a project, for small thumbnails (videos are skipped). */
export function getProjectCover(images: string[]) {
  return images.find((src) => !VIDEO.test(src));
}

/** The projects before and after this one, in the same newest-first order as /work. */
export function getProjectNeighbours(slug: string) {
  const projects = getSortedPosts(PROJECTS_DIR);
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return { previous: projects[index - 1], next: projects[index + 1] };
}

/**
 * Posts a project lists under `related`, in the order written. Unknown slugs are skipped.
 * Only slug and metadata are returned: the post card is a client component and needs no body.
 */
export function getRelatedPosts(slugs: string[]) {
  if (slugs.length === 0) return [];
  const posts = getPosts(POSTS_DIR);
  return [...new Set(slugs)].flatMap((slug) => {
    const post = posts.find((item) => item.slug === slug);
    return post ? [{ slug: post.slug, metadata: post.metadata }] : [];
  });
}

/** Projects that list this post under `related`, newest first. */
export function getProjectsForPost(slug: string) {
  return getSortedPosts(PROJECTS_DIR).filter((project) => project.metadata.related.includes(slug));
}
