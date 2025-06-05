import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Mindsend",
  lastName: "Datatech",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: " Building real solutions for Web3 companies, developers, and users",
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
    href: "/work/cabinet",
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
  description: `Meet the ${person.name} crew`,
  tableOfContent: {
    display: true,
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
       We are a Web3-focused development team that designs, builds, and maintains robust blockchain solutions. From infrastructure to user-facing applications, we’ve helped shape core components of the Kadena ecosystem—contributing to some of its most impactful and widely used tools. Our mission is simple: to deliver practical, secure, and scalable products that meet the needs of modern decentralized systems.
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
"Ariel is an applied mathematician with a Master’s in Computer Science and a strong track record designing, implementing, and managing Web3 systems. With deep technical foundations and a hands-on approach, he thrives in the fast-moving blockchain space—adapting quickly to new technologies and pushing the boundaries of what’s possible in decentralized architecture."

],
        image: "/images/og/ariel.jpg",
      },
      {
        company: "Francisco Miranda",
        timeframe: " ",
        role: "Co-founder, Data Scientist, and Web3 Engineer",
        achievements: [
"Francisco brings consistency and curiosity to every project. With a background in Statistics and Data Science and an ongoing MBA in Software Engineering, he excels in infrastructure, networking, and backend development. A disciplined engineer and proactive team player, Francisco is the one who’s always up-to-date and always digging into the docs."
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
        img: "/icons/solidity.svg",
      },
      {
        title: "TypeScript",
        link: "https://www.typescriptlang.org/",
        img: "/icons/typescript.svg",
      },
      {
        title: "Next.js",
        link: "https://nextjs.org/",
        img: "/icons/nextdotjs.svg",
      },
      {
        title: "Vercel",
        link: "https://vercel.com/",
        img: "/icons/vercel.svg",
      },
      {
        title: "C#",
        link: "https://learn.microsoft.com/en-us/dotnet/csharp/",
        img: "/icons/dotnet.svg",
      },
      {
        title: "PostgreSQL",
        link: "https://www.postgresql.org/",
        img: "/icons/postgresql.svg",
      },
      {
        title: "MongoDB",
        link: "https://www.mongodb.com/",
        img: "/icons/mongodb.svg",
      },
      {
        title: "Python",
        link: "https://python.org",
        img: "/icons/python.svg",
      },
      {
        title: "R",
        link: "https://www.r-project.org/",
        img: "/icons/r.svg",
      },
      {
        title: "Linux",
        link: "https://www.kernel.org/",
        img: "/icons/linux.svg",
      },
      {
        title: "Docker",
        link: "https://www.docker.com/",
        img: "/icons/docker.svg",
      },
{
title: "TailwindCSS",
link: "https://tailwindcss.com",
img: "/icons/tailwindcss.svg"
},
{
title: "Github",
link: "https://github.com",
img: "/icons/github.svg"
},
{
title: "WalletConnect",
link: "https://walletconnect.network",
img: "/icons/walletconnect.svg"
},
// {
// title: "Metamask",
// link: "https://metamask.io",
// img: "/icons/metamask"
// },

      {
        title: "Git",
        link: "https://git-scm.com/",
        img: "/icons/git.svg",
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about blockchain tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Web3 projects by ${person.name}`,
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
      src: "/images/hero.png",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
