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
  headline: <>Driven by Curiosity, Collaboration, and Continuous Improvement</>,
  subline: (
    <>
      Kaya, I'm Gina, a Scrum Master and Full-Stack Developer passionate about empowering teams
      to deliver impactful solutions through Agile methodologies and scalable user-centred technology.
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
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Agile Practices",
        description: <>Leading Agile teams as a certified Scrum Master, 
        focusing on delivering iterative value and fostering collaboration.</>,
        // optional: leave the array empty if you don't want to display images
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
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, home, about, blog, work, gallery };
