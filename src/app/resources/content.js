import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Gina",
  lastName: "Horch",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Scrum Master and Full Stack Developer",
  avatar: "/images/GinaHeadShot.webp",
  location: "Australia/Perth", // Expecting the IANA time zone identifier
  languages: ["English", "German"], 
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/GinaHorch",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/gina-horch",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:social.insight.solutions@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Kaya, welcome to my Portfolio</>,
  subline: (
    <>
      I'm Gina, a certified Scrum Master and Full-Stack Developer passionate about empowering teams
      to deliver impactful solutions through Agile methodologies and scalable user-centred technology.
      Explore my portfolio to learn more about my work and skills.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
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
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
      <p>
        Gina is a skilled Scrum Master and Full-Stack Developer with a talent for driving collaboration, 
        fostering innovation, and delivering impactful solutions. Combining expertise in Agile methodologies 
        with technical proficiency in modern web technologies, Gina thrives in crafting scalable, user-centered 
        applications that solve real-world problems.
      </p>
      <p>
        Her strengths lie in leading teams to success through servant leadership, empowering cross-functional 
        collaboration, and aligning technical execution with business objectives. With a focus on continuous improvement, 
        she brings together her deep understanding of Agile principles and her hands-on experience in full-stack development 
        to deliver high-quality, adaptive solutions.
      </p>
      <p>
        From building responsive frontend interfaces to architecting robust backend systems, Gina is passionate about leveraging 
        technology to create meaningful, effective digital experiences.
      </p>
      </>
    ),
  },
  work: {
    display: false, // set to false to hide this section
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
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Skills Snapshot",
    description: (
      <>
      <p>
      By leveraging skills in technologies like React, Django, and Python alongside servant leadership principles, I drive collaboration and 
      deliver robust, user-focused solutions that align technical innovation with iterative, value-driven outcomes.
      </p>
      </>
    ),
    skills: [
      {
        title: "Agile Practices",
        description: <>Leading Agile teams as a certified Scrum Master, 
        focusing on delivering iterative value and fostering collaboration.</>,
        
        images: [
          {
            src: "/images/skills/ScrumMasterPoster.webp",
            alt: "Scrum Master Poster from Scrum.org",
            width: 400,
            height: 600,
          },
          {
            src: "/images/skills/Safe6-essential.webp",
            alt: "SAFe 6 framework - essential",
            width: 900,
            height: 400,
          },
        ],
      },
      {
        title: "React.js",
        description: <>Developing reusable and efficient UI components with React.js, focusing on 
        state management, hooks, and responsive design using TypeScript and modern 
        JavaScript.</>,
        
        images: [
          {
            src: "/images/skills/react.svg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: <>Building full-stack applications with Next.js, utilising server-side 
        rendering (SSR), static site generation (SSG), and API routes for 
        performance optimisation and scalability.</>,
        
        images: [
          {
            src: "/images/skills/nextjs.svg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Python & Django",
        description: <>Building scalable backend solutions with Django and integrating RESTful APIs for full-stack applications.</>,
        
        images: [
          {
            src: "/images/skills/backend.svg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "SQL",
        description: <>Designing and querying relational databases to support robust backend services.</>,

        images: [
          {
            src: "/images/skills/sql.svg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Testing",
        description: <>Proficient in testing API endpoints using Insomnia and writing automated tests to ensure 
        reliability and functionality in Python applications, focusing on backend robustness and error handling.</>,

        images: [
          {
            src: "/images/skills/testing.svg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "First Class Honours in Psychology",
        description: <>Studied psychology at Edith Cowan University.</>,
      },
      {
        name: "Certified SAFe® 6 Scrum Master (SSM)",
        description: <>Completed a two-day course on Lean-Agile principles and practices of the Scaled Agile Framework® (SAFe®) version 6.0.</>,
      },
      {
        name: "Professional Scrum Master (PSM I)",
        description: <>Completed the Scrum.org learning path and passed the PSM I certification exam, 
        demonstrating a deep understanding of Scrum principles and the ability to apply them to solve complex problems collaboratively.</>,
      },
    ],
  },
};

const agileResources = {
  label: "Agile Resources",
  title: "My Agile Resources",
  description: `Explore Agile content and resources used by ${person.name}`,
  // Create new Agile resources by adding a new .mdx file to app/agile/resources
  // All resources will be listed on the /agile route
};

const work = {
  label: "Projects",
  title: "My projects",
  description: `Explore projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const skills = {
  label: "Skills",
  title: "My technical skills",
  description: `A blend of technical expertise and Agile leadership by ${person.name}`,
  headline: <>Certified Scrum Master and Full-Stack Developer</>,
  subline: (
    <>
      As a Certified Scrum Master and Full Stack Developer, I bring a unique blend of technical expertise 
      and Agile leadership to every project. By leveraging skills in technologies like React, Django, and 
      Python alongside servant leadership principles, I drive collaboration and deliver robust, user-focused 
      solutions that align technical innovation with iterative, value-driven outcomes.
    </>
  ),
  images: [
    {
      src: "/images/skills/ScrumMasterPoster.webp",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/skills/SSM.svg",
      alt: "image",
      orientation: "horizontal",
    },   
  ],
};

export { person, social, home, about, agileResources, work, skills };
