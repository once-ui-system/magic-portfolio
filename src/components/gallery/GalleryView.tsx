"use client";

import { gallery } from "@/resources";
import type { ImageDimensions } from "@/utils/imageDimensions";
import { Grid, Media } from "@once-ui-system/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PhotoViewer, type ViewerImage, photoSlug } from "./PhotoViewer";

type GalleryImage = (typeof gallery.images)[number];

// `orientation` crops the thumbnail as before; without it the photo keeps its own proportions
function aspectRatioOf(image: GalleryImage, size?: { width: number; height: number }) {
  if (image.orientation) return image.orientation === "horizontal" ? "16 / 9" : "3 / 4";
  return size ? `${size.width} / ${size.height}` : undefined;
}

export default function GalleryView({ dimensions = {} }: { dimensions?: ImageDimensions }) {
  const viewer = gallery.viewer;
  const viewerOn = viewer?.display ?? true;
  const param = viewer?.deepLink === false ? null : (viewer?.deepLinkParam ?? "photo");
  const openLabel = viewer?.labels?.open ?? ((alt: string) => `View ${alt}`);

  // Index of the photo open in the viewer, null when it's closed
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const images = useMemo<ViewerImage[]>(
    () => gallery.images.map((image) => ({ ...image, ...dimensions[image.src] })),
    [dimensions],
  );

  const getThumbnail = useCallback(
    (index: number) =>
      gridRef.current?.querySelector<HTMLElement>(`[data-gallery-index="${index}"]`) ?? null,
    [],
  );

  // `?photo=<file name>` opens that photo straight away (shared links, and Forward after closing)
  useEffect(() => {
    if (!viewerOn || !param) return;
    const openFromUrl = () => {
      const slug = new URL(window.location.href).searchParams.get(param);
      const index = slug ? images.findIndex((image) => photoSlug(image.src) === slug) : -1;
      if (index >= 0) setOpenIndex((current) => current ?? index);
    };
    openFromUrl();
    window.addEventListener("popstate", openFromUrl);
    return () => window.removeEventListener("popstate", openFromUrl);
  }, [images, param, viewerOn]);

  const onClosed = useCallback(() => setOpenIndex(null), []);

  return (
    <>
      <Grid ref={gridRef} masonry columns={2} s={{ columns: 1 }}>
        {gallery.images.map((image, index) => {
          const shared = {
            priority: index < 10,
            sizes: "(max-width: 560px) 100vw, 50vw",
            radius: "m" as const,
            aspectRatio: aspectRatioOf(image, dimensions[image.src]),
            src: image.src,
            alt: image.alt,
          };
          if (!viewerOn) return <Media key={image.src} enlarge {...shared} />;
          return (
            <Media
              key={image.src}
              {...shared}
              role="button"
              tabIndex={0}
              aria-label={openLabel(image.alt)}
              aria-haspopup="dialog"
              data-gallery-index={index}
              className="cursor-zoom-in focus-ring"
              // Media sets `outline: none` inline, which would hide the keyboard focus ring
              style={{ outline: undefined }}
              onClick={() => setOpenIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenIndex(index);
                }
              }}
            />
          );
        })}
      </Grid>
      {openIndex !== null && (
        <PhotoViewer
          images={images}
          startIndex={openIndex}
          getThumbnail={getThumbnail}
          onClosed={onClosed}
          urlParam={param}
          optimizeImages={viewer?.optimizeImages ?? true}
          labels={viewer?.labels}
        />
      )}
    </>
  );
}
