import {
  Aesthetic,
  DataStyleConfig,
  DisplayConfig,
  HomeSection,
  NewsletterFormConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";
import { home, person, social } from "./content";
import { aesthetics, type AestheticName } from "./aesthetics";

// IMPORTANT: Replace with your own domain address - it's used for SEO in meta tags and schema
const baseURL: string = "https://magic-portfolio-demo.vercel.app";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
  "/gallery": true,
};

const display: DisplayConfig = {
  location: true,
  time: true,
  themeSwitcher: true,
  // Shows a picker that lets visitors try every aesthetic. Handy for a demo,
  // usually off on a real portfolio.
  aestheticSwitcher: true,
};

// Enable password protection on selected routes
// Set password in the .env file, refer to .env.example
const protectedRoutes: ProtectedRoutesConfig = {
  "/work/automate-design-handovers-with-a-figma-to-code-pipeline": true,
};

// The look of the whole site: classic | editorial | swiss | aurora | terminal
// Each one sets colors, fonts, background and home page layout (see aesthetics.ts).
const aesthetic: AestheticName = "editorial";

// Fine-tune the aesthetic: anything set here wins over its choices.
const styleOverrides: Partial<StyleConfig> = {
  theme: "system", // dark | light | system
  // neutral: "gray", // sand | gray | slate | mint | rose | dusk
  // brand: "cyan", // blue | indigo | violet | magenta | pink | red | orange | yellow | moss | green | emerald | aqua | cyan
  // accent: "red", // same options as brand
  // solid: "contrast", // color | contrast | inverse
  // solidStyle: "flat", // flat | plastic
  // border: "playful", // rounded | playful | conservative | sharp
  // surface: "translucent", // filled | translucent
  // transition: "all", // all | micro | macro | none
  // scaling: "100", // 90 | 95 | 100 | 105 | 110
};

// Reorder, remove or swap home page sections. Leave empty to use the aesthetic's own.
// Example: [{ type: "hero", variant: "split" }, { type: "work", variant: "index" }]
const homeSections: HomeSection[] = [];

const activeAesthetic: Aesthetic = aesthetics[aesthetic];

const style: StyleConfig = {
  theme: "system",
  ...activeAesthetic.style,
  ...styleOverrides,
};

const dataStyle: DataStyleConfig = {
  variant: "gradient", // flat | gradient | outline
  mode: "categorical", // categorical | divergent | sequential
  height: 24, // default chart height
  axis: {
    stroke: "var(--neutral-alpha-weak)",
  },
  tick: {
    fill: "var(--neutral-on-background-weak)",
    fontSize: 11,
    line: false,
  },
};

// Newsletter signups go straight into your Aveiro audience (https://www.aveiro.app),
// where you can write and send the newsletter too. In Aveiro, open Audience → Embed,
// create a form, add this site's domain to its allowed sites and paste the form's public ID here.
const newsletterForm: NewsletterFormConfig = {
  aveiroEmbedId: "",
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 100,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

// default schema data — pulls from content.tsx so there's one source of truth
const schema: SchemaConfig = {
  logo: "",
  type: "Person",
  name: person.name,
  description: home.description,
  email: person.email,
};

// social links — derived from the social array in content.tsx to avoid duplication
const sameAs: SameAsConfig = {
  threads: social.find((s) => s.name === "Threads")?.link ?? "",
  linkedin: social.find((s) => s.name === "LinkedIn")?.link ?? "",
  discord: social.find((s) => s.name === "Discord")?.link ?? "",
};

// social sharing configuration for blog posts
const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: {
    x: true,
    linkedin: true,
    facebook: false,
    pinterest: false,
    whatsapp: false,
    reddit: false,
    telegram: false,
    email: true,
    copyLink: true,
  },
};

export {
  display,
  newsletterForm,
  routes,
  protectedRoutes,
  baseURL,
  aesthetic,
  activeAesthetic,
  homeSections,
  styleOverrides,
  style,
  schema,
  sameAs,
  socialSharing,
  dataStyle,
};
