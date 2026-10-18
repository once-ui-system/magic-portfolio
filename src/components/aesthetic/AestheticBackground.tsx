"use client";

import { Background, Column, Mask, type Opacity, type SpacingToken } from "@once-ui-system/core";
import { BlobFx, ParticleFx, RevealFx } from "@once-ui-system/fx";
import { aesthetics } from "@/resources";
import type { AestheticBackground as Layer } from "@/types";
import { useAesthetic } from "./AestheticProvider";
import { ProEffect } from "./ProEffect";

function Pattern({ pattern }: { pattern: NonNullable<Layer["pattern"]> }) {
  const { mask, gradient, dots, grid, lines } = pattern;
  return (
    <Background
      position="absolute"
      top="0"
      left="0"
      fill
      mask={
        mask && {
          x: `${mask.x}%`,
          y: `${mask.y}%`,
          radius: `${mask.radius}vh`,
          cursor: mask.cursor,
        }
      }
      gradient={
        gradient && {
          display: gradient.display,
          opacity: gradient.opacity as Opacity,
          x: `${gradient.x}%`,
          y: `${gradient.y}%`,
          width: `${gradient.width}%`,
          height: `${gradient.height}%`,
          tilt: gradient.tilt,
          colorStart: gradient.colorStart,
          colorEnd: gradient.colorEnd,
        }
      }
      dots={
        dots && {
          display: dots.display,
          opacity: dots.opacity as Opacity,
          size: dots.size as SpacingToken,
          color: dots.color,
        }
      }
      grid={
        grid && {
          display: grid.display,
          opacity: grid.opacity as Opacity,
          color: grid.color,
          width: grid.width,
          height: grid.height,
        }
      }
      lines={
        lines && {
          display: lines.display,
          opacity: lines.opacity as Opacity,
          size: lines.size as SpacingToken,
          thickness: lines.thickness,
          angle: lines.angle,
          color: lines.color,
        }
      }
    />
  );
}

/** The page background of the aesthetic in use, behind every route. */
export function AestheticBackground() {
  const { name } = useAesthetic();
  const { pattern, fx } = aesthetics[name].background;

  return (
    <RevealFx
      key={name}
      position="absolute"
      top="0"
      left="0"
      fill
      pointerEvents="none"
      overflow="hidden"
      aria-hidden
    >
      {pattern && <Pattern pattern={pattern} />}
      {fx === "blobs" && (
        // Pulled up by half its height so only the lower half of the glow shows at the top.
        <Column position="absolute" top="-40vh" left="0" fillWidth height="80vh" opacity={60}>
          <BlobFx seed={7} style={{ transform: "rotate(180deg)" }} />
        </Column>
      )}
      {fx === "particles" && (
        <Mask position="absolute" top="0" left="0" fill x="50%" y="0%" radius="80vh">
          <ParticleFx fill opacity={50} density={60} speed={0.5} color="brand-on-background-weak" />
        </Mask>
      )}
      <ProEffect name={name} />
    </RevealFx>
  );
}
