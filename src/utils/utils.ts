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
  tags?: string[];
  team: Team[];
  link?: string;
  draft?: boolean;
};

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  // Improved extraction logic
  let extractedImage = "";
  if (!data.image) {
    // 1. Look for standard markdown image: ![alt](url)
    const mdImageMatch = content.match(/!\[.*?\]\((.*?)\)/);
    if (mdImageMatch) {
      extractedImage = mdImageMatch[1];
    } 
    // 2. Look for <Media src="..." /> component
    else {
      const mediaMatch = content.match(/<Media\s+[^>]*src=["'](.*?)["']/);
      if (mediaMatch) {
        extractedImage = mediaMatch[1];
      }
      // 3. Look for HTML <img> tag
      else {
        const imgMatch = content.match(/<img\s+[^>]*src=["'](.*?)["']/);
        if (imgMatch) {
          extractedImage = imgMatch[1];
        }
      }
    }
  }

  // Ensure tags is always an array
  let tags: string[] = [];
  if (Array.isArray(data.tags)) {
    tags = data.tags;
  } else if (data.tags) {
    tags = [data.tags];
  } else if (data.tag) {
    tags = Array.isArray(data.tag) ? data.tag : [data.tag];
  }

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt || "",
    summary: data.summary || "",
    image: data.image || extractedImage || "",
    images: data.images || [],
    tag: tags[0] || "",
    tags: tags,
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
  }).filter(post => {
    if (process.env.NODE_ENV === "production" && post.metadata.draft) {
      return false;
    }
    return true;
  });
}

export function getPosts(customPath = ["", "", "", ""], locale = "en") {
  const postsDir = path.join(process.cwd(), ...customPath, locale);
  return getMDXData(postsDir);
}
