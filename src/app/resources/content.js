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
  I'm Arnab Ghosh, a Computer Science and Mathematics student at Cornell University with a passion for building robust software systems that drive scientific research and deliver practical impact. My experience spans backend architecture, full-stack development, and AI-driven solutions, with a focus on high-performance systems and scalable infrastructure for cutting-edge platforms.
  <br /><br />
  At HRL Laboratories, I architect and maintain critical full-stack applications for quantum computing research infrastructure using Python and Vue.js. My work includes improving application performance by 50% through Redis integration, leading containerization efforts with Docker and nginx, and implementing secure AI solutions—all while collaborating with cross-functional research teams to streamline experimental workflows.
  <br /><br />
  At Cornell CMSx, I engineer high-throughput backend optimizations for a distributed course management platform serving 10,000+ concurrent users. Working with Java, Jakarta EE, and React/TypeScript, I've achieved 14% performance improvements through database optimization and custom JPA concurrency handling, while modernizing legacy systems and shipping enterprise-scale features spanning 10,000+ lines of code.
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
            Architected and maintained a critical full-stack web application managing quantum computing research infrastructure using Python and Vue.js, serving researchers across multiple teams while developing interactive analysis dashboards with dynamic graphs and real-time performance metrics.
          </>,
          <>
            Improved application performance by 50% by designing and implementing a comprehensive Redis integration strategy, serving as both persistent database and intelligent caching layer for high-frequency operations, while leading containerization efforts with custom Docker configurations and nginx setup for secure deployments.
          </>,
          <>
            Implemented secure AI integration by self-hosting and integrating large language models within organizational infrastructure, providing scientists and developers with intelligent assistant capabilities while maintaining strict data privacy and security protocols required for sensitive IP environments.
          </>,
          <>
            Collaborated with cross-functional research teams to gather requirements, iterate on software features, and deliver robust solutions that enhanced data accessibility and streamlined experimental workflows across quantum computing projects.
          </>,
        ],
        images: [],
      },
      {
        company: "Cornell CMSx",
        timeframe: "February 2025 - Present",
        role: "Software Engineer",
        achievements: [
          <>
            Engineered high-throughput backend optimizations for Cornell's distributed course management platform serving 10,000+ concurrent users by implementing database transaction optimizations and custom JPA concurrency handling at critical API endpoints, achieving up to 14% performance improvements while enhancing error handling across Java and Jakarta EE services under peak load conditions.
          </>,
          <>
            Architected and shipped enterprise-scale features including a comprehensive rubric grading system spanning 10,000+ lines of code, seamlessly integrating with legacy JSP infrastructure, React/TypeScript frontend, and Java backend while ensuring compliance with FERPA regulations and academic requirements.
          </>,
          <>
            Modernized frontend architecture by overhauling API request patterns between React frontend and Java backend, implementing newer technologies to deliver mobile-friendly, intuitive interfaces that significantly improved application responsiveness and platform engagement.
          </>,
          <>
            Led legacy system modernization and quality assurance by developing end-to-end testing frameworks, consulting on UX improvements, and actively porting legacy JSP code to modern React components while maintaining compliance with academic regulations and system reliability.
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
              Advanced coursework: Computer Architecture, Programming Languages and Logics, Honors Object-Oriented Programming and Data Structures.
            </li>
            <li>
              TA for CS 2112 (Hon. OO Programming and Data Structures), Consultant for CS 2110 (OO Programming and Data Structures).
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
        title: "Backend & Systems Development",
        description: (
          <>
            Proficient in Java, Python, and C++ with expertise in Spring Boot, Jakarta EE, Redis, and SQL optimization. 
            Experienced in building high-throughput distributed systems, implementing database transaction optimizations, 
            and designing scalable backend architectures for concurrent user loads. Skilled in Docker containerization, 
            nginx configuration, and CI/CD pipeline development.
          </>
        ),
        images: [],
      },
      {
        title: "Full Stack & Frontend Development",
        description: (
          <>
            Expert in TypeScript, JavaScript, React, Vue.js, and Next.js for building modern web applications. 
            Skilled in integrating frontend frameworks with backend services, implementing responsive designs, 
            modernizing legacy systems (JSP to React), and creating intuitive user interfaces with mobile-friendly designs.
          </>
        ),
        images: [],
      },
      {
        title: "Performance Engineering & DevOps",
        description: (
          <>
            Experienced in application performance optimization, achieving 50% performance improvements through caching strategies 
            and database optimization. Proficient in Redis implementation, Docker containerization, automated testing, 
            and deployment in secure, regulated environments. Skilled in Git, GitHub Actions, and cloud platforms (GCP, AWS).
          </>
        ),
        images: [],
      },
      {
        title: "AI & Quantum Computing",
        description: (
          <>
            Proficient in quantum computing fundamentals using Qiskit framework and AI integration for scientific applications. 
            Experience in self-hosting large language models, developing machine learning pipelines, and creating 
            educational materials for quantum computing. Skilled in Python-based AI solutions and secure AI deployment.
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