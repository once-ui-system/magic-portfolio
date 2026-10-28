import { baseURL, gallery, person, protectedRoutes, routes } from "@/resources";
import { getImageDimensions } from "@/utils/imageDimensions";

/** The gallery is public: switched on in `routes` and not behind a password. */
export const galleryIsPublic = () =>
  routes["/gallery"] === true && protectedRoutes["/gallery"] !== true;

const absolute = (src: string) => (/^https?:\/\//.test(src) ? src : `${baseURL}${src}`);

/** ImageGallery JSON-LD for /gallery: every photo with its size, creator, credit and copyright. */
export async function galleryStructuredData() {
  const dimensions = await getImageDimensions(gallery.images.map((image) => image.src));
  const notice = gallery.copyrightNotice ?? ((year: string) => `© ${year} ${person.name}`);
  const creator = { "@type": "Person", name: person.name, url: baseURL };

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${baseURL}${gallery.path}#gallery`,
    url: `${baseURL}${gallery.path}`,
    name: gallery.title,
    description: gallery.description,
    author: creator,
    image: gallery.images.map((image) => ({
      "@type": "ImageObject",
      contentUrl: absolute(image.src),
      url: absolute(image.src),
      name: image.title || image.alt,
      caption: image.alt,
      ...(dimensions[image.src] && {
        width: dimensions[image.src].width,
        height: dimensions[image.src].height,
      }),
      ...(image.year && { dateCreated: image.year }),
      creator,
      creditText: person.name,
      copyrightNotice: notice(image.year || String(new Date().getFullYear())),
    })),
  };
}

/** JSON for a <script> tag: `<` escaped, so text in the content can't close the tag. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
