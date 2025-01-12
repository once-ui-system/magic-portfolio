"use client";

import { Flex, RevealFx, Scroller, SmartImage } from "@/once-ui/components";
import { useEffect, useState, useRef } from "react";

interface Image {
  src: string;
  alt: string;
}

interface CarouselProps extends React.ComponentProps<typeof Flex> {
  images: Image[];
  indicator?: "line" | "thumbnail";
  aspectRatio?: string;
  sizes?: string;
  revealedByDefault?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  images = [],
  indicator = "line",
  aspectRatio = "16 / 9",
  sizes,
  revealedByDefault = false,
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(revealedByDefault);
  const [initialTransition, setInitialTransition] = useState(revealedByDefault);
  const nextImageRef = useRef<HTMLImageElement | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const preloadNextImage = (nextIndex: number) => {
    if (nextIndex >= 0 && nextIndex < images.length) {
      nextImageRef.current = new Image();
      nextImageRef.current.src = images[nextIndex].src;
    }
  };

  const handleImageClick = () => {
    if (images.length > 1) {
      const nextIndex = (activeIndex + 1) % images.length;
      handleControlClick(nextIndex);
    }
  };

  const handleControlClick = (nextIndex: number) => {
    if (nextIndex !== activeIndex && !transitionTimeoutRef.current) {
      preloadNextImage(nextIndex);

      setIsTransitioning(false);

      transitionTimeoutRef.current = setTimeout(() => {
        setActiveIndex(nextIndex);

        setTimeout(() => {
          setIsTransitioning(true);
          transitionTimeoutRef.current = undefined;
        }, 300);
      }, 800);
    }
  };

  useEffect(() => {
    if (!revealedByDefault && !initialTransition) {
      setIsTransitioning(true);
      setInitialTransition(true);
    }
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [revealedByDefault, initialTransition]);

  if (images.length === 0) {
    return null;
  }

  return (
    <Flex fillWidth gap="12" direction="column" {...rest}>
      <RevealFx
        onClick={handleImageClick}
        fillWidth
        aspectRatio={aspectRatio}
        trigger={isTransitioning}
        translateY="16"
        speed="fast"
      >
        <SmartImage
          sizes={sizes}
          priority
          radius="l"
          alt={images[activeIndex]?.alt}
          aspectRatio={aspectRatio}
          src={images[activeIndex]?.src}
          style={{
            border: "1px solid var(--neutral-alpha-weak)",
            ...(images.length > 1 && {
              cursor: "pointer",
            }),
          }}
        />
      </RevealFx>
      {images.length > 1 && (
        <>
          {indicator === "line" ? (
            <Flex gap="4" paddingX="s" fillWidth justifyContent="center">
              {images.map((_, index) => (
                <Flex
                  key={index}
                  onClick={() => handleControlClick(index)}
                  style={{
                    background:
                      activeIndex === index
                        ? "var(--neutral-on-background-strong)"
                        : "var(--neutral-alpha-medium)",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                  fillWidth
                  height="2"
                ></Flex>
              ))}
            </Flex>
          ) : (
            <Scroller fillWidth gap="4" onItemClick={handleControlClick}>
              {images.map((image, index) => (
                <Flex
                  key={index}
                  style={{
                    border: activeIndex === index ? "2px solid var(--brand-solid-strong)" : "none",
                    cursor: "pointer",
                    borderRadius: "var(--radius-m-nest-4)",
                    transition: "border 0.3s ease",
                  }}
                  padding="4"
                  width="80"
                  height="80"
                >
                  <SmartImage
                    alt={image.alt}
                    aspectRatio="1 / 1"
                    sizes="120px"
                    src={image.src}
                    style={{
                      cursor: "pointer",
                      borderRadius: "var(--radius-m)",
                      transition: "background 0.3s ease",
                    }}
                  />
                </Flex>
              ))}
            </Scroller>
          )}
        </>
      )}
    </Flex>
  );
};

Carousel.displayName = "Carousel";
export { Carousel };
