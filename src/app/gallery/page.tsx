import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person, seo } from "@/resources";
import { galleryIsPublic, galleryStructuredData, jsonLd } from "@/utils/gallerySeo";
import { getImageDimensions } from "@/utils/imageDimensions";
import { Flex, Meta, Schema } from "@once-ui-system/core";
import { notFound } from "next/navigation";
import { isRouteEnabled } from "@/utils/routes";
import { canonicalAlternates } from "@/utils/seo";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
    alternates: canonicalAlternates(gallery.path),
  });
}

export default async function Gallery() {
  if (!isRouteEnabled("/gallery")) notFound();

  const structuredData =
    seo.galleryStructuredData && galleryIsPublic() ? await galleryStructuredData() : null;
  // Read from the files at build time, so photos lay out and open at their real proportions
  const dimensions = await getImageDimensions(gallery.images.map((image) => image.src));

  return (
    <Flex maxWidth="l">
      {structuredData && (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD, escaped by jsonLd()
          dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
        />
      )}
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <GalleryView dimensions={dimensions} />
    </Flex>
  );
}
