import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Mo",
  lastName: "Said",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Sr. Product Designer",
  avatar: "/images/avatar.jpg",
  location: "Europe/London", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Somali"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
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
    link: "https://github.com/moasaid",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/mosaidme/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:moasaid9@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Mo&apos;s portfolio showcasing product design work.`,
  headline: <>Product Designer and UX Engineer</>,
  subline: (
    <>
      I'm Mo, a digital product designer at <InlineCode>pendo.io</InlineCode>, I craft experinces 
      <br />that users love. After hours, I build my own projects.
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
        Hi, I&apos;m Mo, a product designer in the SaaS space. My work is driven by a deep empathy for users, drive positive business outcomes, and a passion for product craft. Currently at Pendo, I&apos;m focused on improving the world&apos;s experience with software.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Experience",
    experiences: [
      {
        company: "Pendo",
        timeframe: "2022 - Present",
        role: "Senior Product Designer",
        achievements: [
          <>
            I designed for the Roadmap product in collaboration with the Listen team, delivering key features such as new templates, roadmap voting, and publishing capabilities.
          </>,
          <>
            I worked with the PLG team to support the company&apos;s flywheel strategy, contributing to the launch of onboarding flows, paywall experiences, and Home projects.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/me-1.png",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "mosaid.me studio",
        timeframe: "2020 - 2022",
        role: "Freelance Product Designer",
        achievements: [
          <>
            During the pandemic, I launched mosaid.me studio, offering a range of services including product design, product discovery, web design, and design jam workshops.
          </>,
          <>
            I&apos;ve delivered digital experiences for 12 renowned brands, including South Yorkshire Housing Association, Airship Services, the University of Sheffield, and The Good Things Foundation.
          </>,
        ],
        images: [],
      },
      {
        company: "Tribepad",
        timeframe: "2019 - 2020",
        role: "Product Designer",
        achievements: [
          <>
            At Tribepad, I worked within the New Innovations team to deliver key projects, including the ATS lite product and the hiring manager view.
          </>,
          <>
            I had ownership of onboarding customers and implementing enterprise white-label deliverables.
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
        name: "Sheffield Hallam University",
        description: <>My MSc in IT Management provided an academic foundation for my career in tech, exploring how IT supports business operations and drives improvement through areas like database design, network management, and project management theories.</>,
      },
      {
        name: "University of Roehampton",
        description: <>I hold a Marketing BSc accredited by the Chartered Institute of Marketing (CIM), which explored topics including the rise of global brands, digital marketing, and the evolving intersections of technology and marketing practices.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma.</>,
        // optional: leave the array empty if you don't want to display images
      },
      {
        title: "Data driven design",
        description: <>Use analytics applications to make informed design decisions.</>,
        // optional: leave the array empty if you don't want to display images
      },
      {
        title: "Front end development",
        description: <>Build prototypes with HTML, CSS and JavaScript.</>,
        // optional: leave the array empty if you don't want to display images
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
