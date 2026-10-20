import type { FontFamily } from "@/resources/fonts";
import type { EffectsConfig, StyleConfig } from "./config.types";

/** Hero at the top of the home page. */
export type HeroVariant =
  /** Centered headline with the featured badge and an About button. */
  | "centered"
  /** Oversized headline set flush left, with a status line and meta row. */
  | "statement"
  /** Text on the left, a holographic portrait card on the right. */
  | "split"
  /** A shell prompt that types out who you are. */
  | "terminal";

/** How projects are listed on the home page. */
export type WorkVariant =
  /** Large carousels, one project after another. */
  | "stack"
  /** Numbered rows; hovering a row previews its cover next to the cursor. */
  | "index"
  /** A grid of cover tiles in mixed sizes that tilt toward the cursor. */
  | "bento";

/** How blog posts are listed on the home page. */
export type PostsVariant =
  /** Cards side by side. */
  | "grid"
  /** Dated rows, like a table of contents. */
  | "list";

/** One block of the home page. Order in the array is order on the page. */
export type HomeSection =
  | { type: "hero"; variant: HeroVariant }
  /** A scrolling strip of the words in `home.ticker` (content.tsx). */
  | { type: "ticker" }
  /** `range` picks projects by position, newest first: [1, 1] is the newest only. */
  | { type: "work"; variant: WorkVariant; range?: [number, number?] }
  | { type: "posts"; variant: PostsVariant; range?: [number, number?] }
  | { type: "newsletter" };

/** The page background behind every route. */
export type AestheticBackground = {
  /** Gradient, dots, grid and lines, as in Once UI's Background component. */
  pattern?: Partial<EffectsConfig>;
  /** An animated layer on top of the pattern. */
  fx?: "blobs" | "particles";
};

/**
 * A complete look: colors and shapes, fonts, background and home page layout.
 * Copy one of the presets in aesthetics.ts to make your own.
 */
export type Aesthetic = {
  label: string;
  description: string;
  /** Once UI theme settings. `style` in once-ui.config.ts overrides these. */
  style: Omit<StyleConfig, "theme">;
  /** Which font from fonts.ts each kind of text uses. */
  fonts: {
    heading: FontFamily;
    body: FontFamily;
    label: FontFamily;
    code: FontFamily;
  };
  /** Extra CSS custom properties, e.g. Once UI's font size or weight tokens. */
  vars?: Record<`--${string}`, string>;
  /** Extra CSS rules, applied only while this aesthetic is in use. */
  css?: string;
  background: AestheticBackground;
  home: HomeSection[];
};
