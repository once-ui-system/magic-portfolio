import {
  BorderStyle,
  NeutralColor,
  ScalingSize,
  Schemes,
  SolidStyle,
  SolidType,
  SurfaceStyle,
  Theme,
  TransitionStyle,
} from "@once-ui-system/core";
import type { ChartMode, ChartVariant } from "@once-ui-system/core/data";
import type { HomeSection } from "./aesthetic.types";

/**
 * Display configuration for UI elements.
 */
export type DisplayConfig = {
  location: boolean;
  time: boolean;
  themeSwitcher: boolean;
  aestheticSwitcher: boolean;
};

/**
 * Route configuration for enabled/disabled routes.
 */
export type RoutesConfig = Record<`/${string}`, boolean>;

/**
 * Protected route configuration.
 */
export type ProtectedRoutesConfig = Record<`/${string}`, boolean>;

/**
 * Style customization for main layout.
 */
export type StyleConfig = {
  theme: Theme;
  neutral: NeutralColor;
  brand: Schemes;
  accent: Schemes;
  solid: SolidType;
  solidStyle: SolidStyle;
  border: BorderStyle;
  surface: SurfaceStyle;
  transition: TransitionStyle;
  scaling: ScalingSize;
};

/**
 * Data style configuration for charts.
 */
export type DataStyleConfig = {
  variant: ChartVariant;
  mode: ChartMode;
  height: number;
  axis: {
    stroke: string;
  };
  tick: {
    fill: string;
    fontSize: number;
    line: boolean;
  };
};

/**
 * Effects configuration for UI visuals.
 */
export type EffectsConfig = {
  mask: {
    cursor: boolean;
    x: number;
    y: number;
    radius: number;
  };
  gradient: {
    display: boolean;
    opacity: number;
    x: number;
    y: number;
    width: number;
    height: number;
    tilt: number;
    colorStart: string;
    colorEnd: string;
  };
  dots: {
    display: boolean;
    opacity: number;
    size: string;
    color: string;
  };
  grid: {
    display: boolean;
    opacity: number;
    color: string;
    width: string;
    height: string;
  };
  lines: {
    display: boolean;
    opacity: number;
    color: string;
    size: string;
    thickness: number;
    angle: number;
  };
};

/**
 * Newsletter signup form, backed by an Aveiro embed form.
 */
export type NewsletterFormConfig = {
  aveiroEmbedId: string;
  effects: EffectsConfig;
};

/**
 * Schema data for SEO/meta tags.
 */
export type SchemaConfig = {
  logo: string;
  type: string;
  name: string;
  description: string;
  email: string;
};

/**
 * Social links for organization.
 */
export type SameAsConfig = {
  threads: string;
  linkedin: string;
  discord: string;
};

/**
 * Social sharing configuration for blog posts.
 */
export type SocialSharingConfig = {
  display: boolean;
  platforms: {
    x: boolean;
    linkedin: boolean;
    facebook: boolean;
    pinterest: boolean;
    whatsapp: boolean;
    reddit: boolean;
    telegram: boolean;
    email: boolean;
    copyLink: boolean;
  };
};

/** Opt-in quality-of-life features. Each key switches one feature on or off. */
export type FeaturesConfig = {
  /** Briefly highlight the heading or element a #link lands on. Default true. */
  hashHighlight?: boolean;
  /** Thin progress bar at the top of blog posts and project pages. Default true. */
  readingProgress?: boolean;
  /** "On this page" list that folds open above posts and projects on phones. Default true. */
  mobileToc?: boolean;
  /** "On this page" sidebar on project pages, like the one on blog posts. Default true. */
  projectToc?: boolean;
  /** Offers to jump back to where a reader stopped in a post or project. Default true. */
  resumeReading?: boolean;
};

/**
 * What the site tells search engines beyond meta tags.
 */
export type SeoConfig = {
  /** Serve /sitemap-images.xml with the gallery photos and list it in robots.txt. Off makes it 404. */
  imageSitemap: boolean;
  /** Describe the gallery as an ImageGallery in JSON-LD, with creator, credit and copyright per photo. */
  galleryStructuredData: boolean;
};

/**
 * Top-level config types for once-ui.config.js
 */
export type OnceUIConfig = {
  display: DisplayConfig;
  newsletterForm: NewsletterFormConfig;
  routes: RoutesConfig;
  protectedRoutes: ProtectedRoutesConfig;
  baseURL: string;
  aesthetic: string;
  homeSections: HomeSection[];
  style: StyleConfig;
  schema: SchemaConfig;
  sameAs: SameAsConfig;
  socialSharing: SocialSharingConfig;
  dataStyle: DataStyleConfig;
  seo: SeoConfig;
  features: FeaturesConfig;
};
