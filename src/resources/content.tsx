import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Mindsend",
  lastName: "Datatech",
  name: "Mindsend Datatech",
  role: "Applied engineering and data science team building robust software, AI integrations, and digital infrastructure.",
  avatar: "/images/avatar.png",
  email: "info@mindsend.xyz",
  location: "America/Sao_Paulo", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Portuguese"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/mindsend-datatech",
  },
];

const home: Home = {
  path: "/",
  image:
    "https://opengraph.b-cdn.net/production/images/c53b648f-c423-4882-b67f-b10117ea61e5.jpg?token=-m4wfD7XKjkhxfcKZRbRrPyQYbCEX3VdsTSShF51NbY&height=630&width=1200&expires=33295179384",
  label: "Home",
  title: `${person.name}`,
  description:
    `${person.name}`,
  headline: <>Just beyond human </>,
  featured: {
    display: false,
    title: (
      <>
        Recent project: <strong className="ml-4">Kadena Cabinet</strong>
      </>
    ),
    href: "/work/cabinet",
  },
  subline: (
    <>
      Transforming complex challenges into accessible, seamless solutions for
      frontier technologies{" "}
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet the ${person.name} crew`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/mindsend",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32' }}>
        <Text variant="body-default-l" onBackground="neutral-strong" style={{ fontSize: '1.5rem', lineHeight: '1.6', margin: 0 }}>
          We are an applied engineering and data science team focused on building robust, scalable
          software and AI integrations for modern systems. With deep technical foundations across infrastructure,
          backend development, and data architecture, we turn complex challenges into
          streamlined, production-ready solutions.
        </Text>
        <Text variant="body-default-l" onBackground="neutral-strong" style={{ fontSize: '1.5rem', lineHeight: '1.6', margin: 0 }}>
          Our objective is to deliver practical, secure digital infrastructure that scales.
          Whether designing data pipelines, developing applications, or deploying machine learning models,
          our focus remains on engineering excellence and sustainable software architecture.
        </Text>
      </div>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Our team",
    experiences: [
      {
        company: "Ariel Serranoni",
        timeframe: " ",
        role: "Co-founder, Applied Mathematician & Software Engineer",
        linkedin: "https://www.linkedin.com/in/ariel-serranoni-1b762815a/",
        github: "https://github.com/aserranoni/",
        achievements: [
          "Ariel is an applied mathematician with a Master’s in Computer Science and a strong background in software architecture. With solid mathematical foundations, he focuses on designing, building, and scaling complex backend infrastructure, decentralized protocols, and modern Web applications.",
        ],
        images: [
          {
            src: "/images/og/ariel.jpg",
            alt: "Ariel Serranoni",
            width: 1,
            height: 1
          }
        ]
      },
      {
        company: "Francisco Miranda",
        timeframe: " ",
        role: "Co-founder, Data Scientist & Software Engineer",
        linkedin: "https://www.linkedin.com/in/chicodias/",
        github: "https://github.com/chicodias",
        achievements: [
          "Francisco brings analytical rigor and a systematic approach to software development. With a background in Statistics and Data Science and an ongoing MBA in Software Engineering, he excels at structuring data pipelines, designing backend infrastructure, and bridging analytical models with production-ready applications.",
        ],
        images: [
          {
            src: "/images/og/chico.jpg",
            alt: "Francisco Miranda",
            width: 1,
            height: 1
          }
        ]
      },
    ],
  },
  studies: {
    display: false, // set to false to hide this section
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
    title: "Our Stack",
    skills: [
      {
        title: "Pact",
        description: "Smart contract language for Kadena.",
        images: [{ src: "/icons/pact.svg", alt: "Pact", width: 48, height: 48 }],
        link: "https://kadena.io/pact"
      },
      {
        title: "Solidity",
        description: "Smart contract language for Ethereum.",
        images: [{ src: "/icons/solidity.svg", alt: "Solidity", width: 48, height: 48 }],
        link: "https://soliditylang.org/"
      },
      {
        title: "TypeScript",
        description: "Main programming language for frontend and backend.",
        images: [{ src: "/icons/typescript.svg", alt: "TypeScript", width: 48, height: 48 }],
        link: "https://www.typescriptlang.org/"
      },
      {
        title: "Next.js",
        description: "Framework for building React applications.",
        images: [{ src: "/icons/nextdotjs.svg", alt: "Next.js", width: 48, height: 48 }],
        link: "https://nextjs.org/"
      },
      {
        title: "Vercel",
        description: "Platform for deployment and hosting.",
        images: [{ src: "/icons/vercel.svg", alt: "Vercel", width: 48, height: 48 }],
        link: "https://vercel.com/"
      },
      {
        title: "C#",
        description: "Backend programming language.",
        images: [{ src: "/icons/dotnet.svg", alt: "C#", width: 48, height: 48 }],
        link: "https://learn.microsoft.com/en-us/dotnet/csharp/"
      },
      {
        title: "PostgreSQL",
        description: "Relational database management system.",
        images: [{ src: "/icons/postgresql.svg", alt: "PostgreSQL", width: 48, height: 48 }],
        link: "https://www.postgresql.org/"
      },
      {
        title: "MongoDB",
        description: "NoSQL database management system.",
        images: [{ src: "/icons/mongodb.svg", alt: "MongoDB", width: 48, height: 48 }],
        link: "https://www.mongodb.com/"
      },
      {
        title: "Python",
        description: "General-purpose programming language.",
        images: [{ src: "/icons/python.svg", alt: "Python", width: 48, height: 48 }],
        link: "https://python.org"
      },
      {
        title: "R",
        description: "Language for statistical computing.",
        images: [{ src: "/icons/r.svg", alt: "R", width: 48, height: 48 }],
        link: "https://www.r-project.org/"
      },
      {
        title: "Linux",
        description: "Open-source operating system.",
        images: [{ src: "/icons/linux.svg", alt: "Linux", width: 48, height: 48 }],
        link: "https://www.kernel.org/"
      },
      {
        title: "Docker",
        description: "Platform for containerized applications.",
        images: [{ src: "/icons/docker.svg", alt: "Docker", width: 48, height: 48 }],
        link: "https://www.docker.com/"
      },
      {
        title: "TailwindCSS",
        description: "Utility-first CSS framework.",
        images: [{ src: "/icons/tailwindcss.svg", alt: "TailwindCSS", width: 48, height: 48 }],
        link: "https://tailwindcss.com"
      },
      {
        title: "Github",
        description: "Platform for code hosting and version control.",
        images: [{ src: "/icons/github.svg", alt: "Github", width: 48, height: 48 }],
        link: "https://github.com"
      },
      {
        title: "WalletConnect",
        description: "Protocol for connecting dApps to mobile wallets.",
        images: [{ src: "/icons/walletconnect.svg", alt: "WalletConnect", width: 48, height: 48 }],
        link: "https://walletconnect.network"
      },
      {
        title: "Git",
        description: "Distributed version control system.",
        images: [{ src: "/icons/git.svg", alt: "Git", width: 48, height: 48 }],
        link: "https://git-scm.com/"
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Building at the edge of technology",
  description: `Insights, deep dives, and lessons from ${person.name} on building AI integrations, infrastructure, and real-world software applications.`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Projects by ${person.name}`,
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
      src: "/images/hero.png",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
