import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Krishna",
  midInit: "J.",
  lastName: "Patel",
  get name() {
    return `${this.firstName} ${this.midInit} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/avatar.png",
  location: "America/Chicago", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: [ ], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally share thoughts on the intersection of creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/KrishnaPatel1552",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/krishnapatel1552",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:shivkrishna1552@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Software Engineer</>,
  subline: (
    <>
      {person.firstName} is a Master's student in Computer Science at the University of
      Texas at Arlington, specializing in Software Engineering and Intelligent Systems. With hands-on experience
      in software development, UI/UX design, and machine learning, Krishna has worked on projects ranging from
      FastAPI-based systems to Android apps and ML models. Skilled in Java, Python, SQL, and frameworks like
      TensorFlow and React Native, Krishna is actively seeking opportunities in software development and AI to
      apply technical expertise and innovative problem-solving.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from Texas, USA`,
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
        Krishna J. Patel is a skilled Software Engineer specializing in software development, UI/UX design, and
        machine learning. Pursuing a Master's in Computer Science at UT Arlington, Krishna has hands-on experience
        in optimizing UI/UX, real-time feature integration, and data efficiency. Proficient in Java, Python, SQL,
        and frameworks like FastAPI and TensorFlow, Krishna has led projects in market systems, ML-based ink detection,
        and Android apps. With a problem-solving mindset and strong technical acumen, Krishna is eager to drive
        innovation in the software industry.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Raven Technolabs",
        timeframe: "Jan 2023– May 2023",
        role: "Software Developer, Intern",
        achievements: [
          <>
            Responsive UI/UX Design: Reduced development time by 25% by designing a responsive UI/UX for the eCommerce app
            using Adobe XD, ensuring cross-platform consistency.
          </>,
          <>
            Real-time Feature Integration: Boosted user engagement by 40% by developing real-time features using Firebase
            Firestore for the community board app.
          </>,
          <>
            Automated Deployment: Accelerated app release cycles by 50% through automated build processes for App Store and
            Play Store.
          </>,
          <>
            Optimized Data Retrieval: Improved data retrieval speed by 35% by optimizing API calls and handling JSON data
            efficiently for the Weather Forecast app.
          </>,
        ],
        images: [],
      },
      {
        company: "Aryan Multimedia",
        timeframe: "May 2022– Jul 2022",
        role: "UI/UX Designer, Intern",
        achievements: [
          <>
            Visual Template Development: Designed visual templates for 20+ mobile screens, including dynamic splash screens and
            multi-option login interfaces.
          </>,
          <>
            User-centric Dashboard Design: Created dashboards for student data like attendance, assignments, and exam schedules,
            enhancing usability.
          </>,
          <>
            Collaborative UI Design: Worked closely with the product team to ensure a user-friendly interface aligned with UX best
            practices.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Texas at Arlington",
        description:
            <>
              Master's in Computer Science; Specializations: Software Engineering, Intelligent Systems
            </>,
        timeframe: "Aug 2023 – May 2025",
      },
      {
        name: "Charusat University",
        description: <>Bachelor of Technology in Information Technology</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Programming Languages",
        description: <>Proficient in Java, Python, SQL, JavaScript, and Dart for software development.</>,
        images: [ ],
      },
      {
        title: "Backend Development",
        description: <>Experienced in building scalable APIs using FastAPI and Flask.</>,
        images: [ ],
      },
      {
        title: "Machine Learning & AI",
        description: <>Hands-on experience with TensorFlow, PyTorch, and Apache Spark for deep learning and data processing.</>,
        images: [ ],
      },
      {
        title: "Mobile Development",
        description: <>Developing cross-platform apps using React Native and Android (Java/Kotlin).</>,
        images: [ ],
      },
      {
        title: "Frontend & UI/UX",
        description: <>Designing responsive interfaces using Figma, Adobe XD, and frontend tools.</>,
        images: [ ],
      },
      {
        title: "Databases",
        description: <>Skilled in MySQL, PostgreSQL, and Firebase for data storage and retrieval.</>,
        images: [ ],
      },
      {
        title: "Version Control & Project Management",
        description: <>Collaborating effectively with Git, GitHub, Jira, and Confluence.</>,
        images: [ ],
      }
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
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
