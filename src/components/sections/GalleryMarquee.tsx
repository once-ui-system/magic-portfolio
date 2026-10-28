import { gallery, home, routes } from "@/resources";
import { Column, Media, Row, Scroller } from "@once-ui-system/core";
import { SectionHeader } from "./SectionHeader";

// Soft edges: the strip fades out at both sides instead of being cut off.
const edgeMask =
  "linear-gradient(to right, transparent, black 4rem, black calc(100% - 4rem), transparent)";

interface GalleryMarqueeProps {
  count?: number;
}

export function GalleryMarquee({ count = 8 }: GalleryMarqueeProps) {
  const images = gallery.images.slice(0, count);
  if (images.length === 0) return null;

  return (
    <Column fillWidth gap="16">
      <SectionHeader
        title={home.galleryMarquee?.title ?? gallery.label}
        link={
          routes["/gallery"]
            ? { href: gallery.path, label: home.galleryMarquee?.linkLabel ?? "All photos" }
            : undefined
        }
      />
      <Row fillWidth style={{ maskImage: edgeMask, WebkitMaskImage: edgeMask }}>
        <Scroller auto={{ speed: "slow", hover: "slow", gap: 16 }} fillWidth>
          <Row gap="16" vertical="center">
            {images.map((image) => (
              <Column
                key={image.src}
                width={image.orientation === "horizontal" ? "24rem" : "10.125rem"}
                s={{ width: image.orientation === "horizontal" ? "16rem" : "6.75rem" }}
              >
                <Media
                  src={image.src}
                  alt={image.alt}
                  aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
                  radius="l"
                  border="neutral-alpha-weak"
                  sizes="384px"
                />
              </Column>
            ))}
          </Row>
        </Scroller>
      </Row>
    </Column>
  );
}
