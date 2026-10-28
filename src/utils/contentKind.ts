// Blog posts and projects share the reader features (read counts, likes) but keep separate
// counters, so a post and a project with the same slug never share a number.
export type ContentKind = "blog" | "work";

/** Store id for one item: posts use the bare slug, projects get a "work:" prefix. */
export const contentId = (kind: ContentKind, slug: string) =>
  kind === "work" ? `work:${slug}` : slug;

/** API path for an item's read count or likes. */
export const contentApi = (api: "views" | "likes", kind: ContentKind, slug: string) =>
  kind === "work" ? `/api/${api}/work/${slug}` : `/api/${api}/${slug}`;
