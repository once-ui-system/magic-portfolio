import { baseURL, person, schema } from "@/resources";
import { Meta } from "@once-ui-system/core";
import type { Metadata } from "next";

/**
 * Stable `@id`s for the site's structured data. Every page points at the same
 * website, person and organization instead of repeating them.
 */
export const ids = {
  website: `${baseURL}/#website`,
  person: `${baseURL}/#person`,
  organization: `${baseURL}/#organization`,
};

/** Who publishes the site: the person, or an organization when `schema.type` is "Organization". */
export const publisherId = schema.type === "Organization" ? ids.organization : ids.person;

/** `/blog/post` becomes `https://site/blog/post`; absolute URLs pass through. */
export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${baseURL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Canonical URL of a page, in the shape `Meta.generate({ alternates })` expects. */
export function canonicalAlternates(path: string) {
  return [{ href: absoluteUrl(path), hrefLang: person.locale ?? "en" }];
}

type ArticleMetadataProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
  tag?: string;
  /** Keep the page out of search results, e.g. a draft. */
  noindex?: boolean;
  nofollow?: boolean;
};

/**
 * `Meta.generate` for a post or project, plus what an article needs on top:
 * a canonical URL, `article:modified_time`, the author and the tag.
 */
export function articleMetadata({
  title,
  description,
  path,
  image,
  publishedAt,
  updatedAt,
  tag,
  noindex,
  nofollow,
}: ArticleMetadataProps): Metadata {
  const meta = Meta.generate({
    title,
    description,
    baseURL,
    path,
    type: "article",
    image: image || `/api/og/generate?title=${encodeURIComponent(title)}`,
    publishedTime: publishedAt,
    author: { name: person.name, url: baseURL },
    alternates: canonicalAlternates(path),
    noindex,
    nofollow,
  });

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      modifiedTime: updatedAt || publishedAt,
      authors: [person.name],
      ...(tag ? { tags: [tag] } : {}),
    },
  };
}
