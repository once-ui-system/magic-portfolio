import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Mindsend",
  lastName: "Datatech",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Web3 Development",
  avatar: "/images/avatar.jpg",
  //email: "example@gmail.com",
  location: "America/Sao_Paulo", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Portuguese"], // optional: Leave the array empty if you don't want to display languages
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
    link: "https://github.com/mindsend-datatech",
  },
  // {
  //   name: "LinkedIn",
  //   icon: "linkedin",
  //   link: "https://www.linkedin.com/company/once-ui/",
  // },
  // {
  //   name: "X",
  //   icon: "x",
  //   link: "",
  // },
  // {
  //   name: "Email",
  //   icon: "email",
  //   link: `mailto:${person.email}`,
  // },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Empowering the Web3 revolution with full-cycle development </>,
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className="ml-4">Kadena Cabinet</strong>
      </>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      Transforming complex technologies into accessible, seamless solutions for
      the decentralized world{" "}
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/mindsend",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Our mission is to transform complex challenges into simple, elegant
        solutions, making intricate technologies accessible and providing
        accessible, bleeding-edge products for the Web3 ecosystem and beyond.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Our team",
    experiences: [
      {
        company: "Ariel Serranoni",
        timeframe: " ",
        role: "Co-founder, Applied Mathematician, and Web3 Engineer",
        achievements: [
          <>Master of Science (MSc) in Mathematical Optimization</>,
          <>Bachelor's in Applied Mathematics </>,
        ],
        image: "/images/og/ariel.jpg",

      },
      {
        company: "Francisco Miranda",
        timeframe: " ",
        role: "Co-founder, Data Scientist, and Web3 Engineer",
        achievements: [
          <>MBA in Software Engineering</>,
          <>Bachelor's in Statistics and Data Science</>,
        ],
        image: "/images/og/chico.jpg",
      },
    ],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Our Stack",
    skills: [
  {
    title: "Pact",
    link: "https://kadena.io/pact",
    img: "/images/logos/pact.png",
  },
  {
    title: "Solidity",
    link: "https://soliditylang.org/",
    img: "/images/logos/solidity.png",
  },
  {
    title: "TypeScript",
    link: "https://www.typescriptlang.org/",
    img: "/images/logos/typescript.png",
  },
  {
    title: "Next.js",
    link: "https://nextjs.org/",
    img: "/images/logos/nextjs.png",
  },
  {
    title: "Vercel",
    link: "https://vercel.com/",
    img: "/images/logos/vercel.png",
  },
  {
    title: "C#",
    link: "https://learn.microsoft.com/en-us/dotnet/csharp/",
    img: "/images/logos/csharp.png",
  },
  {
    title: "PostgreSQL",
    link: "https://www.postgresql.org/",
    img: "/images/logos/postgresql.png",
  },
  {
    title: "MongoDB",
    link: "https://www.mongodb.com/",
    img: "/images/logos/mongodb.png",
  },
  {
    title: "Python",
    link: "https://python.org",
    img: "/images/logos/python.png",
  },
  {
    title: "R",
    link: "https://www.r-project.org/",
    img: "/images/logos/r.png",
  },
  {
    title: "Linux",
    link: "https://www.kernel.org/",
    img: "/images/logos/linux.png",
  },
  {
    title: "Docker",
    link: "https://www.docker.com/",
    img: "/images/logos/docker.png",
  },
  {
    title: "DevOps",
    link: "https://www.atlassian.com/devops",
    img: "/images/logos/devops.png",
  },
  {
    title: "Git",
    link: "https://git-scm.com/",
    img: "/images/logos/git.png",
  },
]
},
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

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
};

export { person, social, newsletter, home, about, blog, work, gallery };
