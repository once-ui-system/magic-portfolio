import { gallery, home } from "@/resources";
import { galleryIsPublic } from "@/utils/gallerySeo";
import { getImageDimensions } from "@/utils/imageDimensions";
import { Column, Media, Row, Scroller } from "@once-ui-system/core";
import { SectionHeader } from "./SectionHeader";

// Every photo in the strip is this tall; its width follows its proportions
const HEIGHT_REM = 13.5;
const HEIGHT_REM_S = 9;
// For a photo whose size can't be read (a remote image, say) and that sets no orientation
const FALLBACK_RATIO = 4 / 3;

type GalleryImage = (typeof gallery.images)[number];

// As in the gallery: `orientation` crops to 16 / 9 or 3 / 4, otherwise the photo keeps its own
// proportions, read from the file at build time.
function ratioOf(image: GalleryImage, size?: { width: number; height: number }) {
  if (image.orientation) return image.orientation === "horizontal" ? 16 / 9 : 3 / 4;
  return size ? size.width / size.height : FALLBACK_RATIO;
}

const rem = (value: number) => `${Number(value.toFixed(3))}rem` as const;

interface GalleryMarqueeProps {
  count?: number;
}

export async function GalleryMarquee({ count = 8 }: GalleryMarqueeProps) {
  // The strip links to /gallery and shows its photos, so it follows the gallery's visibility
  if (!galleryIsPublic()) return null;

  const images = gallery.images.slice(0, count);
  if (images.length === 0) return null;

  const dimensions = await getImageDimensions(images.map((image) => image.src));

  return (
    <Column fillWidth gap="16">
      <SectionHeader
        title={home.galleryMarquee?.title ?? gallery.label}
        link={{ href: gallery.path, label: home.galleryMarquee?.linkLabel ?? "All photos" }}
      />
      <Scroller auto={{ speed: "slow", hover: "slow", gap: 16 }} fillWidth>
        <Row gap="16" vertical="center">
          {images.map((image) => {
            const ratio = ratioOf(image, dimensions[image.src]);
            return (
              <Column
                key={image.src}
                width={rem(HEIGHT_REM * ratio)}
                s={{ width: rem(HEIGHT_REM_S * ratio) }}
              >
                <Media
                  src={image.src}
                  alt={image.alt}
                  aspectRatio={String(ratio)}
                  radius="l"
                  border
                  sizes="384px"
                />
              </Column>
            );
          })}
        </Row>
      </Scroller>
    </Column>
  );
}
