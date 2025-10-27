import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Mohammed",
  lastName: "AlGhussein",
  name: `Mohammed AlGhussein`,
  role: "Full Stack Developer & Digital Marketer",
  avatar: "/images/avatar.jpg",
  email: "mogh166@gmail.com",
  location: "Europe/Istanbul", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Arabic (عربي)", "English", "Turkish"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Insights from {person.firstName}</>,
  description: <>Stay up to date with web, automation, and growth strategies.</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/madoharb/",
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/MadoHarb",
  },
  {
    name: "WhatsApp",
    icon: "whatsapp",
    link: "https://wa.me/905373718535",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} – Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building revenue-driving web products & growth systems</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Selected work</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Case studies
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      I'm Mohammed, a hands-on full stack developer and marketer based in Istanbul.
      <br />I build high-converting websites, automation, and growth programs for founders,
      agencies, and property portfolios.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} based in Istanbul, Turkey`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Mohammed is a full stack developer, digital marketer, and entrepreneur who turns business
        goals into measurable outcomes. Based in Istanbul, he blends web development, automation,
        and property management know-how to help companies launch products, scale acquisition
        funnels, and deliver memorable customer experiences.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "ProjeLife",
        timeframe: "2022 – Present",
        role: "Co-Founder & Manager",
        achievements: [
          <>
            Manage end-to-end digital marketing and web development engagements for clients across
            Turkey and the Gulf.
          </>,
          <>
            Lead Airbnb property management operations, coordinating service partners and customer
            communications for high guest satisfaction.
          </>,
          <>
            Direct cross-functional teams on SEO, automation, and analytics initiatives that grow
            client acquisition pipelines.
          </>,
        ],
        images: [],
      },
      {
        company: "Honey Bee Clever",
        timeframe: "2020",
        role: "Web Developer",
        achievements: [
          <>
            Planned and executed digital marketing, SEO, and social media strategies aligned with
            business goals.
          </>,
          <>
            Designed, developed, and maintained the company website and landing pages to improve
            conversions.
          </>,
          <>
            Coordinated lead generation campaigns and delivered performance reports to stakeholders.
          </>,
        ],
        images: [],
      },
      {
        company: "Ural Medical / Viskolove",
        timeframe: "2021",
        role: "Web Developer & B2B Platform Builder",
        achievements: [
          <>
            Developed corporate and brand websites that strengthened the organization’s digital
            presence.
          </>,
          <>
            Built and managed the B2B platform to streamline partner onboarding and collaboration.
          </>,
          <>
            Produced multilingual content tailored to both corporate and B2B audiences.
          </>,
        ],
        images: [],
      },
      {
        company: "Fanar Realty",
        timeframe: "2018 – 2019",
        role: "Digital Marketing Director & Web Developer",
        achievements: [
          <>
            Directed full-funnel digital marketing campaigns that boosted the brand’s online reach
            and lead generation.
          </>,
          <>
            Developed and maintained web properties, elevating user experience for property
            investors.
          </>,
          <>
            Authored data-driven marketing plans and optimized CRM processes to improve conversion
            rates.
          </>,
        ],
        images: [],
      },
      {
        company: "Pal-Think for Strategic Studies",
        timeframe: "2017 – 2018",
        role: "Project Coordinator",
        achievements: [
          <>
            Coordinated cross-functional teams to deliver reconciliation and civic engagement
            programs on deadline.
          </>,
          <>
            Managed digital content and campaign reporting across web, email, and social channels.
          </>,
          <>
            Maintained large contact databases and documentation to support grant compliance.
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
        name: "Istanbul Aydin University",
        description: <>MBA in Business Administration, 2020.</>,
      },
      {
        name: "University of Palestine",
        description: <>BSc in Information Technology, 2013 – 2017.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Full-stack web development",
        description: (
          <>Design and build responsive websites, web apps, and e-commerce experiences aligned with business goals.</>
        ),
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
          {
            name: "TypeScript",
          },
          {
            name: "React",
          },
          {
            name: "PHP",
          },
          {
            name: "Laravel",
          },
          {
            name: "WordPress",
          },
          {
            name: "SQL",
          },
        ],
        images: [],
      },
      {
        title: "Digital marketing & growth",
        description: (
          <>Plan and execute SEO, paid campaigns, and content strategies that generate qualified leads and conversions.</>
        ),
        tags: [
          {
            name: "SEO",
          },
          {
            name: "Content Marketing",
          },
          {
            name: "Social Media",
          },
          {
            name: "Analytics",
          },
        ],
        images: [],
      },
      {
        title: "Automation & AI tooling",
        description: (
          <>Automate workflows with AI platforms, no-code tools, and integrations that keep teams moving fast.</>
        ),
        tags: [
          {
            name: "ChatGPT",
          },
          {
            name: "Zapier",
          },
          {
            name: "Make.com",
          },
          {
            name: "n8n",
          },
        ],
        images: [],
      },
      {
        title: "Cloud & operations",
        description: (
          <>Deploy on AWS, GCP, and VPS providers while managing domains, hosting, and secure infrastructure.</>
        ),
        tags: [
          {
            name: "AWS",
          },
          {
            name: "GCP",
          },
          {
            name: "Docker",
          },
          {
            name: "Linux Administration",
          },
          {
            name: "Cloudflare",
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
  title: "Insights on web, growth, and automation",
  description: `Read what ${person.name} has been building and learning lately`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Web, marketing, and automation projects delivered by ${person.name}`,
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
