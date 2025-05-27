import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Jane",
  lastName: "Doe",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Professional",
  avatar: "/images/avatar.jpg",
  email: "contact@example.com",
  location: "Europe/Berlin",
  languages: ["English", "German"],
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
    </>
  ),
};

const social = [
  {
    name: "E-Mail",
    icon: "email",
    link: `mailto:${person.email}`,
  },
  {
    name: "Impressum",
    icon: "infoCircle",
    link: `/impressum`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `Home - ${person.lastName}.de`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Lorem ipsum dolor sit amet</>,
  featured: {
    display: false,
    title: <>Recent project: <strong className="ml-4">Project Name</strong></>,
    href: "/work/project-example",
  },
  subline: (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      <br /> Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.lastName}.de`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: false,
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      <br />
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      <br />
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </>
  ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Lorem Ipsum",
        timeframe: "2020 - 2023",
        role: "Lorem Specialist",
        achievements: [
          <>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </>,
        ],
        images: [
          {
            src: "/images/projects/project-01/cover-05.jpg",
            alt: "Lorem Ipsum",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Lorem University",
        description: <>Ipsum Department<br></br>(2015-2019)</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Certifications",
    skills: [
      {
        title: "Lorem Certification",
        description: <>Dolor Institute<br></br>(2022)</>,
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Lorem ipsum dolor sit amet...",
  description: `Read what ${person.name} has been up to recently`,
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Projects by ${person.name}`,
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
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
