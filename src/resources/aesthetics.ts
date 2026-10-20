// Aesthetics: complete looks for the portfolio. Pick one with `aesthetic` in
// once-ui.config.ts, or copy a preset below and change it to make your own.
//
// An aesthetic sets the Once UI theme (colors, corners, surfaces), the fonts,
// the page background and which sections the home page shows, in which variant.
import type { Aesthetic } from "@/types";

const classic: Aesthetic = {
  label: "Classic",
  description: "The original Magic Portfolio: clean, centered and calm.",
  style: {
    neutral: "gray",
    brand: "cyan",
    accent: "red",
    solid: "contrast",
    solidStyle: "flat",
    border: "playful",
    surface: "translucent",
    transition: "all",
    scaling: "100",
  },
  fonts: { heading: "geist", body: "geist", label: "geist", code: "geistMono" },
  background: {
    pattern: {
      mask: { cursor: false, x: 50, y: 0, radius: 100 },
      dots: { display: true, opacity: 40, size: "2", color: "brand-background-strong" },
    },
  },
  home: [
    { type: "hero", variant: "centered" },
    { type: "work", variant: "stack", range: [1, 1] },
    { type: "posts", variant: "grid", range: [1, 2] },
    { type: "work", variant: "stack", range: [2] },
    { type: "newsletter" },
  ],
};

const editorial: Aesthetic = {
  label: "Editorial",
  description: "Magazine pages: an oversized serif, warm paper and quiet rules.",
  style: {
    neutral: "sand",
    brand: "orange",
    accent: "red",
    solid: "contrast",
    solidStyle: "flat",
    border: "conservative",
    surface: "filled",
    transition: "all",
    scaling: "100",
  },
  fonts: { heading: "instrumentSerif", body: "geist", label: "geist", code: "geistMono" },
  vars: {
    "--font-weight-display-strong": "400",
    "--font-weight-heading-strong": "400",
    "--font-size-display-multiplier": "1.2",
  },
  // A serif needs more air than Once UI's tight display tracking.
  css: ".font-display, .font-heading { letter-spacing: -0.01em; }",
  background: {},
  home: [
    { type: "hero", variant: "statement" },
    { type: "ticker" },
    { type: "work", variant: "index" },
    { type: "posts", variant: "list", range: [1, 4] },
    { type: "newsletter" },
  ],
};

const swiss: Aesthetic = {
  label: "Swiss",
  description: "International style: a strict grid, tight grotesk and one loud red.",
  style: {
    neutral: "gray",
    brand: "red",
    accent: "orange",
    solid: "color",
    solidStyle: "flat",
    border: "sharp",
    surface: "filled",
    transition: "micro",
    scaling: "100",
  },
  fonts: { heading: "interTight", body: "interTight", label: "geistMono", code: "geistMono" },
  vars: {
    "--font-size-display-multiplier": "1.25",
  },
  css: ".font-display { letter-spacing: -0.045em; } .font-label { text-transform: uppercase; letter-spacing: 0.04em; }",
  background: {
    pattern: {
      mask: { cursor: false, x: 50, y: 0, radius: 200 },
      grid: {
        display: true,
        opacity: 100,
        color: "neutral-alpha-weak",
        width: "8rem",
        height: "8rem",
      },
    },
  },
  home: [
    { type: "hero", variant: "statement" },
    { type: "work", variant: "bento" },
    { type: "ticker" },
    { type: "posts", variant: "list", range: [1, 4] },
    { type: "newsletter" },
  ],
};

const aurora: Aesthetic = {
  label: "Aurora",
  description: "Soft light: drifting color, frosted glass and cards that tilt.",
  style: {
    neutral: "dusk",
    brand: "violet",
    accent: "magenta",
    solid: "color",
    solidStyle: "plastic",
    border: "playful",
    surface: "translucent",
    transition: "all",
    scaling: "100",
  },
  fonts: { heading: "bricolage", body: "geist", label: "geist", code: "geistMono" },
  background: {
    pattern: {
      mask: { cursor: false, x: 50, y: 0, radius: 100 },
      dots: { display: true, opacity: 20, size: "2", color: "neutral-alpha-medium" },
    },
    fx: "blobs",
  },
  home: [
    { type: "hero", variant: "split" },
    { type: "work", variant: "bento" },
    { type: "posts", variant: "grid", range: [1, 2] },
    { type: "newsletter" },
  ],
};

const terminal: Aesthetic = {
  label: "Terminal",
  description: "A developer's home: monospace everything, phosphor green, live particles.",
  style: {
    neutral: "slate",
    brand: "emerald",
    accent: "green",
    solid: "color",
    solidStyle: "flat",
    border: "sharp",
    surface: "filled",
    transition: "micro",
    scaling: "100",
  },
  fonts: {
    heading: "jetbrainsMono",
    body: "jetbrainsMono",
    label: "jetbrainsMono",
    code: "jetbrainsMono",
  },
  vars: {
    "--font-size-display-multiplier": "0.8",
  },
  background: {
    pattern: {
      mask: { cursor: false, x: 50, y: 0, radius: 100 },
      lines: {
        display: true,
        opacity: 100,
        color: "neutral-alpha-weak",
        size: "4",
        thickness: 1,
        angle: 0,
      },
    },
    fx: "particles",
  },
  home: [
    { type: "hero", variant: "terminal" },
    { type: "work", variant: "index" },
    { type: "posts", variant: "list", range: [1, 4] },
    { type: "newsletter" },
  ],
};

export const aesthetics = { classic, editorial, swiss, aurora, terminal };

export type AestheticName = keyof typeof aesthetics;
