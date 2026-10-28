import type { MetadataRoute } from "next";
import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";
import { isRouteEnabled } from "@/utils/routes";

type Entry = ReturnType<typeof getPosts>[number];

// A page last changed when its content did: `updatedAt` if set, else `publishedAt`
const modified = (entry: Entry) => entry.metadata.updatedAt || entry.metadata.publishedAt;

const newest = (dates: string[]) =>
  dates.length
    ? dates.reduce((latest, date) => (new Date(date) > new Date(latest) ? date : latest))
    : undefined;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Posts and projects of a switched-off section return 404, so they stay out.
  const posts = isRouteEnabled("/blog") ? getPosts(["src", "app", "blog", "posts"]) : [];
  const projects = isRouteEnabled("/work") ? getPosts(["src", "app", "work", "projects"]) : [];

  const blogs = posts.map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: modified(post),
  }));

  const works = projects.map((project) => ({
    url: `${baseURL}/work/${project.slug}`,
    lastModified: modified(project),
  }));

  // Index pages change when what they list does. Pages without dated content
  // (about, gallery) get no date rather than the build date.
  const sectionDates: Record<string, string | undefined> = {
    "/": newest([...posts, ...projects].map(modified)),
    "/blog": newest(posts.map(modified)),
    "/work": newest(projects.map(modified)),
  };

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => {
    const lastModified = sectionDates[route];
    return {
      url: `${baseURL}${route !== "/" ? route : ""}`,
      ...(lastModified ? { lastModified } : {}),
    };
  });

  return [...routes, ...blogs, ...works];
}
