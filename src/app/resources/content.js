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
  I'm Arnab Ghosh, a Computer Science and Mathematics student at Cornell University with a passion for building robust software systems that drive scientific research and deliver practical impact. My experience spans backend architecture, full-stack development, and AI-driven solutions, with a focus on unifying and scaling tools for quantum computing and next-generation platforms.
  <br /><br />
  At HRL Laboratories, I design and develop Python-based systems that bridge research and engineering. My work includes building full-stack applications for data accessibility, architecting DevOps pipelines, and creating infrastructure that unifies research workflows—helping accelerate quantum computing projects by 30%. From streamlining data pipelines to integrating automated testing and deployment, I focus on creating seamless, reliable, and scalable platforms for cutting-edge research.
  <br /><br />
  At Cornell CMSX, I enhance system reliability for 2,000+ students by developing backend services in Java and Jakarta EE, seamlessly integrated with React and TypeScript frontends. My work improves academic tools through modular design, performance optimizations, and user-focused features.
  <br /><br />
  Beyond professional roles, I've led impactful projects like Neurosphere (1st place, MongoDB, HackTech 2025) and Memoria (3rd place, OrbStack, HackMIT 2024), blending AI models and intuitive interfaces to solve real-world problems. As Education Lead at the Cornell Quantum Computing Association, I create learning materials and host events like the Qiskit Fall Fest to make quantum computing more approachable for students.
  <br /><br />
  I'm excited to bring my skills in backend systems, full-stack development, and infrastructure engineering to teams building transformative technology in quantum computing, AI, and beyond.
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
            Contributed to the design and architecture of full-stack applications that improved research data accessibility to support cutting-edge quantum computing projects, collaborating with cross-functional teams to gather requirements and iterate on software features.
          </>,
          <>
            Enhanced real-time data processing capabilities contributing to quantum computing research by designing and optimizing algorithms for high-performance data analysis in collaboration with researchers.
          </>,
          <>
            Accelerated quantum computing research workflows by 30% by architecting, writing, and maintaining robust Python applications, integrating automated testing and CI/CD pipelines.
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
            Enhanced system reliability and user satisfaction for 2,000+ students by developing and maintaining backend services with Java and Jakarta EE, ensuring seamless integration with React and TypeScript.
          </>,
          <>
            Streamlined user experience for faculty and students by collaborating with cross-functional teams to implement new features and refine UX workflows in response to evolving academic requirements.
          </>,
          <>
            Improved codebase maintainability and scalability by applying best practices such as modular design, automated testing, and code reviews across React, TypeScript, and Java.
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
            Led and expanded QCA's education program, reaching 10+ students through the Fundamentals lecture series, resulting in a 40% increase in student engagement with quantum computing concepts and technologies.
          </>,
          <>
            Developed and implemented comprehensive educational materials including interactive Python notebooks, curricula, and certification quizzes, improving student comprehension and retention of quantum computing fundamentals through hands-on coding exercises.
          </>,
          <>
            Orchestrated Cornell's Qiskit Fall Fest 2024, coordinating 5+ workshops and securing partnerships with industry leaders, resulting in successful training of 20+ students in quantum computing via the Qiskit framework.
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
            <li>3.87 GPA with expected graduation in May 2028.</li>
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
            Proficient in Python, Java, and Kotlin, with experience in building scalable backend services, 
            data processing pipelines, and DevOps infrastructure. Skilled in automated testing, CI/CD, 
            and microservices architecture.
          </>
        ),
        images: [],
      },
      {
        title: "Full Stack and Frontend Development",
        description: (
          <>
            Experienced in TypeScript, JavaScript, React, and Next.js for building modern web applications. 
            Skilled in integrating frontend frameworks with backend services, implementing responsive designs, 
            and creating intuitive user interfaces.
          </>
        ),
        images: [],
      },
      {
        title: "Quantum Computing",
        description: (
          <>
            Proficient in quantum computing fundamentals and implementation using the Qiskit framework. 
            Experience in developing quantum algorithms, building quantum computing educational materials, 
            and creating infrastructure for quantum research workflows.
          </>
        ),
        images: [],
      },
      {
        title: "Artificial Intelligence",
        description: (
          <>
            Experience in developing AI-powered applications and integrating machine learning models. 
            Skilled in building data processing pipelines for scientific research and implementing 
            computer vision solutions for medical imaging applications.
          </>
        ),
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
