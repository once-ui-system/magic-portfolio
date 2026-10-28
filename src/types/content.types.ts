import { IconName } from "@/resources/icons";
import { zones } from "tzdata";

/**
 * IANA time zone string (e.g., 'Asia/Calcutta', 'Europe/Vienna').
 * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
 */
export type IANATimeZone = Extract<keyof typeof zones, string>; // Narrow to string keys for React usage

/**
 * Represents a person featured in the portfolio.
 */
export type Person = {
  /** First name of the person */
  firstName: string;
  /** Last name of the person */
  lastName: string;
  /** The name you want to display, allows variations like nicknames */
  name: string;
  /** Role or job title */
  role: string;
  /** Path to avatar image */
  avatar: string;
  /** Email address */
  email: string;
  /** IANA time zone location */
  location: IANATimeZone;
  /** Languages spoken */
  languages?: string[];
  /**
   * BCP 47 language tag for the HTML lang attribute (e.g., 'en', 'ja', 'zh-TW').
   * Defaults to 'en' if not set.
   * See: https://www.iana.org/assignments/language-subtag-registry
   */
  locale?: string;
};

/**
 * Newsletter Section
 * @description The below information will be displayed on the Home page in Newsletter block
 */
export type Newsletter = {
  /** Whether to display the newsletter section */
  display: boolean;
  /** Title of the newsletter   */
  title: React.ReactNode;
  /** Description of the newsletter */
  description: React.ReactNode;
};

/**
 * Back-to-top button.
 * @description The floating button that scrolls back up; switch it with `features.backToTop`.
 */
export type BackToTop = {
  /** Its tooltip and accessible name. Default "Back to top" */
  label?: string;
};

/**
 * Social link configuration.
 */
export type Social = Array<{
  /** Name of the social platform */
  name: string;
  /** Icon for the social platform
   * The icons are a part of "src/resources/icons.ts" file.
   * If you need a different icon, import it there and reference it everywhere else
   */
  icon: IconName;
  /**
   * The link to the social platform
   *
   * The link is not validated by code, make sure it's correct
   */
  link: string;
  /** Whether this social link is essential and should be displayed on the about page */
  essential?: boolean;
}>;

/**
 * Base interface for page configuration with common properties.
 */
export interface BasePageConfig {
  /** Path to the page
   *
   * The path should be relative to the public directory
   */
  path: `/${string}` | string;
  /** Label for navigation or display */
  label: string;
  /** Title of the page */
  title: string;
  /** Description for SEO and metadata */
  description: string;
  /** OG Image should be put inside `public/images` folder */
  image?: `/images/${string}` | string;
}

/**
 * Home page configuration.
 */
export interface Home extends BasePageConfig {
  /** The image to be displayed in metadata
   *
   * The image needs to be put inside `/public/images/` directory
   */
  image: `/images/${string}` | string;
  /** The headline of the home page */
  headline: React.ReactNode;
  /** Featured badge, which appears above the headline */
  featured: {
    display: boolean;
    title: React.ReactNode;
    href: string;
  };
  /** The sub text which appears below the headline */
  subline: React.ReactNode;
  /** A status line shown by the statement and split heroes, e.g. "Open to new projects". Leave empty to hide it. */
  availability?: string;
  /** Words for the ticker section and the terminal hero, e.g. what you do or tools you use */
  ticker?: string[];
}

/**
 * About page configuration.
 * @description Configuration for the About page, including sections for table of contents, avatar, calendar, introduction, work experience, studies, and technical skills.
 */
export interface About extends BasePageConfig {
  /** Table of contents configuration */
  tableOfContent: {
    /** Whether to display the table of contents */
    display: boolean;
    /** Whether to show sub-items in the table of contents */
    subItems: boolean;
  };
  /** Avatar section configuration */
  avatar: {
    /** Whether to display the avatar */
    display: boolean;
  };
  /** Calendar section configuration */
  calendar: {
    /** Whether to display the calendar */
    display: boolean;
    /** Link to the calendar */
    link: string;
  };
  /** Introduction section */
  intro: {
    /** Whether to display the introduction */
    display: boolean;
    /** Title of the introduction section */
    title: string;
    /** Description of the introduction section */
    description: React.ReactNode;
  };
  /** Work experience section */
  work: {
    /** Whether to display work experience */
    display: boolean;
    /** Title for the work experience section */
    title: string;
    /** List of work experiences */
    experiences: Array<{
      /** Company name */
      company: string;
      /** Timeframe of employment */
      timeframe: string;
      /** Role or job title */
      role: string;
      /** Achievements at the company */
      achievements: React.ReactNode[];
      /** Images related to the experience */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
  /** Studies/education section */
  studies: {
    /** Whether to display studies section */
    display: boolean;
    /** Title for the studies section */
    title: string;
    /** List of institutions attended */
    institutions: Array<{
      /** Institution name */
      name: string;
      /** Description of studies */
      description: React.ReactNode;
    }>;
  };
  /** Technical skills section */
  technical: {
    /** Whether to display technical skills section */
    display: boolean;
    /** Title for the technical skills section */
    title: string;
    /** List of technical skills */
    skills: Array<{
      /** Skill title */
      title: string;
      /** Skill description */
      description?: React.ReactNode;
      /** Skill tags */
      tags?: Array<{
        name: string;
        icon?: IconName;
      }>;
      /** Images related to the skill */
      images?: Array<{
        /** Image source path */
        src: string;
        /** Image alt text */
        alt: string;
        /** Image width ratio */
        width: number;
        /** Image height ratio */
        height: number;
      }>;
    }>;
  };
}

/**
 * Blog page configuration.
 * @description Configuration for the Blog page, including metadata and navigation label.
 */
export interface Blog extends BasePageConfig {
  /** The contents list above posts and projects on phones (`features.mobileToc`) */
  mobileToc?: {
    /** Title of the folded list. Default "On this page" */
    title?: string;
  };
  /** The offer to jump back on posts and project pages (`features.resumeReading`) */
  resumeReading?: {
    /** The question in the toast. Default "Pick up where you left off?" */
    prompt?: string;
    /** The button that jumps back. Default "Continue" */
    action?: string;
  };
  /** The toolbar for sharing a selected passage on posts and project pages (`features.quoteShare`) */
  quoteShare?: {
    /** Name of the toolbar for screen readers. Default "Share quote" */
    toolbar?: string;
    /** Tooltip of a platform's button. Default: platform => `Share quote on ${platform}` */
    shareOn?: (platform: string) => string;
    /** Tooltip of the copy button. Default "Copy quote" */
    copy?: string;
    /** Toast after copying. Default "Quote copied to clipboard" */
    copied?: string;
    /** Toast when copying fails. Default "Couldn't copy the quote" */
    copyFailed?: string;
    /** Announced to screen readers when a passage is selected */
    hint?: string;
  };
  /** The topic chips above the blog listing (`features.tagFilter`) */
  tagFilter?: {
    /** The chip that shows every post. Default "All" */
    all?: string;
    /** Name of the chip row for screen readers. Default "Filter posts by topic" */
    label?: string;
    /** Announced to screen readers after picking a topic. Default: "3 posts about Design" */
    results?: (count: number, tag: string) => string;
  };
}

/**
 * Work/projects page configuration.
 * @description Configuration for the Work/Projects page, including metadata and navigation label.
 */
export interface Work extends BasePageConfig {}

/**
 * Gallery page configuration.
 * @description Configuration for the Gallery page, including metadata, navigation label, and image list.
 */
export interface Gallery extends BasePageConfig {
  /** List of images in the gallery */
  images: Array<{
    /** Image source path */
    src: string;
    /** Image alt text */
    alt: string;
    /** Image orientation (horizontal/vertical) */
    orientation: string;
    /** Name of the photo for search engines (`seo.galleryStructuredData`). Defaults to the alt text */
    title?: string;
    /** Year the photo was taken, e.g. "2024". Used for its date and copyright notice */
    year?: string;
  }>;
  /**
   * Copyright notice search engines show with each photo (`seo.galleryStructuredData`).
   * Default: year => `© ${year} ${person.name}`, with the photo's year or the current one
   */
  copyrightNotice?: (year: string) => string;
}
