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

/**
 * What the site tells search engines and AI tools beyond meta tags.
 */
export type SeoConfig = {
  /** Plain-text guides to the site for AI assistants (https://llmstxt.org). */
  llmsTxt: {
    /** Serve /llms.txt: your pages, projects and posts with their summaries. Off makes it 404. */
    enabled: boolean;
    /** Also serve /llms-full.txt with the full text of every project and post. Needs `enabled`. */
    fullText: boolean;
  };
  /** Which AI crawlers robots.txt lets in. Regular search engines are always allowed. */
  aiCrawlers: {
    /** Let in bots that fetch pages to answer a question or build an AI search index. */
    search: boolean;
    /** Let in bots that collect text to train AI models. */
    training: boolean;
    /** User agents `search` covers. Defaults to `aiSearchBots` in src/resources/aiCrawlers.ts. */
    searchBots?: string[];
    /** User agents `training` covers. Defaults to `aiTrainingBots` in src/resources/aiCrawlers.ts. */
    trainingBots?: string[];
  };
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
};
