import { baseURL, home } from "@/resources";
import { absoluteUrl, ids, publisherId } from "@/utils/seo";
import { JsonLd } from "./JsonLd";

type Crumb = { name: string; path: string };

type ArticleSchemaProps = {
  /** "BlogPosting" for posts, "CreativeWork" for projects. */
  as?: "BlogPosting" | "CreativeWork";
  path: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  /** The post's tag, used as `articleSection`. */
  section?: string;
  wordCount?: number;
  /** Trail after Home, e.g. Blog → this post. */
  breadcrumbs: Crumb[];
};

/**
 * Structured data for a post or project: the article and its breadcrumb trail
 * in one `@graph`, linked to the site's person and website by `@id` (see SiteSchema).
 */
export function ArticleSchema({
  as = "BlogPosting",
  path,
  title,
  description,
  datePublished,
  dateModified,
  image,
  section,
  wordCount,
  breadcrumbs,
}: ArticleSchemaProps) {
  const url = absoluteUrl(path);
  const crumbs = [{ name: home.label, path: "/" }, ...breadcrumbs];

  return (
    <JsonLd
      id={`schema-article-${path}`}
      data={{
        "@graph": [
          {
            "@type": as,
            "@id": `${url}#article`,
            url,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": url,
              breadcrumb: { "@id": `${url}#breadcrumb` },
            },
            isPartOf: { "@id": ids.website },
            headline: title,
            name: title,
            description,
            datePublished,
            dateModified: dateModified || datePublished,
            ...(image ? { image: [absoluteUrl(image)] } : {}),
            ...(section ? { articleSection: section, keywords: section } : {}),
            ...(wordCount ? { wordCount } : {}),
            author: { "@id": ids.person },
            publisher: { "@id": publisherId },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: crumbs.map((crumb, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: crumb.name,
              item: crumb.path === "/" ? baseURL : absoluteUrl(crumb.path),
            })),
          },
        ],
      }}
    />
  );
}
