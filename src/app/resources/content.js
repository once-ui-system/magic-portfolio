import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Dave",
  lastName: "Latshaw II",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Pharmaceutical AI Architect",
  avatar: "/images/avatar.jpg",
  email: "hello@davelatshaw.com",
  location: "America/New_York", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I write about the future of pharmaceutical AI, lessons from building complex systems, and notes on resilient leadership.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/davelatshaw/",
  },
  {
    name: "X",
    icon: "x",
    link: "https://twitter.com/DaveLatshaw",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: (
    <>I believe the future of pharmaceutical innovation lies in AI systems that think across the entire drug development lifecycle, not just in narrow slices of it.</>
  ),
  featured: {
    display: false,
    title: <></>,
    href: "",
  },
  subline: (
    <>
      After building and scaling AI solutions at Johnson & Johnson and founding BioPhy, I've seen what works, what doesn't, and what's possible when we think bigger.<br />I'm {person.name}, and I'm working to accelerate the emergence of truly intelligent pharmaceutical systems.
    </>
  ),
};

const about = {
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
        Most people in pharmaceutical AI are solving yesterday's problems with tomorrow's technology. My journey from computational biophysics PhD to pharma AI leader has taught me that the industry's challenges are systemic—and systemic challenges require systemic solutions.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Johnson & Johnson",
        timeframe: "2014 - 2018",
        role: "Senior Scientist, Advanced Technologies Center of Excellence",
        achievements: [
          <>Implemented AI solutions across the drug development lifecycle.</>,
          <>Learned that individual solutions wanted to form a coherent system.</>,
        ],
        images: [],
      },
      {
        company: "BioPhy",
        timeframe: "2019 - 2023",
        role: "Co-founder & CEO",
        achievements: [
          <>Built a pharmaceutical intelligence platform sold to major pharma companies.</>,
          <>Generated millions in revenue and proved system-level AI could work.</>,
        ],
        images: [],
      },
      {
        company: "Portfolio Career",
        timeframe: "2024 - Present",
        role: "Advisor and Speaker",
        achievements: [
          <>Helping organizations implement AI-driven drug development.</>,
          <>Speaking and writing about the future of intelligent pharmaceutical systems.</>,
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
        name: "NC State University",
        description: <>PhD in Computational Biophysics.</>,
      },
      {
        name: "The Wharton School",
        description: <>MBA with focus on finance and operations.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Systems Architecture for Pharmaceutical AI",
        description: <>Designing modular knowledge graphs that connect discovery, development, clinical, and commercial functions.</>,
        images: [],
      },
      {
        title: "Cross-Functional Leadership",
        description: <>Hands-on experience leading R&D, sales, and operations in life sciences organizations.</>,
        images: [],
      },
      {
        title: "Strategic Vision",
        description: <>Crafting AI strategies that deliver commercial value today and discovery breakthroughs tomorrow.</>,
        images: [],
      },
    ],
  },
};

const expertise = {
  path: "/expertise",
  label: "Expertise",
  title: `Expertise – ${person.name}`,
  description: `Deep dive into ${person.name}'s pharmaceutical AI skills`,
  competencies: [
    {
      title: "Systems Architecture for Pharmaceutical AI",
      description: (
        <>During my time at BioPhy, we treated every function as part of a larger knowledge graph to shorten sales cycles and guide AI decisions.</>
      ),
    },
    {
      title: "Cross-Functional Leadership in Life Sciences",
      description: (
        <>I've led R&D, sales, and operations teams, learning that organizational barriers often limit AI adoption more than technology.</>
      ),
    },
    {
      title: "Strategic Vision for AI-Driven Drug Development",
      description: (
        <>Commercial and clinical applications will deliver ROI first, creating the foundation for discovery breakthroughs.</>
      ),
    },
  ],
};

const insights = {
  path: "/insights",
  label: "Insights",
  title: "Insights and Articles",
  description: `Thought leadership from ${person.name}`,
};

const speaking = {
  path: "/speaking",
  label: "Speaking",
  title: `Speaking – ${person.name}`,
  description: `Keynotes and presentations by ${person.name}`,
  topics: [
    {
      title: "The Pharma Agent Future",
      description:
        <>Building AI systems that think across the drug development lifecycle.</>,
    },
    {
      title: "Learning from Failure",
      description:
        <>What my startup's end taught me about resilience and innovation.</>,
    },
    {
      title: "Cross-Functional Leadership in the Age of AI",
      description:
        <>Why tomorrow's leaders must be fluent across technology, business, and domain expertise.</>,
    },
  ],
};

const advisory = {
  path: "/advisory",
  label: "Advisory",
  title: `Advisory – ${person.name}`,
  description: `Consulting and board services from ${person.name}`,
  offerings: [
    {
      title: "Strategic Advisory",
      items: [
        <>Evaluating and architecting AI strategies across the lifecycle.</>,
        <>Assessing build vs. buy vs. partner decisions.</>,
        <>Designing organizations able to adopt and scale AI.</>,
        <>Providing technical due diligence for AI investments.</>,
      ],
    },
    {
      title: "Board Positions",
      items: [
        <>Platform approaches to pharmaceutical AI.</>,
        <>Cross-functional pharmaceutical technologies.</>,
        <>Next-generation drug development tools.</>,
      ],
    },
    {
      title: "Consulting Engagements",
      items: [
        <>AI platform architecture and implementation.</>,
        <>Pharmaceutical commercial intelligence systems.</>,
        <>Cross-functional digital transformation in life sciences.</>,
        <>Turnaround strategies for struggling AI initiatives.</>,
      ],
    },
  ],
};

const connect = {
  path: "/connect",
  label: "Connect",
  title: `Connect – ${person.name}`,
  description: "Get in touch with me",
  text: (
    <>
      I'm always interested in connecting with leaders who are thinking differently about the future of drug development.<br />
      For Speaking Inquiries: <a href="mailto:speaking@davelatshaw.com">speaking@davelatshaw.com</a><br />
      For Advisory and Consulting: <a href="mailto:advisory@davelatshaw.com">advisory@davelatshaw.com</a><br />
      For Everything Else: <a href={`mailto:${person.email}`}>{person.email}</a><br />
      Based in: Philadelphia, PA<br />
      Working: Globally
    </>
  ),
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Insights on Pharmaceutical AI",
  description: `Read the latest perspectives from ${person.name}`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Case studies and projects led by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
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
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
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
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export {
  person,
  social,
  newsletter,
  home,
  about,
  expertise,
  insights,
  speaking,
  advisory,
  connect,
  blog,
  work,
  gallery,
};
