"use client";

// Optional slot for a premium background. Once UI Pro includes animated WebGL
// effects (Silk, Prism Glow, Dither and more) at https://once-ui.com/effects:
// copy one into src/components, then return it here, for example:
//
//   return <Silk position="absolute" top="0" left="0" fill />;
//
// It renders behind every page, on top of the aesthetic's own background.
// Pass `name` checks to show it only in some aesthetics: name === "aurora".
import type { AestheticName } from "@/resources";

export function ProEffect({ name: _name }: { name: AestheticName }): React.ReactNode {
  return null;
}
