import { posts, BlogPostMeta } from '../../blog/posts/manifest';

const siteUrl = 'https://teds.one';

export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>TEDS Blog</title>
      <link>${siteUrl}/blog</link>
      <description>Latest blog posts from TEDS</description>
      ${posts.map((post: BlogPostMeta) => `
        <item>
          <title>${post.title}</title>
          <link>${siteUrl}/blog/${post.slug}</link>
          <pubDate>${post.date}</pubDate>
          <description>${post.summary || ''}</description>
          ${post.image ? `<enclosure url=\"${post.image}\" type=\"image/jpeg\" />` : ''}
        </item>
      `).join('')}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/rss+xml' }
  });
}
