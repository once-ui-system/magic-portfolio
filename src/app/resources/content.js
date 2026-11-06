import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Mohamed",
  lastName: "Oucharrou",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Full-Stack & AI Software Engineer",
  avatar: "/images/avatar.png",
  location: "Africa/Casablanca", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  locationLabel: "Morocco",
  email: "oucharroumohameddev@gmail.com",
  phone: "+212 6 30 70 95 65",
  resume: {
    default: "en", // language shown on the main "Download CV" button
    files: [
      { lang: "en", label: "English", href: "/trademark/Mohamed_Oucharrou_CV_EN.pdf" },
      { lang: "fr", label: "Français", href: "/trademark/Mohamed_Oucharrou_CV_FR.pdf" },
    ],
  },
  languages: ["English", "French", "Arabic"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>I occasionally write about software engineering and AI.</>,
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/MohamedxOU",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/oucharrou-mohamed/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  label: "Home",
  title: `${person.name} | ${person.role}`,
  description: `Portfolio of ${person.name}, ${person.role}: multi-tenant LMS platforms, SaaS products and RAG-based AI features.`,
  headline: <>MOHAMED OUCHARROU</>,
  subline: (
    <>
      Final-year Software Engineering & AI student and full-stack developer. I build multi-tenant
      LMS and SaaS platforms, and lately AI features on top of them: RAG pipelines, hybrid
      search with pgvector and streaming LLM copilots.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.locationLabel}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: false, // no photo on the About page; location and languages move under the name
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
        I am a final-year (5th year) engineering student in Software Engineering & Artificial
        Intelligence at FST Errachidia, and a full-stack developer since 2023. Most of my work has
        been on learning platforms: I have designed, shipped and maintained several LMS products in
        production, including multi-tenant SaaS with Stripe billing, RBAC and analytics dashboards.
        <br />
        <br />
        In 2026 I built ArkonLMS at Arkon Systems, an LMS with an AI layer based on RAG: multilingual
        chunking and embeddings in PostgreSQL/pgvector, hybrid search with RRF fusion, grounded
        answers with citations, and a streaming student copilot.
        <br />
        <br />
        <InlineCode>What drives me?</InlineCode>
        <br />
        ⚡ Owning a product end to end: specs, architecture, development and deployment.
        <br />
        ⚡ Making LLM features reliable: grounded answers, citations, fewer hallucinations.
        <br />
        ⚡ Clean TypeScript codebases that stay maintainable as they grow.
      </>
    ),
  },
  work: {
    display: false, // shown on the dedicated /experience page; set to true to also list it here
    title: "Work Experience",
    experiences: [
      {
        company: "Arkon Systems LLC",
        timeframe: "Jul 2026 - Sep 2026",
        role: "Full-Stack & AI Engineering Intern, ArkonLMS",
        location: "Remote",
        achievements: [
          <>
            Designed and built ArkonLMS, a multi-tenant LMS (admin, teacher, student) with an AI
            layer based on RAG.
          </>,
          <>
            Built a multilingual RAG pipeline (Arabic, French, English): course material chunking,
            embeddings stored in PostgreSQL/pgvector, hybrid search with RRF fusion.
          </>,
          <>
            Added a relevance filter and citation extraction so answers stay grounded in the
            sources and hallucinations are limited.
          </>,
          <>
            Shipped a student copilot with streaming answers (SSE) and quiz generation grounded in
            course content, plus teacher tools for assisted course and quiz generation.
          </>,
        ],
        skills: ["TypeScript", "Bun", "ElysiaJS", "React", "PostgreSQL", "pgvector", "Drizzle", "Docker"],
        images: [],
      },
      {
        company: "NeuralMobi Ltd.",
        timeframe: "Jul 2025 - Oct 2025",
        role: "Front-End Developer Intern",
        location: "Remote",
        achievements: [
          <>Developed the FanRadars web administration interface with Vue.js.</>,
          <>Implemented user rights and roles management (RBAC) and the admin features around it.</>,
          <>Optimized admin-side performance and security; integrated REST APIs for data management.</>,
        ],
        skills: ["Vue.js", "REST APIs", "RBAC"],
        images: [],
      },
      {
        company: "Freelance",
        timeframe: "2023 - Present",
        role: "Full-Stack Developer",
        location: "Remote",
        achievements: [
          <>Designed and maintain several LMS platforms running in production.</>,
          <>
            Delivered multi-tenant SaaS products with Stripe billing, RBAC and analytics
            dashboards.
          </>,
          <>End-to-end ownership: requirements, architecture, development and deployment.</>,
        ],
        skills: ["Next.js", "React", "Node.js", "NestJS", "PostgreSQL", "Stripe", "Supabase"],
        images: [],
      },
      {
        company: "ATLAS TIMNAY",
        timeframe: "May 2024 - Jul 2024",
        role: "Desktop Developer Intern",
        location: "Morocco",
        achievements: [
          <>Developed a Point of Sale (POS) system for a retail business.</>,
          <>Designed the database schema and the cashier interface.</>,
        ],
        skills: ["C#", ".NET", "SQL"],
        images: [],
      },
      {
        company: "SHOTCOM",
        timeframe: "Jul 2023 - Aug 2023",
        role: "Web Developer Intern",
        location: "Morocco",
        achievements: [
          <>Developed a hotel website with an online booking module.</>,
          <>Implemented availability search, the booking workflow and the admin back-office.</>,
        ],
        skills: ["PHP", "MySQL", "HTML/CSS", "JavaScript"],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Faculty of Sciences and Techniques (FST) - Errachidia",
        description: (
          <>
            State Engineering Degree (Diplôme d'Ingénieur d'État), Software Engineering & AI{" "}
            <InlineCode>2024 - 2027</InlineCode>
          </>
        ),
      },
      {
        name: "Higher School of Technology (EST) - Meknes",
        description: (
          <>
            University Diploma of Technology (DUT), Computer Science <InlineCode>2022 - 2024</InlineCode>
          </>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Languages",
        description: <>TypeScript, JavaScript, Python, PHP, Java, C#.</>,
        tags: ["TypeScript", "JavaScript", "Python", "PHP", "Java", "C#"],
        images: [],
      },
      {
        title: "Frontend",
        description: (
          <>
            React and Next.js first, Vue.js when the project calls for it. TanStack Router, Tailwind
            CSS, clean responsive UIs.
          </>
        ),
        tags: ["React", "Next.js", "Vue.js", "TanStack Router", "Tailwind CSS", "HTML/CSS"],
        images: [
          {
            src: "/images/projects/next-projects/cover-next-01.png",
            alt: "Next.js LMS project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Backend",
        description: (
          <>
            Node.js and Bun runtimes with ElysiaJS, NestJS or Express. REST APIs and multi-tenant
            SaaS architecture.
          </>
        ),
        tags: ["Node.js", "Bun", "ElysiaJS", "NestJS", "Express", "REST APIs", "Multi-tenant SaaS"],
        images: [],
      },
      {
        title: "AI",
        description: (
          <>
            RAG pipelines, embeddings, vector and hybrid search with pgvector, LLM integration and
            SSE streaming.
          </>
        ),
        tags: ["RAG", "Embeddings", "pgvector", "Hybrid search", "LLM integration", "SSE streaming"],
        images: [],
      },
      {
        title: "Databases",
        description: <>PostgreSQL as the default, with Drizzle ORM. MySQL, MongoDB and Supabase.</>,
        tags: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Drizzle ORM"],
        images: [],
      },
      {
        title: "Tools & integrations",
        description: <>Stripe billing, LTI for LMS integrations, Dialogflow, Git/GitHub and Docker.</>,
        tags: ["Stripe", "LTI", "Dialogflow", "Git/GitHub", "Docker"],
        images: [],
      },
      {
        title: "Mobile (Flutter)",
        description: <>Cross-platform apps with Flutter and Dart.</>,
        tags: ["Flutter", "Dart"],
        images: [
          {
            src: "/images/projects/flutter-projects/cover-flutter-01.png",
            alt: "Flutter project",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Software projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const experience = {
  label: "Experience",
  title: "Experience",
  description: `Work experience and education of ${person.name}`,
  intro: (
    <>
      Internships and freelance work since 2023, mostly on learning platforms and SaaS products.
      The full CV is available as a PDF.
    </>
  ),
};

const contactPage = {
  label: "Contact",
  title: "Get in touch",
  description: `Contact ${person.name}`,
  intro: (
    <>
      Have a project in mind, an internship or a job opportunity, or just want to talk about LMS
      platforms and RAG? Send me a message and I will get back to you as soon as possible.
    </>
  ),
};

export { person, social, newsletter, home, about, work, experience, contactPage };
