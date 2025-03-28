// External imports
import fs from "fs";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import path from "path";

/**
 * Represents a team member
 */
interface Team {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
}

/**
 * Metadata structure for MDX files
 */
interface Metadata {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string | string[];
  team: Team[];
  link?: string;
}

/**
 * Structure of a processed MDX file
 */
interface MDXData {
  metadata: Metadata;
  content: string;
}

/**
 * Structure of a fully processed MDX post
 */
interface Post {
  metadata: Metadata;
  slug: string;
  content: string;
}
/**
 * Retrieves all MDX files from a directory
 * 
 * @param dir - The directory path to search for MDX files
 * @returns An array of file names with .mdx extension
 * @throws Will trigger Next.js 404 page if directory doesn't exist
 */
function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/**
 * Reads and parses an MDX file
 * 
 * @param filePath - Path to the MDX file
 * @returns Object containing the metadata and content of the MDX file
 * @throws Will trigger Next.js 404 page if file doesn't exist
 */
function readMDXFile(filePath: string): MDXData {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    notFound();
  }

  try {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(rawContent);

    const metadata: Metadata = {
      title: data.title || "",
      publishedAt: data.publishedAt || new Date().toISOString(),
      summary: data.summary || "",
      image: data.image || "",
      images: data.images || [],
      tag: data.tag || [],
      team: Array.isArray(data.team) ? data.team : [],
      link: data.link || "",
    };

    return { metadata, content };
  } catch (error) {
    console.error(`Error reading MDX file ${filePath}:`, error);
    throw error;
  }
}

/**
 * Processes all MDX files in a directory
 * 
 * @param dir - Directory containing MDX files
 * @returns Array of processed MDX files with metadata, slug and content
 */
function getMDXData(dir: string): Post[] {
  try {
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
  } catch (error) {
    console.error(`Error processing MDX data from ${dir}:`, error);
    return [];
  }
}

/**
 * Gets all posts from a specified directory path
 * 
 * @param customPath - Array of path segments to join with process.cwd()
 * @returns Array of processed posts with metadata, slug and content
 */
export function getPosts(customPath: string[] = ["", "", "", ""]): Post[] {
  try {
    const postsDir = path.join(process.cwd(), ...customPath);
    return getMDXData(postsDir);
  } catch (error) {
    console.error("Error getting posts:", error);
    return [];
  }
}
