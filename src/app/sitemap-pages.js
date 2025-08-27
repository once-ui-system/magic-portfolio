// Static pages sitemap for Next.js (app/sitemap-pages.js)
export default function sitemap() {
  return [
    { url: '/', lastModified: new Date().toISOString() },
    { url: '/about', lastModified: new Date().toISOString() },
    { url: '/blog', lastModified: new Date().toISOString() },
    { url: '/work', lastModified: new Date().toISOString() },
    { url: '/gallery', lastModified: new Date().toISOString() },
  ];
}
