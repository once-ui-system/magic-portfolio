import { baseURL, gallery, seo } from "@/resources";
import { galleryIsPublic } from "@/utils/gallerySeo";

// Built once with the site, like the RSS feed.
export const dynamic = "force-static";

const escapeXml = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const absolute = (src: string) => (/^https?:\/\//.test(src) ? src : `${baseURL}${src}`);

// The gallery page with each of its photos, for image search
export async function GET() {
  if (!seo.imageSitemap || !galleryIsPublic()) return new Response("Not found", { status: 404 });

  const images = gallery.images
    .map(
      (image) =>
        `    <image:image><image:loc>${escapeXml(absolute(image.src))}</image:loc></image:image>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${escapeXml(`${baseURL}${gallery.path}`)}</loc>
${images}
  </url>
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
