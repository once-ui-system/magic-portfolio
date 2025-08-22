import { Flex, Meta, Schema, Heading, Column } from "@once-ui-system/core";
import MasonryGrid from "@/components/gallery/GalleryView";
import { baseURL, gallery, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

export default function Gallery() {
  return (
    <Column maxWidth="l">
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
      <Heading marginBottom="xs" variant="display-strong-s">
        {gallery.title}
      </Heading>
      {gallery.subtitle && (
        <Heading marginBottom="l" variant="heading-default-xl" as="h2" onBackground="neutral-weak">
          {gallery.subtitle}
        </Heading>
      )}
      <MasonryGrid />
    </Column>
  );
}