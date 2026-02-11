import { About, Blog, Gallery, Guestbook, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Samiullah",
  lastName: "Javed",
  name: `Samiullah Javed`,
  role: "Software Developer & Future Founder",
  avatar: "/images/avatar.jpg",
  email: "samiullahjavedd@gmail.com",
  location: "Asia/Karachi", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Urdu"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>I might email you someday (if it's important)</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/sam1-khan",
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/8sami",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/samiullahjaved",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/wotareudoing/",
    essential: true,
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@wotareudoing",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Making lives easier by solving problems</>,
  featured: {
    display: true,
    title: ( // hmmm, play doom? rickroll?
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      Assalamualaikum👋, I'm Sami. I love making products that solve actual problems.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: false,
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
        After messing around and learning different stuff, I have acquired hands‑on experience with both Python and JavaScript, particularly, NextJS,
        ReactJS, Typescript, Django, Django Ninja, Flask and many more things that I won’t be able to fit here. I have a good understanding and experience
        of version control and deployments and, not to forget, I have created many N8N automation flows and used AI for different use cases, worked with
        Supabase, Strapi CMS, different UI libraries(Shadcn, Chakra, AntDesign etc.), also tried app development with Expo and didn’t like it
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Devkind",
        timeframe: "Jul. 2025 - Present",
        role: "Software Developer",
        achievements: [
          <>Built a plug-and-play checkout for Swell stores using Cloudflare KV, Easyblocks, and NextJS, featuring a no-code editor for UI customisation.</>,
          <>Optimised the core checkout logic from 3 steps to 1, reducing friction and increasing completion rates by approximately 35%.</>,
          <>Delivered 6+ client projects end-to-end, managing design, backend, frontend implementation, and deployment.</>,
          <>Mentored an intern through code reviews and task delegation to ensure timely and effective task completion.</>,
        ],
        images: [],
      },
      {
        company: "Devkind",
        timeframe: "Mar. 2025 - Jun. 2025",
        role: "Developer Intern",
        achievements: [
          <>Reworked a legacy website with a modern, sleek design, improving SEO and UX, which directly increased organic traffic, sales leads and decreased paint time from 172 ms to 30 ms.</>,
          <>Standardised AI usage by creating a database of specialised prompts, reducing API token costs by 30%, and ensuring code consistency.</>,
          <>Automated marketing workflows using N8N and Slack, saving the team 10+ hours of manual work weekly.</>,
        ],
        images: [],
      },
      {
        company: "Samiullah Arif Enterprises (SAE)",
        timeframe: "Nov. 2024 - Apr. 2025",
        role: "Full-stack Freelance Developer",
        achievements: [
          <>Built a custom invoicing system using Django Ninja and NextJS that had processed over 20,000,000 PKR in transactions.</>,
          <>Iterated on the product based on real-time client feedback to handle different scenarios and 4+ new feature requests.</>,
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
        name: "Islamia Government Science College Sukkur",
        description: <>Intermediate in Computer Science (Aug. 2024 - Expected 2026)</>,
      },
      {
        name: "APWA Excellent World School Sukkur",
        description: <>
          Primary & High School (Apr. 2014 - Aug. 2024)
          <br />1st position in Annual Examination 2022
          <br />2nd position in Annual Examination 2020-21
        </>,
      },
    ],
  },
  technical: { // needs special attention
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: (
          <>Able to prototype in Figma with Once UI with unnatural speed.</>
        ),
        tags: [
          {
            name: "Figma",
            icon: "figma",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Next.js",
        description: (
          <>Building next gen apps with Next.js + Once UI + Supabase.</>
        ),
        tags: [
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "Supabase",
            icon: "supabase",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const guestbook: Guestbook = {
  path: "/guestbook",
  label: "Guestbook",
  title: `Say hi👋 to fellow passersby`,
  description: `How was you stay here? Leave a comment👇`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
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
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
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
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
