import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";
import { isRouteEnabled } from "@/utils/routes";

export default async function sitemap() {
  // Posts and projects of a switched-off section return 404, so they stay out.
  const blogPosts = isRouteEnabled("/blog") ? getPosts(["src", "app", "blog", "posts"]) : [];
  const blogs = blogPosts.map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const projects = isRouteEnabled("/work") ? getPosts(["src", "app", "work", "projects"]) : [];
  const works = projects.map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...works];
}
