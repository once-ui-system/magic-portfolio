"use client";

import React, { useState } from "react";
import { Flex, Text, SmartImage, IconButton } from "@/once-ui/components";
import styles from "./About.module.scss";

interface VideoEmbedProps {
  videoUrl: string;
  thumbnailSrc: string;
  videoTitle?: string;
  warningMessage?: string;
}

export default function VideoEmbed({ 
  videoUrl, 
  thumbnailSrc, 
  videoTitle,
  warningMessage = "⚠️ Aboriginal and Torres Strait Islander viewers are advised that this video may contain images, voices, and names of deceased persons.",
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Flex direction="column" gap="l" align="center">
      {!isPlaying ? (
      <Flex
        onClick={() => setIsPlaying(true)}
        style={{
          position: "relative",
          display: "inline-block",
          cursor: "pointer",
        }}
      >
        {/* Thumbnail Image */}
        <SmartImage
          src={thumbnailSrc}
          alt={videoTitle || "Video thumbnail"}
          sizes="(max-width: 768px) 100vw, 600px"
          style={{
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            width: "100%", // Ensures responsive width
            maxWidth: "600px",
          }}
        />

        {/* Play Button Overlay */}
        <Flex
          position="absolute"
          top="0"
          left="0"
          background="neutral-strong"
          className={styles.playButtonOverlay}
          width="l"
          height="l"
          align="center"
          horizontal="center"
        >
          <IconButton
            icon="play"
            size="l"
            variant="ghost"
            aria-label="Play video"
            style={{ color: "white", fontSize: "40px" }}
          />
        </Flex>
      </Flex>
      ) : (        

        <Flex direction="column" align="center" gap="l">
          <Text variant="body-default-m" onBackground="danger-strong" align="center">
            {warningMessage}
          </Text>

          <iframe
            width="800"
            height="450"
            src={videoUrl}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            style={{
              borderRadius: "8px",
              border: "none",
              width: "100%", // Make responsive
              maxWidth: "800px",
              aspectRatio: "16/9",
            }}
          ></iframe>          
        </Flex>      
      )}     
    </Flex>
  );
}
