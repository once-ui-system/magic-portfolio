"use client";

import Masonry from 'react-masonry-css';
import { SmartImage } from "@/once-ui/components";
import { gallery } from "@/app/resources";
import styles from "@/app/gallery/Gallery.module.scss";

export default function MasonryGrid() {
    const breakpointColumnsObj = {
        default: 4,
        1440: 3,
        1024: 2,
        560: 1
    };

    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className={styles.masonryGrid}
            columnClassName={styles.masonryGridColumn}>
            {gallery.images.map((image, index) => (
                <SmartImage
                    key={index}
                    radius="m"
                    aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "9 / 16"}
                    src={image.src}
                    alt={image.alt}
                    className={styles.gridItem}
                />
            ))}
        </Masonry>
    );
}