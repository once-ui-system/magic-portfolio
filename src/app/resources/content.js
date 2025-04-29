import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Arnab",
  lastName: "Ghosh",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Student",
  avatar: "/images/avatar.jpg",
  location: "America/Los_Angeles", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Korean", "Spanish", "Bengali"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/arniber21",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/arnab-ghosh819/",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:arnabcare21@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Software Engineer / Student @ Cornell University</>,
  subline: (
    <>
      I'm Arnab, a student at Cornell University studying Computer Science and
      Mathematics pursuing a career in Software Engineering.
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
        Arnab is a Computer Science and Mathematics student at Cornell
        University with a passion for quantum computing, cryptography, and
        full-stack development. He has professional experience as a Software
        Development Intern at HRL Laboratories' Quantum Technology division and
        as a Software Engineer at Cornell CMSx. His technical expertise spans
        TypeScript, Java/Kotlin, Next.js, and Spring Boot, with specialized
        knowledge in post-quantum cryptography. As Education Lead for the
        Quantum Computing Association, he creates educational content and
        organizes events like the IBM Qiskit Fall Fest. His projects demonstrate
        skills in building secure, AI-enhanced applications.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "HRL Laboratories",
        timeframe: "Summer 2025",
        role: "Software Engineer Intern, Quantum Technology",
        achievements: [
          <>
            {" "}
            Develop, maintain, and optimize scientific software to assist
            quantum computing researchers in their work.
          </>,
        ],
        images: [],
      },
      {
        company: "Cornell CMSX",
        timeframe: "February 2025 - Present",
        role: "Software Engineer",
        achievements: [
          <>
            Develop and maintain CMSx, Cornell CS' in-house course management
            software.
          </>,
        ],
        images: [],
      },
      {
        company: "Cornell Quantum Computing Association",
        timeframe: "August 2024 - Present",
        role: "Education Lead",
        achievements: [
          <>
            Run QCA's education program. Primarily composed of the Fundamentals
            lecture series, which educates students on quantum computing
            fundamentals.
          </>,
          <>
            Develop, test, and deliver curricula, worksheets, presentations,
            certification quizzes, and other educational materials.
          </>,
          <>
            Organized Cornell's Qiskit Fall Fest 2024, featuring a variety of
            workshops on quantum computing via the Qiskit framework.
          </>,
        ],
        images: [],
      },
      {
        company: "CS 2110, Object-Oriented Programming and Data Structures",
        timeframe: "January 2025 - Present",
        role: "Consultant",
        achievements: [
          <>
            Grade assignments and exams, hold office hours, and provide feedback
            to students.
          </>,
          <>
            Assist course staff with discussion sections and student
            consultations.
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
        name: "Cornell University",
        description: (
          <ul>
            <li>Bachelor of Arts in Computer Science and Mathematics</li>
            <li>3.78 GPA with expected graduation in May 2028.</li>
            <li>
              Advanced coursework: Honors Object-Oriented Programming and Data
              Structures, Mathematical Foundations of CS, Computer Organization
              and Architecture.
            </li>
          </ul>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical Skills",
    skills: [
      {
        title: "Backend Development",
        description: (
          <>
            Proficient in Kotlin, Java, including frameworks such as Spring
            Boot, kTor, with experience in security, authentication,
            authorization, microservices, RESTful APIs, and database management.
          </>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Full Stack and Frontend Development",
        description: (
          <>
            Proficient in TypeScript, JavaScript, React, Remix, Next.js, tRPC,
            Turbo, and Tailwind.
          </>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
      {
        title: "Quantum Computing",
        description: (
          <>
            Proficient in quantum computing fundamentals, post-quantum
            cryptography, and quantum algorithms using the Qiskit framework.
          </>
        ),
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about my life...",
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
  images: [
    {
      src: "/images/gallery/IMG_0007.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0017.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0018.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0020.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0021.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0022.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0029.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0032.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0034.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0045.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0085.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0086.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0088.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0096.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0103.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0167.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0180.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0185.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0189.jpg",
      alt: "image",
    },
    {
      src: "/images/gallery/IMG_0198.jpg",
      alt: "image",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
