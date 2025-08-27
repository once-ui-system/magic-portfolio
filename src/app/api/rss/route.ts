import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const runtime = 'edge'

const BLOG_DIR = path.join(process.cwd(), 'src/app/blog/posts');

function getAllPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  return files.map(filename => {
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    return {
      ...data,
      slug: filename.replace(/\.mdx$/, ''),
    };
  });
}

function generateRss(posts: any[]) {
  const siteUrl = 'https://teds.one';
  return `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>TEDS Blog</title>
      <link>${siteUrl}/blog</link>
      <description>Latest blog posts from TEDS</description>
      ${posts
        .map(
          post => {
            const imageUrl = post.image
              ? `${siteUrl}${post.image}`
              : `${siteUrl}/api/og/generate?title=${encodeURIComponent(post.title || post.slug)}`;
            return `<item>
              <title>${post.title || post.slug}</title>
              <link>${siteUrl}/blog/${post.slug}</link>
              <pubDate>${post.date || new Date().toUTCString()}</pubDate>
              <description>${post.summary || post.description || ''}</description>
              <enclosure url=\"${imageUrl}\" type=\"image/jpeg\" />
            </item>`;
          }
        )
        .join('')}
    </channel>
  </rss>`;
}

export async function GET() {
  const posts = getAllPosts();
  const rss = generateRss(posts);
  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}
