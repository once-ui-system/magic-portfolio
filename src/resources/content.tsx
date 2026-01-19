import type {
  About,
  Blog,
  Gallery,
  Home,
  Newsletter,
  Person,
  Social,
  Work,
} from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Alan",
  lastName: "Cisneros",
  name: "Alan Cisneros",
  role: " Product Experience Strategist",
  avatar: "/images/avatar.jpg",
  email: "alancisgon@gmail.com",
  location: "America/Mazatlan", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Spanish", "English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/AlanCisGon",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/alancisgon/",
    essential: true,
  },

  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} | Product Designer & Strategist`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Hi, I'm {person.firstName}</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Coppel Helix</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/project-helix",
  },
  subline: (
    <>
      A product designer at{" "}
      <Text as="span" size="xl" weight="strong">
        Coppel
      </Text>
      , with 8+ years creating exceptional digital experiences. <br /> Focused
      in{" "}
      <Text as="span" size="xl" weight="strong">
        eCommerce, Banking, and User Research
      </Text>
      . <br /> Solving real user problems through design.
    </>
  ),
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
    link: "https://cal.com/alan-cisneros-phqijd/15min",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Strategic UX & Service Design Leader with 8+ years of experience
        designing and scaling digital experiences across eCommerce, finance, and
        omnichannel ecosystems. Recognized for bridging user research, design
        strategy, and business impact, leading distributed multidisciplinary
        teams through data-driven design operations. Combines a strong
        background in Design Systems, UX maturity, and agile transformation,
        with a human-centered leadership style that fosters autonomy, clarity
        and measurable outcomes.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Coppel",
        timeframe: "2022 - Present",
        role: "UX Design Lead — Purchase & Payments",
        achievements: [
          "Led bottom-funnel redesign and Salesforce Commerce Cloud implementation, improving conversion and checkout performance (+12% est.)",
          "Designed and launched digital services: Motorcycle Insurance, Extended Warranties, and Recurrent Shipping (Web & App). (+25% up avg. ticket)",
          "Established UX Writing Strategy for credit card BIN logic, reducing Dynamic CVV2 rejects. (-60% down rejection)",
          "Championed adoption of Design System standards across “Coppel Soluciones” landing pages and in-store systems. (+80% adoption across operative teams)",
          "Implemented UX metrics governance, tracking usability, accessibility, NPS, CSAT, TCR, and drop-off rate improvements.",
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/helix/inner-cover.webp",
            alt: "Coppel, Checkout Flow Redesign",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Coppel",
        timeframe: "2020 - 2022",
        role: "UX Researcher — eCommerce New Customers",
        achievements: [
          "Designed and institutionalized Heuristic Evaluation and Contribution Process frameworks across the UX team.",
          "Conducted UX Research for the Digital Credit Application (100% online acquisition).",
        ],
        images: [],
      },
      {
        company: "Onikom Systems",
        timeframe: "2019 - 2020",
        role: "Design & Research Team Lead — UX/UI",
        achievements: [
          "Introduced Lean UX and Validation Onion methods.",
          "Designed and taught Lean UX internal course.",
          "Delivered UX design for major clients: Movistar MX, CFE Contigo, Nadro.",
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
        name: "Universidad Nacional Autónoma de México (UNAM)",
        description: "Bachelor's Degree - Design & Visual Communication.",
      },
      {
        name: "Sperientia",
        description: "Service Design & Jobs-to-be-Done Methodologies.",
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Design Leadership & Operations",
        description: "Team management, UX governance, design process scaling",
        tags: [
          {
            name: "Team Leadership",
            icon: "lead",
          },
          {
            name: "Jira",
            icon: "jira",
          },
          {
            name: "Confluence",
            icon: "confluence",
          },
          {
            name: "Notion",
            icon: "notion",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Design & Prototyping",
        description:
          "User interface design, tokens, UI component libraries, design documentation",
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
          {
            name: "Adobe Photoshop",
            icon: "photoshop",
          },
          {
            name: "Adobe Illustrator",
            icon: "illustrator",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Research & Analytics",
        description:
          "Heuristic analysis, A/B testing, accessibility, usability, quantitative UX metrics",
        tags: [
          {
            name: "Google Analytics",
            icon: "analytics",
          },
          {
            name: "Maze",
            icon: "maze",
          },
          {
            name: "Hotjar",
            icon: "hotjar",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Web Development",
        description:
          "Creation and maintenance of websites and web applications using front-end and back-end technologies",
        tags: [
          {
            name: "NextJS",
            icon: "nextjs",
          },
          {
            name: "React",
            icon: "react",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
          {
            name: "GitHub",
            icon: "github",
          },
          {
            name: "Tailwind CSS",
            icon: "tailwind",
          },
          {
            name: "Vercel",
            icon: "vercel",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Generative AI & Design Innovation",
        description:
          "Actively integrating **Generative AI** tools and methodologies into UX strategy, research, and design operations, focused on augmenting creativity, speed, and decision-making across product teams while maintaining human-centered integrity.",
        tags: [
          {
            name: "Gemini AI",
            icon: "gemini",
          },
          {
            name: "ChatGPT",
            icon: "chatgpt",
          },
          {
            name: "Perplexity",
            icon: "perplexity",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [],
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
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
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
