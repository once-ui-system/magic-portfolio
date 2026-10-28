import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  /** `draft: true` in front matter: only rendered by `next dev`, never built for production. */
  draft: boolean;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    // One topic per post; anything else (a list, a number) is ignored
    tag: typeof data.tag === "string" && data.tag.trim() ? data.tag.trim() : undefined,
    team: data.team || [],
    link: data.link || "",
    draft: data.draft === true,
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

/** Drafts can be previewed while running `next dev`; production builds never include them. */
export const showDrafts = process.env.NODE_ENV === "development";

/**
 * Posts or projects in a folder. Drafts are left out, so lists, the sitemap and
 * the RSS feed never show them. Pages pass `includeDrafts` to open a draft by
 * its URL, which only works in `next dev`.
 */
export function getPosts(customPath = ["", "", "", ""], { includeDrafts = false } = {}) {
  // Posts are read at build time. The ignore comment keeps Next from tracing
  // the whole project (images and video included) into every server function.
  const postsDir = path.join(/* turbopackIgnore: true */ process.cwd(), ...customPath);
  return getMDXData(postsDir).filter(
    (post) => !post.metadata.draft || (includeDrafts && showDrafts),
  );
}

/** Posts newest first, optionally cut to `range` (1-based, inclusive): [1, 3] is the newest three. */
export function getSortedPosts(customPath: string[], range?: [number, number?]) {
  const sorted = getPosts(customPath).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );
  return range ? sorted.slice(range[0] - 1, range[1] ?? sorted.length) : sorted;
}
