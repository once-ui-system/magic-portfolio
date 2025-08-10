const person = {
  firstName: "Awais",
  lastName: "",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Remote Full-Stack Web Developer",
  avatar: "/images/avatar.jpg",
  email: "awaissmr@gmail.com",
  location: "Asia/Karachi",
  languages: ["English", "Sindhi", "Urdu"],
  about: (
    <>
      I’m a remote full-stack web developer with over 5 years of experience
      delivering high-quality, scalable, and secure web applications for
      international clients. I specialize in building modern web platforms using
      Next.js, React, and Node.js, with expertise in both frontend and backend
      development, API integrations, and VPS deployments.
    </>
  ),
};

const emailForm = {
  display: true,
  title: <>Send a message to {person.firstName}.</>,
  description: (
    <>
      Get in touch with {person.firstName} by sending a message below.
    </>
  ),
};

const social = [
  { name: "GitHub", icon: "github", link: "https://github.com/awaisssoomro" },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/awaisssoomro",
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@awais_soomro_",
  },
  { name: "Email", icon: "email", link: `mailto:${person.email}` },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: (
    <>
      Crafting high-quality web applications that merge functionality with great
      user experience
    </>
  ),
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className="ml-4">Get Optimise</strong>
      </>
    ),
    href: "/work/rate-my-cheer-gym",
  },
  subline: (
    <>
      I’m Awais, a full-stack developer with a focus on modern JavaScript
      frameworks and scalable backend solutions.
      <br /> I specialize in building products with Next.js, Supabase, and other
      cutting-edge tools.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} (${person.location})`,
  tableOfContent: { display: true, subItems: false },
  avatar: { display: true },
  calendar: { display: true, link: "https://cal.com" },
  intro: {
    display: true,
    title: "Introduction",
    description: person.about,
  },
  work: {
    display: true,
    title: "Work Experience & Projects",
    experiences: [
      {
        company: "Freelance — Upwork, Fiverr, Direct Contracts",
        timeframe: "2019 – Present",
        role: "Remote Full-Stack Web Developer",
        achievements: [
          <>
            Developed and delivered custom web applications for international
            clients across industries including travel, sports, and e-commerce.
          </>,
          <>
            Built secure, scalable systems integrating both frontend and backend
            using modern JavaScript frameworks and Python APIs.
          </>,
          <>
            Managed end-to-end deployment processes for production environments
            on VPS and dedicated servers.
          </>,
          <>
            Collaborated with designers and stakeholders to transform UI/UX
            wireframes into fully functional, responsive web platforms.
          </>,
          <>
            Maintained long-term client relationships by delivering projects on
            time, with ongoing maintenance and feature updates.
          </>,
        ],
        images: [],
      },
      {
        company: "Get Optimise",
        timeframe: "2024",
        role: "Full Stack Developer",
        achievements: [
          <>
            Built a data-driven web app enabling users to analyze and optimize
            website loading speeds, SEO metrics, and performance insights.
          </>,
          <>
            Developed frontend in <strong>Next.js</strong> with dynamic data
            visualization components.
          </>,
          <>
            Backend implemented using <strong>Node.js</strong> and{" "}
            <strong>Express</strong> with <strong>PostgreSQL</strong> for data
            storage.
          </>,
          <>
            Deployed on a VPS using <strong>Coolify</strong> with custom{" "}
            <strong>Nginx</strong> configuration for optimal performance.
          </>,
        ],
        images: [],
      },
      {
        company: "Rate My Cheer Gym",
        timeframe: "2024",
        role: "Full Stack Developer",
        achievements: [
          <>
            Created a responsive and user-friendly interface using{" "}
            <strong>Next.js</strong>.
          </>,
          <>
            Integrated <strong>Supabase</strong> for backend database and
            authentication.
          </>,
          <>Implemented location-based search and filtering for gyms.</>,
          <>Designed database schema for reviews, ratings, and gym details.</>,
        ],
        images: [],
      },
      {
        company: "Cruisly",
        timeframe: "2024",
        role: "Full Stack Developer",
        achievements: [
          <>
            Developed using <strong>Next.js</strong> and{" "}
            <strong>Supabase</strong> for backend database management.
          </>,
          <>
            Integrated the <strong>Widgety API</strong> to fetch real-time
            cruise data, itineraries, ship details, and pricing.
          </>,
          <>
            Implemented search, filtering, and booking flow with secure
            authentication.
          </>,
          <>Deployed on a VPS using custom deployment pipelines.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Comsats University Islamabad",
        description: <>Studying Computer Science.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Frontend",
        description: (
          <>Next.js, React, Vite, TypeScript, Tailwind CSS, styled-components</>
        ),
        images: [],
      },
      {
        title: "Backend",
        description: <>Node.js, Express, Flask (Python), FastAPI (Python)</>,
      },
      {
        title: "Databases",
        description: <>PostgreSQL, MySQL, Supabase, Drizzle ORM</>,
      },
      {
        title: "Authentication",
        description: <>Supabase Auth, Better Auth, JWT, OAuth</>,
      },
      {
        title: "DevOps & Deployment",
        description: (
          <>
            Linux server management, application deployment on VPS and dedicated
            servers using Coolify, custom deployment scripts, Nginx reverse
            proxy setup, Docker containerization
          </>
        ),
      },
      {
        title: "Other Tools",
        description: (
          <>
            Figma, Git/GitHub, REST API integrations, third-party SDKs, API
            documentation implementation, CI/CD workflows
          </>
        ),
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about development and tech...",
  description: `Read what ${person.name} has been building and learning recently`,
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Full-stack projects by ${person.name}`,
};

const activity = {
  path: "/activity",
  label: "Activity",
  title: `Activity – ${person.name}`,
  description: `Full-stack projects by ${person.name}`,
};

export { person, social, emailForm, home, about, blog, activity, work };
