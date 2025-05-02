import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Carlos",
  lastName: "Vargas",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "https://github.com/varlopecar.png",
  email: "varlopecar@gmail.com",
  location: "Europe/Paris",
  languages: ["Spanish", "English", "French"],
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: (
    <>
      I occasionally write about software development, technology, and share thoughts on the intersection of
      engineering and innovation.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/varlopecar",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/varlopecar",
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
  title: `${person.name}&apos;s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Carlos Vargas</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">FORMA</strong></>,
    href: "/work/forma-ai-fitness-app",
  },
  subline: (
    <>
      Full-stack developer specializing in the modern JavaScript stack, with startup and open-source experience. Very eager to learn, strongly communicative, self-driven to solve and create.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About - ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Carlos is a software engineer based in Nice, France, with a passion for building innovative
        solutions that solve real-world problems. His work spans web development, mobile applications,
        and AI integration.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "neostore.cloud",
        timeframe: "Apr 2024 - Present",
        role: "Junior Software Engineer",
        achievements: [
          <>
            Automated pass creation with a bulk import tool using React, reducing manual input by 97% and saving 197+ hours/year.
          </>,
          <>
            Reduced client onboarding time by 8 hours/client by leading custom pass template designs for 5+ clients.
          </>,
          <>
            Integrated 3+ systems (Shopify, HubSpot, etc.) with Neostore.cloud by consuming various APIs to enable seamless interaction between platforms.
          </>,
        ],
        images: [],
      },
      {
        company: "Inria",
        timeframe: "Aug 2022 - May 2023",
        role: "Frontend Engineer Intern",
        achievements: [
          <>
            Migrated a web-app from JavaScript to TypeScript, reducing bugs by 30% and improving long-term code maintainability.
          </>,
          <>
            Accelerated feature development by 66% by leveraging modern React ecosystem tools, including Redux, React Query, and Zustand for state and data management optimization.
          </>,
        ],
        images: [],
      },
      {
        company: "Wicode",
        timeframe: "Feb 2022 - June 2022",
        role: "Frontend Engineer Intern",
        achievements: [
          <>
            Built and deployed 5+ responsive sites using Vite and Next.js, reducing average page load time from 8s to under 1.8s.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Sophia Ynov Campus",
        description: <>Master&apos;s Degree in Web Development (Expected October 2025)<br />Majors: Web Dev, AI & Machine Learning</>,
      },
      {
        name: "Universidad Tecnológica de Leon y Université Grenoble Alpes",
        description: <>Bachelor&apos;s Degree in Computer Science (Aug 2020 - Aug 2023)<br />Majors: Software Engineering & Architecture<br />Minors: Mobile/Web Dev</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Frontend Development",
        description: <>TypeScript, React, Vite, React Native (Expo), Next.js, Tailwind, MUI</>,
        images: [],
      },
      {
        title: "AI Integration",
        description: <>Vercel AI SDK, AI-based personalization</>,
        images: [],
      },
      {
        title: "Backend Development",
        description: <>Node.js, Express, PostgreSQL, MongoDB, Supabase, Python, Django</>,
        images: [],
      },
      {
        title: "Tools & DevOps",
        description: <>Git/GitHub, Azure Insights, CI/CD, Package managers (npm, pnpm, yarn)</>,
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
  description: `A collection of ${person.name}&apos;s work`,
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

export { person, social, newsletter, home, about, blog, work, gallery };
