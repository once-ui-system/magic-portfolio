import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Michael",
  lastName: "Anticoli",
  name: `Michael Anticoli`,
  role: "Creative Technologist, AI Content Strategist & Sonic Systems Architect",
  avatar: "/images/avatar.jpg",
  email: "michaelanticoli@gmail.com",
  location: "America/Los_Angeles", // IANA time zone for Los Angeles
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Insights on creative technology, AI systems, and sonic architecture</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/michaelanticoli",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/michael-anticoli",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
  {
    name: "MoonTuner",
    icon: "globe",
    link: "https://moontuner.xyz",
    essential: true,
  },
  {
    name: "Quantumelodies",
    icon: "globe",
    link: "https://quantumelodies.com",
    essential: false,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://instagram.com/quantumelodies",
    essential: false,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} – Creative Technologist & Sonic Systems Architect`,
  description: `Portfolio showcasing interdisciplinary work at the intersection of music, astrology, and intelligent systems design`,
  headline: <>Building bridges between sound, symbolism, and code</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Quantumelodic MetaSystem</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work", // Update this with specific project URL when created
  },
  subline: (
    <>
      I'm Michael, a creative technologist working at the <Text as="span" size="xl" weight="strong">intersection of music, astrology, and AI</Text>.<br />
      I build innovative frameworks that merge sound, symbolism, and computational logic into practical tools and immersive experiences.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Los Angeles, California`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com", // Update with your actual calendar link if you use Cal.com
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Michael Anticoli is a creative technologist and interdisciplinary strategist working at the 
        intersection of music, astrology, and intelligent systems design. He builds innovative 
        frameworks that merge sound, symbolism, and computational logic—most notably the 
        Quantumelodic MetaSystem—to translate complex metaphysical structures into practical tools 
        and immersive digital experiences. His work blends creative direction, technical architecture, 
        and conceptual storytelling to help brands and individuals communicate with clarity, 
        resonance, and emotional precision.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Independent Practice",
        timeframe: "2020 - Present",
        role: "Creative Technologist & AI Content Strategist",
        achievements: [
          <>
            Developed the Quantumelodic MetaSystem, a comprehensive framework merging music theory, 
            astrological symbolism, and AI-driven content generation to create personalized sonic 
            and narrative experiences.
          </>,
          <>
            Architected AI-assisted workflows for brands and creators, integrating generative AI tools 
            (OpenAI, Claude, Suno, Runway) to accelerate creative production and strategic messaging.
          </>,
          <>
            Designed and deployed web-based applications using Flask, Node.js, and Supabase for 
            interactive experiences and data-driven content platforms.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          // Add your project images here later
        ],
      },
      // Add more work experience entries here as needed
      // We'll populate these in Round 2
    ],
  },
  studies: {
    display: false, // set to true when you want to add education details
    title: "Studies",
    institutions: [
      // Add your education details here in Round 2
      // {
      //   name: "University Name",
      //   description: <>Studied [subject].</>,
      // },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical Skills & Expertise",
    skills: [
      {
        title: "AI-Assisted Content Architecture",
        description: (
          <>
            Designing and implementing generative AI workflows using OpenAI, Claude, Suno, and Runway 
            for content creation, brand strategy, and creative production.
          </>
        ),
        tags: [
          {
            name: "OpenAI",
            icon: "openai",
          },
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "API Integration",
            icon: "code",
          },
        ],
        images: [],
      },
      {
        title: "Sonic Architecture & Music Systems",
        description: (
          <>
            Music theory, sound design, and sonic branding through the Quantumelodic MetaSystem—
            translating astrological and symbolic structures into harmonic frameworks.
          </>
        ),
        tags: [
          {
            name: "Music Theory",
            icon: "music",
          },
          {
            name: "Sound Design",
            icon: "audio",
          },
        ],
        images: [],
      },
      {
        title: "Web Architecture & Development",
        description: (
          <>
            Building web applications with Flask, Node.js, Next.js, and Supabase. 
            Orchestrating full-stack experiences with Python backends and modern JavaScript frameworks.
          </>
        ),
        tags: [
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Supabase",
            icon: "supabase",
          },
        ],
        images: [],
      },
      {
        title: "Brand Strategy & Narrative Design",
        description: (
          <>
            Creative direction, messaging architecture, UX writing, and systems thinking for 
            brand storytelling and audience engagement.
          </>
        ),
        tags: [
          {
            name: "Strategy",
            icon: "strategy",
          },
          {
            name: "Content",
            icon: "document",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Thoughts on creative technology, AI, and sonic systems...",
  description: `Read what ${person.name} has been exploring recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Interdisciplinary projects merging sound, systems, and storytelling by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Visual explorations – ${person.name}`,
  description: `A visual collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
