import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Marcel",
  lastName: "Kuhn",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Junior Developer",
  avatar: "/images/avatar.jpg",
  email: "kontakt@marcelkuhn.dev",
  location: "Europe/Berlin", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "German", "Czech"], // optional: Leave the array empty if you don't want to display languages
  street: "Orffstr. 3",
  city: "Nuremberg", 
  zip: "90439"
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
  title: `Home - ${person.name}`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Welcome to my portfolio!</>,
  featured: {
    display: true,
    title: <>Featured project: <strong className="ml-4">GastrOS</strong></>,
    href: "/work/GastrOS",
  },
  subline: (
    <>
      Hi, I'm {person.firstName}, a {person.role} passionate about building efficient and user-friendly solutions.
      <br /> My goal is to create impactful applications and continuously grow my skills.
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
    subItems: true,
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
        {person.firstName} is a {person.role} from {person.city} with a passion for efficient software solutions.
        <br />
        His focus is on backend development, continuous learning, and implementing innovative projects.
        <br />
        He is committed to clean code, teamwork, and the ongoing development of his skills.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Eviden Germany GmbH",
        timeframe: "2025 - current",
        role: "Junior Java Developer",
      },
      {
        company: "Eviden Germany GmbH",
        timeframe: "2023 - 2025",
        role: "Apprentice FIAE",
      },
      {
        company: "Atos Information Technology GmbH",
        timeframe: "2022 - 2023",
        role: "Apprentice FIAE",
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies & Education",
    institutions: [
      {
        name: "IT Specialist for Application Development",
        description: <>IHK Ostwestfalen zu Bielefeld | Paderborn + Höxter<br></br>(2022 - 2025)</>,
      },
      {
        name: "Consultant for Software Technologies",
        description: <>Internal Training Siemens Energy<br></br>(2022 - 2025)</>,
      },
      {
        name: "Business Informatics (B.Sc. discontinued)",
        description: <>Friedrich Alexander University Erlangen-Nuremberg<br></br>(2020 - 2021)</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Further Training & Certificates",
    skills: [
      {
        title: "Business English (C1)",
        description: <>Cambridge<br></br>(2023)</>,
      },
      {
        title: "ITIL 4 Foundation",
        description: <>PeopleCert<br></br>(2023)</>,
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
