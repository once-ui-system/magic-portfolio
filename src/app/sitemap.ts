import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  const locales = ["en", "pt-BR"];
  const blogs = locales.flatMap((locale) => 
    getPosts(["src", "app", "blog", "posts"], locale).map((post) => ({
      url: `${baseURL}/${locale}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }))
  );

  const works = locales.flatMap((locale) => 
    getPosts(["src", "app", "work", "projects"], locale).map((post) => ({
      url: `${baseURL}/${locale}/work/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }))
  );

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = locales.flatMap((locale) => 
    activeRoutes.map((route) => ({
      url: `${baseURL}/${locale}${route !== "/" ? route : ""}`,
      lastModified: new Date().toISOString().split("T")[0],
    }))
  );

  return [...routes, ...blogs, ...works];
}
