import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Lance",
  lastName: "Angeles",
  name: `Lance Allan Angeles`,
  role: "Strategy & Analytics Professional",
  avatar: "/images/avatar.jpg",
  email: "lanceallan206@gmail.com",
  location: "America/Los_Angeles",
  languages: ["English", "Spanish"],
  locale: "en",
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Insights on strategy, data science, and organizational transformation</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/la13",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/lance-allan",
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
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work in strategy, data science, and organizational impact`,
  headline: <>Strategy meets data-driven impact</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Boston Consulting Group</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/bcg-ai-accelerator",
  },
  subline: (
    <>
      I'm {person.firstName}, a strategy professional at <Text as="span" size="xl" weight="strong">BCG</Text>, where I drive <br /> organizational transformation through data science and strategic insights.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, Strategy Professional from Seattle, WA`,
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
        {person.firstName} is a strategy and analytics professional based in Seattle with expertise in organizational transformation, data science, and cross-functional leadership. With experience at Boston Consulting Group and Stanford, he combines econometric analysis with practical business acumen to drive measurable impact across Fortune 500 companies and emerging tech ventures.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Boston Consulting Group",
        timeframe: "July 2026 - Present",
        role: "Associate II (Tech & Telco)",
        achievements: [
          <>Scaled an AI accelerator for enterprise call center agents, streamlining build workflows and reducing time-to-deployment</>,
          <>Led cross-functional execution across 20+ stakeholders and 3 teams with improved end-to-end visibility</>,
          <>Delivered executive-ready reporting on agent development with insights on capability gaps and performance</>,
        ],
        images: [],
      },
      {
        company: "Boston Consulting Group",
        timeframe: "Aug 2025 - July 2026",
        role: "Associate I (Telco/Media/Tech & Consumer/Retail/Marketing)",
        achievements: [
          <>Led executive communications for org redesign with 100+ talking points and 20+ transition materials</>,
          <>Identified 8% reduction opportunities in sales FTE spend through structure analysis</>,
          <>Built go-to-market lead routing system managing 1.5M+ funnel with 33% conversion lift</>,
          <>Developed Python-based NLP model structuring 68K+ data points into skills taxonomy for 10K-employee workforce</>,
        ],
        images: [],
      },
      {
        company: "Snorkel AI",
        timeframe: "Aug 2024 - Nov 2024",
        role: "AI Knowledge Annotator",
        achievements: [
          <>Identified 5+ critical performance trends across economic concepts with model failure analysis</>,
          <>Improved model accuracy with 50-point economic stress-test identifying reasoning gaps</>,
        ],
        images: [],
      },
      {
        company: "Stanford Graduate School of Business",
        timeframe: "Feb 2024 - May 2024",
        role: "Research Assistant",
        achievements: [
          <>Led research and data collection for 5 firms analyzing corporate governance structures</>,
          <>Synthesized industry-wide reporting trends across 100+ organizations</>,
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
        name: "Stanford University",
        description: <>Master of Science in Computer Science - Deferred</>,
      },
      {
        name: "Stanford University",
        description: <>Bachelor of Arts in Economics - Hispanic Scholarship Fund Scholar (2020-21)</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Programming & Data Science",
        description: <>Python (NumPy, Pandas, SciPy), SQL, R, C++, C</>,
        tags: [
          { name: "Python", icon: "python" },
          { name: "SQL", icon: "sql" },
          { name: "R", icon: "r" },
        ],
        images: [],
      },
      {
        title: "Analytics & Business Intelligence",
        description: <>Excel, Tableau, STATA, Google BigQuery, Jupyter Notebook</>,
        tags: [
          { name: "Tableau", icon: "tableau" },
          { name: "Analytics", icon: "analytics" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about strategy and data science...",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Strategy and analytics projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };