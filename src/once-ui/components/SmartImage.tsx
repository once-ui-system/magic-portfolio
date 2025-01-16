"use client";

import React, { CSSProperties, useState, useRef, useEffect } from "react";
import Image from "next/image";

import { Flex, Skeleton } from "@/once-ui/components";

export interface SmartImageProps extends React.ComponentProps<typeof Flex> {
  aspectRatio?: string;
  height?: number;
  alt?: string;
  isLoading?: boolean;
  objectFit?: CSSProperties["objectFit"];
  enlarge?: boolean;
  src: string;
  unoptimized?: boolean;
  sizes?: string;
  priority?: boolean;
}

const SmartImage: React.FC<SmartImageProps> = ({
  aspectRatio,
  height,
  alt = "",
  isLoading = false,
  objectFit = "cover",
  enlarge = false,
  src,
  unoptimized = false,
  priority,
  sizes = "100vw",
  ...rest
}) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (enlarge) {
      setIsEnlarged(!isEnlarged);
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isEnlarged) {
        setIsEnlarged(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isEnlarged]);

  useEffect(() => {
    if (isEnlarged) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEnlarged]);

  const calculateTransform = () => {
    if (!imageRef.current) return {};

    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = window.innerWidth / rect.width;
    const scaleY = window.innerHeight / rect.height;
    const scale = Math.min(scaleX, scaleY) * 0.9;

    const translateX = (window.innerWidth - rect.width) / 2 - rect.left;
    const translateY = (window.innerHeight - rect.height) / 2 - rect.top;

    return {
      transform: isEnlarged
        ? `translate(${translateX}px, ${translateY}px) scale(${scale})`
        : "translate(0, 0) scale(1)",
      transition: "all 0.3s ease-in-out",
      zIndex: isEnlarged ? 2 : undefined,
    };
  };

  const isYouTubeVideo = (url: string) => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return youtubeRegex.test(url);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return match
      ? `https://www.youtube.com/embed/${match[1]}?controls=0&rel=0&modestbranding=1`
      : "";
  };

  const isVideo = src?.endsWith(".mp4");
  const isYouTube = isYouTubeVideo(src);

  return (
    <>
      <Flex
        ref={imageRef}
        fillWidth
        overflow="hidden"
        position="relative"
        zIndex={0}
        cursor={enlarge ? "interactive" : ""}
        style={{
          outline: "none",
          isolation: "isolate",
          height: aspectRatio ? "" : height ? `${height}rem` : "100%",
          aspectRatio,
          borderRadius: isEnlarged ? "0" : undefined,
          ...calculateTransform(),
        }}
        onClick={handleClick}
        {...rest}
      >
        {isLoading && <Skeleton shape="block" />}
        {!isLoading && isVideo && (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: objectFit,
            }}
          />
        )}
        {!isLoading && isYouTube && (
          <iframe
            width="100%"
            height="100%"
            src={getYouTubeEmbedUrl(src)}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              objectFit: objectFit,
            }}
          />
        )}
        {!isLoading && !isVideo && !isYouTube && (
          <Image
            src={src}
            alt={alt}
            priority={priority}
            sizes={sizes}
            unoptimized={unoptimized}
            fill
            style={{
              objectFit: objectFit,
            }}
          />
        )}
      </Flex>

      {isEnlarged && enlarge && (
        <Flex
          horizontal="center"
          vertical="center"
          position="fixed"
          background="overlay"
          onClick={handleClick}
          top="0"
          left="0"
          opacity={isEnlarged ? 100 : 0}
          cursor="interactive"
          transition="macro-medium"
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <Flex
            position="relative"
            style={{
              height: "100vh",
              transform: "translate(-50%, -50%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {isVideo ? (
              <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "90vw",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Image
                src={src}
                alt={alt}
                fill
                sizes="90vw"
                unoptimized={unoptimized}
                style={{
                  objectFit: "contain",
                }}
              />
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
};

SmartImage.displayName = "SmartImage";

export { SmartImage };
