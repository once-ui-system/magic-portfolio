import { getPosts } from "@/app/utils/utils";
import { baseURL, routes as routesConfig } from "@/app/resources";

export default async function sitemap() {
  const agileResources = getPosts(["src", "app", "agile", "resources"]).map((resource) => ({
    url: `${baseURL}/agile/${resource.slug}`,
    lastModified: resource.metadata.publishedAt,
  }));

  const works = getPosts(["src", "app", "work", "projects"]).map((project) => ({
    url: `${baseURL}/work/${project.slug}`,
    lastModified: project.metadata.publishedAt,
  }));

  const skills = getPosts(["src", "app", "skill", "skills"]).map((skill) => ({
    url: `${baseURL}/skills/${skill.slug}`,
    lastModified: skill.metadata.publishedAt,
  }));

  const activeRoutes = Object.keys(routesConfig).filter((route) => routesConfig[route]);

  const routes = activeRoutes.map((route) => ({
    url: `${baseURL}${route !== "/" ? route : ""}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...agileResources, ...works];
}
