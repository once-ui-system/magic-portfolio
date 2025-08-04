import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Tom",
  lastName: "Ulman",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Front-end Developer & Product Designer",
  avatar: "/images/avatar.png",
  email: "thomas.ulman@gmail.com",
  location: "Australia/Sydney", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I write about SaaS growth, front-end development, and the intersection of
      user experience and technical implementation.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/tomulman",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/tomulman",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building SaaS experiences that convert and scale</>,
  featured: {
    display: true,
    title: <>Turning user leaks into <strong className="ml-4">422% revenue growth</strong></>,
    href: "/work",
  },
  subline: (
    <>
      I'm Tom, a front-end developer and product designer who combines technical implementation with user-centered design. By day, I lead growth initiatives at Reading Eggs.
      <br /> By night, I help SaaS founders plug user leaks through AlmostHuman.digital.
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
    link: "mailto:thomas.ulman@gmail.com?subject=Consultation%20Request",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Tom is a front-end developer and product designer who thrives at the intersection of user experience and technical implementation.
        Currently leading growth initiatives at Reading Eggs (3P Learning), where he's driven measurable business impact through optimised user experiences and technical leadership.
        In 2023, he founded AlmostHuman.digital to help early-stage SaaS founders plug user leaks and improve activation rates.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Reading Eggs (3P Learning)",
        timeframe: "Present",
        role: "Growth & Development Lead",
        achievements: [
          <>
                    Drove 132% YOY subscription growth through cross-platform optimisation and UX improvements
        for a globally-recognised educational platform serving millions of users worldwide.
          </>,
          <>
                    Achieved 150% navigation efficiency improvement and 6-figure revenue impact through
        strategic technical leadership and user experience optimisation.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Reading Eggs Growth Dashboard",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "AlmostHuman.digital",
        timeframe: "2023 - Present",
        role: "Founder & SaaS Optimisation Consultant",
        achievements: [
          <>
                    Built and scaled Waitlist.Email to 422.5% revenue increase in 12 months using Next.js,
        strategic optimisation, and growth marketing with zero churn rate achieved.
          </>,
          <>
            Led complex CMS migration projects resulting in 40% reduction in publishing time
            and 30% increase in page speeds while improving editor satisfaction.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Background",
    institutions: [
      {
        name: "General Assembly",
        description: <>Teaching and mentoring developers in modern web development practices.</>,
      },
      {
        name: "Continuous Learning",
        description: <>Staying current with web performance optimisation, SaaS growth strategies, and emerging frontend technologies.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Frontend Development",
        description: <>Expert in React, Next.js, JavaScript, TypeScript, TailwindCSS, and modern HTML5/CSS3 for building scalable SaaS experiences.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-02.jpg",
            alt: "Frontend Development",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/project-01/cover-03.jpg",
            alt: "React Applications",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "UX & Growth Optimisation",
        description: <>Specialising in user research, A/B testing, conversion optimisation, and data-driven design decisions that drive measurable business impact.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/project-01/cover-04.jpg",
            alt: "UX Optimisation",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Performance & Analytics",
        description: <>Core Web Vitals optimisation, Google Analytics 4, GTM, Hotjar, and Lighthouse for technical performance and user behaviour analysis.</>,
        // optional: leave the array empty if you don't want to display images
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about SaaS growth and frontend development...",
      description: `Read what ${person.name} has been up to recently - insights on SaaS optimisation, technical leadership, and user experience`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Case Studies – ${person.name}`,
  description: `SaaS growth and development case studies by ${person.name}`,
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
