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
  /** Last meaningful edit (front matter `updatedAt`). Falls back to `publishedAt` where a date is needed. */
  updatedAt?: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
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
    updatedAt: data.updatedAt || undefined,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
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

export function getPosts(customPath = ["", "", "", ""]) {
  // Posts are read at build time. The ignore comment keeps Next from tracing
  // the whole project (images and video included) into every server function.
  const postsDir = path.join(/* turbopackIgnore: true */ process.cwd(), ...customPath);
  return getMDXData(postsDir);
}

/** Posts newest first, optionally cut to `range` (1-based, inclusive): [1, 3] is the newest three. */
export function getSortedPosts(customPath: string[], range?: [number, number?]) {
  const sorted = getPosts(customPath).sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );
  return range ? sorted.slice(range[0] - 1, range[1] ?? sorted.length) : sorted;
}

/** Words a reader actually reads: MDX imports, JSX tags and link targets don't count. */
export function countWords(content: string) {
  return content
    .replace(/^(import|export)\s.*$/gm, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\]\([^)]*\)/g, "]")
    .split(/\s+/)
    .filter((word) => /[\p{L}\p{N}]/u.test(word)).length;
}

/** Reading time in whole minutes at 200 words a minute, never less than one. */
export function readingTime(content: string) {
  return Math.max(1, Math.ceil(countWords(content) / 200));
}
