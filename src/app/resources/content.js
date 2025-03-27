import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Antony",
  lastName: "Lambinon",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "SEO Expert & Fullstack Developer with Blockchain & AI Skills",
  avatar: "/images/avatar.jpg",
  location: "Europe/Amsterdam", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Dutch", "French"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}&apos;s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/antonylambinon",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/antonylambinon",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:antony@lambinon.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}&apos;s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>AI & Blockchain Developer</>,
  subline: (
    <>
      I'm Antony, specializing in AI Chatbot development and blockchain solutions with <InlineCode>AIFTW</InlineCode>. 
      <br /> I create intelligent conversational interfaces and decentralized applications.
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
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Antony is an Amsterdam-based AI & Blockchain developer with expertise in developing intelligent chatbots
        and decentralized applications. His work focuses on leveraging cutting-edge AI technologies and blockchain
        solutions to create innovative products that solve real-world problems. With a strong background in fullstack
        development and a passion for emerging technologies, Antony builds secure, scalable, and user-friendly
        applications at the intersection of AI, blockchain, and web development.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "AIFTW",
        timeframe: "2022 - Present",
        role: "AI Developer & SEO Expert",
        achievements: [
          <>
            Developed advanced AI chatbots that leverage natural language processing to deliver human-like
            interactions, resulting in 40% increase in customer satisfaction for client businesses.
          </>,
          <>
            Implemented SEO optimization strategies that improved client website rankings by an average of 35%
            and increased organic traffic by 50%.
          </>,
          <>
            Built custom AI solutions for content generation and analysis, helping clients reduce content
            production time by 60%.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "AIFTW AI Chatbot",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Tehen",
        timeframe: "2021 - 2022",
        role: "Blockchain Developer",
        achievements: [
          <>
            Architected and developed a decentralized finance (DeFi) application that enabled secure
            peer-to-peer transactions without intermediaries.
          </>,
          <>
            Created smart contracts for NFT marketplaces, implementing ERC-721 and ERC-1155 standards
            with enhanced security features.
          </>,
          <>
            Built a green energy monitoring platform using blockchain to track and verify renewable
            energy production and consumption in real-time.
          </>,
        ],
        images: [],
      },
      {
        company: "GreenChain",
        timeframe: "2019 - 2021",
        role: "Fullstack Developer",
        achievements: [
          <>
            Developed a blockchain-based platform for tracking carbon credits and environmental impact,
            helping businesses reduce their carbon footprint.
          </>,
          <>
            Built a comprehensive dashboard for monitoring renewable energy production across solar and wind
            farms, providing real-time analytics and predictive maintenance alerts.
          </>,
          <>
            Implemented smart contract solutions for automated carbon credit trading, increasing transaction
            efficiency by 75% compared to traditional methods.
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
        name: "Utrecht University",
        description: <>Master&apos;s in Computer Science with focus on Artificial Intelligence and Distributed Systems.</>,
      },
      {
        name: "Amsterdam Blockchain Academy",
        description: <>Specialized certification in Smart Contract Development and Blockchain Architecture.</>,
      },
      {
        name: "Google AI Professional",
        description: <>Professional certification in Machine Learning and Natural Language Processing.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "AI & Machine Learning",
        description: <>Expert in developing conversational AI using GPT models, LangChain, and custom NLP solutions.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "AI Project",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "AI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Blockchain Development",
        description: <>Building secure smart contracts, dApps, and decentralized systems using Ethereum, Solidity, and Web3.js.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Blockchain Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Fullstack Development",
        description: <>Creating modern web applications with Next.js, React, Node.js, and various database technologies.</>,
        images: [],
      },
      {
        title: "SEO & Digital Marketing",
        description: <>Implementing advanced SEO strategies to improve website visibility and drive organic traffic.</>,
        images: [],
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

export { person, social, newsletter, home, about, blog, work, gallery };
