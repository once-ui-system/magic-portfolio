// Sitemap index for Next.js (app/sitemap.js)
export default function sitemap() {
  return [
    {
      url: '/sitemap-pages.xml',
      lastModified: new Date().toISOString(),
    },
    {
      url: '/blog/sitemap.xml',
      lastModified: new Date().toISOString(),
    },
  ];
}
