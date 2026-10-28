import { About, BackToTop, Blog, Gallery, Home, Newsletter, Person, Social, Work, Search, Footer } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Selene",
  lastName: "Yu",
  name: `Selene Yu`,
  role: "Design Engineer",
  avatar: "/images/avatar.jpg",
  email: "example@gmail.com",
  location: "Asia/Jakarta", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Bahasa"], // optional: Leave the array empty if you don't want to display languages
  locale: "en", // BCP 47 language tag for the HTML lang attribute, e.g., 'en', 'ja', 'zh-TW'
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

// The floating button that scrolls back up (features.backToTop in once-ui.config.ts)
const backToTop: BackToTop = {
  label: "Back to top",
};

// Labels of the ⌘K command palette (features.search in once-ui.config.ts). Pages, posts and
// projects use their own labels and titles.
const search: Search = {
  label: "Search",
  sections: {
    pages: "Pages",
    actions: "Actions",
    links: "Links",
  },
  actions: {
    theme: "Switch light or dark theme",
    copyEmail: "Copy email address",
    emailCopied: "Email address copied.",
    rss: "RSS feed",
  },
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/once-ui-system",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/once-ui/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/once_ui/",
    essential: false,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@once_ui",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const footer: Footer = {
  variant: "minimal", // minimal | columns
  // The columns footer lists your enabled pages and social links. These apply to it only:
  localTime: true,
  pages: { display: true, title: "Pages" },
  connect: { display: true, title: "Connect" },
  columns: [],
};

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      I'm {person.firstName}, a {person.role.toLowerCase()} at{" "}
      <Text as="span" className="font-xl" weight="strong">
        ONCE UI
      </Text>
      , where I craft intuitive user experiences. After hours, I build my own projects.
    </>
  ),
  availability: "Open to new projects",
  ticker: [
    "Design systems",
    "Interface design",
    "Prototyping",
    "Front-end engineering",
    "Motion",
    "Developer experience",
  ],
  contact: {
    title: "Have a project in mind?",
    description: "I'm open to new collaborations. Say hi and tell me what you're building.",
    links: ["Email", "LinkedIn", "GitHub"],
  },
  // Headings of the gallery and featured posts sections
  galleryMarquee: {
    title: "Gallery",
    linkLabel: "All photos",
  },
  featuredPosts: {
    title: "Writing",
    linkLabel: "All posts",
  },
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        {person.firstName} is a {person.location.split("/")[1]?.replace("_", " ")}-based{" "}
        {person.role.toLowerCase()} with a passion for transforming complex challenges into simple,
        elegant design solutions. Their work spans digital interfaces, interactive experiences, and
        the convergence of design and technology.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "FLY",
        timeframe: "2022 - Present",
        role: "Senior Design Engineer",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Creativ3",
        timeframe: "2018 - 2022",
        role: "Lead Designer",
        achievements: [
          <>
            Developed a design system that unified the brand across multiple platforms, improving
            design consistency by 40%.
          </>,
          <>
            Led a cross-functional team to launch a new product line, contributing to a 15% increase
            in overall company revenue.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
        tags: [
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Supabase",
            icon: "supabase",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
  // Contents list above posts and projects on phones (features.mobileToc)
  mobileToc: {
    title: "On this page",
  },
  // The offer to jump back into a post or project (features.resumeReading)
  resumeReading: {
    prompt: "Pick up where you left off?",
    action: "Continue",
  },
  // The toolbar for sharing a selected passage of a post or project (features.quoteShare)
  quoteShare: {
    toolbar: "Share quote",
    shareOn: (platform) => `Share quote on ${platform}`,
    copy: "Copy quote",
    copied: "Quote copied to clipboard",
    copyFailed: "Couldn't copy the quote",
    hint: "Quote selected. Press Tab to share it.",
  },
  // Topic chips above the blog listing (features.tagFilter)
  tagFilter: {
    all: "All",
    label: "Filter posts by topic",
    results: (count, tag) => `${count} ${count === 1 ? "post" : "posts"} about ${tag}`,
  },
  // The line under a post's title, next to its date
  postMeta: {
    updated: "Updated",
    readingTime: (minutes) => `${minutes} min read`,
  },
  // Read counts beside the date on posts and projects (features.viewCounts)
  viewCounts: {
    reads: (formatted, count) => `${formatted} ${count === 1 ? "read" : "reads"}`,
  },
  // The like button on posts and projects (features.likes)
  likes: {
    label: (count, kind) => `Like this ${kind}, ${count} ${count === 1 ? "like" : "likes"}`,
  },
  // Images in posts and projects that open in the photo viewer (features.imageZoom).
  // The viewer's own text is in gallery.viewer.labels
  imageZoom: {
    open: (alt) => (alt ? `View larger: ${alt}` : "View image larger"),
  },
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
  // Posts a project lists under `related`, and the card back on each post (features.relatedWriting)
  relatedWriting: {
    title: "Related writing",
    fromProject: "From the project",
  },
  // Links to the previous and next project (features.projectNavigation)
  projectNavigation: {
    label: "More projects",
    previous: "Previous project",
    next: "Next project",
  },
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Shown by search engines with each photo. year is the photo's year, or the current one
  copyrightNotice: (year) => `© ${year} ${person.name}`,
  // The full-screen viewer a photo opens in. Set display: false to enlarge one photo at a time instead
  viewer: {
    display: true,
    // ?photo=<file name> in the address bar, so a link opens that photo
    deepLink: true,
    // false serves the original files instead of resized copies (saves Vercel image quota)
    optimizeImages: true,
    labels: {
      dialog: "Photo viewer",
      open: (alt) => `View ${alt}`,
      close: "Close photo viewer",
      previous: "Previous photo",
      next: "Next photo",
      counter: (current, total) => `Photo ${current} of ${total}`,
      error: "Couldn't load this photo",
      retry: "Try again",
    },
  },
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  // Thumbnails keep each photo's proportions. Add orientation: "horizontal" or "vertical"
  // to crop one to 16 / 9 or 3 / 4 instead
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      // Optional: a name and year for search engines
      title: "Mountains above the clouds",
      year: "2024",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
    },
  ],
};

export { person, social, newsletter, backToTop, home, about, blog, work, gallery, search, footer };
