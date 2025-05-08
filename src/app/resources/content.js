import { Logo } from "@/once-ui/components"

const person = {
  firstName: "Clement",
  lastName: "Cardona",
  get name() {
    return `${this.firstName} ${this.lastName}`
  },
  role: "Frontend Developer",
  avatar: "https://clecardona.eu/assets/avatar.png",
  email: "clecardona@gmail.com",
  location: "Sweden/Stockholm", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Swedish", "French"],
}

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: <>_</>,
}

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/clecardona",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/clecardona/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
  {
    name: "Download my CV",
    icon: "document",
    link: `https://clecardona.eu/assets/CV_clement_cardona.pdf`,
  },
]

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className='ml-4'>Once UI</strong>
      </>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      xxx
      <Logo
        icon={false}
        style={{ display: "inline-flex", top: "0.25em", marginLeft: "-0.25em" }}
      />
      , where I craft intuitive
      <br /> user experiences. After hours, I build my own projects.
    </>
  ),
}
const baseUrl = "https://clecardona.eu/assets/tech/"
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
    display: false,
    link: "_",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Highly curious and creative Front End Developer with a passion for
        teamwork and collaboration. I have specialized in React and TypeScript,
        delivering solutions that enhance user experiences. My long-term goal is
        to grow as a Front End Developer, continuously learning new
        technologies, including AI advancements, and adopting best practices to
        ensure I remain adaptable and effective in the ever-evolving tech
        landscape.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Folksam",
        timeframe: "2022 - Present",
        role: "Frontend developer",
        achievements: [
          <>
            I developed and maintained a part of the logged-in pages for
            Folksam&apos;s private clients, ensuring a responsive website
            optimized for both desktop and mobile devices. The pages had 9.7
            millions visits a year with 1.7 millions unique connections.
          </>,
          <>
            I collaborated with Front End, Back End developers, UI/UX Designer
            and a Product Owner in an Agile environment, following the SAFe
            framework.
          </>,
          <>
            I implemented pages and flows with forms and worked with tracking,
            accessibility, logs.
          </>,
          <>
            I contributed to the development of the internal Design System
            library.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Novare Potential Academy ",
        description: (
          <>
            5 months bootcamp with focus on Frontend <br /> React.js, Firebase
            hosting
          </>
        ),
      },
      {
        name: "Software Development Academy - Novare Potential x KTH",
        description: <>4 months bootcamp kickoff Frontend and Backend</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "React",
        description: <>4 years experience.</>,
        images: [
          {
            src: baseUrl + "react.svg",
            alt: "react",
          },
        ],
      },
      {
        title: "Javascript, Typescript",
        description: <>4 years experience.</>,
        images: [
          {
            src: baseUrl + "javascript.svg",
            alt: "Javascript",
          },
          {
            src: baseUrl + "typescript.svg",
            alt: "Typescript",
          },
        ],
      },
      {
        title: "CSS , Sass, Scss",
        description: <>Basic and advanced stylesheets languages.</>,
        images: [
          {
            src: baseUrl + "css.svg",
            alt: "CSS",
          },
          {
            src: baseUrl + "sass.svg",
            alt: "Sass",
          },
        ],
      },
      {
        title: "Vite, Next",
        description: (
          <>
            • I have participated to the migration of a complex project from CRA
            to Vite.
            <br />• I have developed small projects based on Next.js
          </>
        ),
        images: [
          {
            src: baseUrl + "vite.svg",
            alt: "vite",
          },
          {
            src: baseUrl + "next.png",
            alt: "next",
          },
        ],
      },
      {
        title: "Testing : Jest, Testing Library, Cypress",
        description: (
          <>
            • I have written unit test with Jest or Vitest.
            <br />• I have written UI test with React Testing Library
            <br />• I have written simple end to end tests with Cypress
          </>
        ),
        images: [
          {
            src: baseUrl + "jest.svg",
            alt: "jest",
          },
          {
            src: baseUrl + "testing_library.png",
            alt: "testing library",
          },
          {
            src: baseUrl + "cypress.svg",
            alt: "cypress",
          },
        ],
      },
      {
        title: "Redux",
        description: (
          <>
            I worked on projects using redux, and also migrate state management
            to React context.
          </>
        ),
        images: [
          {
            src: baseUrl + "redux.svg",
            alt: "redux",
          },
        ],
      },
      {
        title: "Figma",
        description: <>Able to prototype in Figma.</>,
        images: [
          {
            src: baseUrl + "figma.svg",
            alt: "Figma",
          },
        ],
      },
      {
        title: "Storybook",
        description: <>I participated in an internal component library.</>,
        images: [
          {
            src: baseUrl + "storybook.png",
            alt: "storybook",
          },
        ],
      },
      {
        title: "Openshift",
        description: (
          <>
            I participated to the migration of frontend applications to
            Openshift.
          </>
        ),
        images: [
          {
            src: baseUrl + "openshift.svg",
            alt: "Openshift",
          },
        ],
      },
      {
        title: "Firebase",
        description: (
          <>
            I developed projects based on Google Firebase solutions: hosting,
            database etc.
          </>
        ),
        images: [
          {
            src: baseUrl + "firebase.svg",
            alt: "firebase",
          },
        ],
      },
      {
        title: "Java",
        description: (
          <>
            I have a basic understanding of the Java language and the Springboot
            framework.
          </>
        ),
        images: [
          {
            src: baseUrl + "java.svg",
            alt: "java",
          },
          {
            src: baseUrl + "spring.svg",
            alt: "springboot",
          },
        ],
      },
    ],
  },
}

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
}

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
}

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
}

export { about, blog, gallery, home, newsletter, person, social, work }
