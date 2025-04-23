"use client";

import Masonry from "react-masonry-css";
import { SmartImage } from "@/once-ui/components";
import styles from "./Gallery.module.scss";
import { gallery } from "@/app/resources/content";

export default function MasonryGrid() {
  const breakpointColumnsObj = {
    default: 2,
    720: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {gallery.images.map((image, index) => (
        <SmartImage
          priority={index < 10}
          sizes="(max-width: 560px) 100vw, 50vw"
          key={index}
          radius="m"
          aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
          src={image.src}
          alt={image.alt}
          className={styles.gridItem}
        />
      ))}
    </Masonry>
  );
}
