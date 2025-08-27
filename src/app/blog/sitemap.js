// Blog posts sitemap for Next.js (app/blog/sitemap.js)
import fs from 'fs';
import path from 'path';

export default function sitemap() {
  const BLOG_DIR = path.join(process.cwd(), 'src/app/blog/posts');
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'));
  return files.map(filename => {
    const slug = filename.replace(/\.mdx$/, '');
    return {
      url: `/blog/${slug}`,
      lastModified: new Date().toISOString(),
    };
  });
}
