import { baseURL, seo } from "@/resources";
import { aiSearchBots, aiTrainingBots } from "@/resources/aiCrawlers";
import type { MetadataRoute } from "next";

// API routes aren't pages, except the RSS feed and the social images
const allow = ["/", "/api/rss", "/api/og/"];
const disallow = ["/api/"];

type Rule = Extract<MetadataRoute.Robots["rules"], unknown[]>[number];

export default function robots(): MetadataRoute.Robots {
  const { search, training, searchBots, trainingBots } = seo.aiCrawlers;

  // A bot named in a group follows only that group, so allowed AI bots repeat the rules.
  // An empty list adds no group.
  const aiGroup = (userAgent: string[], allowed: boolean): Rule[] => {
    if (userAgent.length === 0) return [];
    return [allowed ? { userAgent, allow, disallow } : { userAgent, disallow: "/" }];
  };

  return {
    rules: [
      { userAgent: "*", allow, disallow },
      ...aiGroup(searchBots ?? aiSearchBots, search),
      ...aiGroup(trainingBots ?? aiTrainingBots, training),
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
