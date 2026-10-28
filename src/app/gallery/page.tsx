import GalleryView from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/resources";
import { getImageDimensions } from "@/utils/imageDimensions";
import { Flex, Meta, Schema } from "@once-ui-system/core";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

export default async function Gallery() {
  // Read from the files at build time, so photos lay out and open at their real proportions
  const dimensions = await getImageDimensions(gallery.images.map((image) => image.src));

  return (
    <Flex maxWidth="l">
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
