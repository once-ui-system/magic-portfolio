const person = {
  firstName: "Mohammad",
  lastName: "Mansour",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "mohamed.mansour2622@gmail.com",
  location: "Asia/Jerusalem",
  languages: ["Arabic", "English"],
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about frontend development, modern JavaScript
      frameworks, and insights from my journey as a developer.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/mman9our",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/mman9our",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/m.man9our/",
  }
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building dynamic apps that bring ideas to life</>,
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className="ml-4">Unity Game 2D</strong>
      </>
    ),
    href: "/work/unity-game-2d",
  },
  subline: (
    <>
      I'm Mohammad, a software engineer specializing in building high-performance web and mobile applications using technologies like React, Next.js, React Native.
      <br /> Let's build something amazing together.
    </>
  ),
};

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
    display: true,
    link: "https://cal.com/mman9our",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Mohammad Mansour is a Nablus-based frontend engineer with over 2 years
        of experience building fast, accessible, and responsive web and mobile
        applications. He thrives on solving complex UI challenges and crafting
        intuitive user experiences using modern JavaScript frameworks.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Xngage",
        timeframe: "Mar 2024 - Present",
        role: "Frontend Engineer",
        achievements: [
          <>
            Collaborated with UX teams to enhance product usability and visual
            design.
          </>,
          <>
            Implemented responsive designs ensuring seamless experience across
            devices.
          </>,
        ],
        images: [],
      },
      {
        company: "Z Technologies",
        timeframe: "Jun 2023 - Mar 2024",
        role: "Frontend Engineer",
        achievements: [
          <>
            Optimized site performance, achieving a 30% reduction in load time.
          </>,
          <>
            Built and maintained reusable components for scalable development.
          </>,
        ],
        images: [],
      },
      {
        company: "Gaza Sky Geeks",
        timeframe: "Aug 2023 - Oct 2023",
        role: "Programming Instructor",
        achievements: [
          <>Delivered hands-on coding workshops and bootcamps to students.</>,
          <>
            Created instructional materials and engaged diverse learners in
            programming.
          </>,
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
        name: "Arab American University",
        description: <>Bachelor's degree in Computer Systems Engineering.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "React / Next.js",
        description: (
          <>
            Building scalable web apps using React, Next.js, and state
            management libraries like Redux and Zustand.
          </>
        ),
        images: [],
      },
      {
        title: "Tailwind CSS / MUI",
        description: (
          <>Expert in building responsive UIs using Tailwind and Material UI.</>
        ),
        images: [],
      },
      {
        title: "Mobile Development",
        description: (
          <>
            Experience in developing mobile apps using React Native, Flutter,
            and Ionic.
          </>
        ),
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Thoughts on frontend, backend, AI, and tools...",
  description: `Read what ${person.name} has been up to recently`,
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Frontend projects built and maintained by ${person.name}`,
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `Snapshots from ${person.name}'s personal and professional moments`,
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
};

export { person, social, newsletter, home, about, blog, work, gallery };
