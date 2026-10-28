import { baseURL, seo } from "@/resources";
import { galleryIsPublic } from "@/utils/gallerySeo";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: [
      `${baseURL}/sitemap.xml`,
      ...(seo.imageSitemap && galleryIsPublic() ? [`${baseURL}/sitemap-images.xml`] : []),
    ],
  };
}
