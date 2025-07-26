import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Vishal",
  lastName: "N",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Aspiring Doctor & Entrepreneur | Health & Wellness Enthusiast | Building Praneon — A New Way of Holistic Healing",
  avatar: "/images/avatar.png",
  email: "thevishalbnys@gmail.com",
  location: "Asia/Kolkata",
  languages: ["English", "French", "Hindi", "Japanese", "Marathi", "Tamil"],
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Wellness Insights</>,
  description: (
    <>
      I share articles on holistic healing, AI in Iridology, and modern wellness entrepreneurship.
    </>
  ),
};

const social = [
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/drvishaln/",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/thebruzilla/",
  },
  {
    name: "LinkTree",
    icon: "link",
    link: "https://linktr.ee/Bruzilla",
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
  description: `Showcasing my journey as a ${person.role}`,
  headline: <>Align. Heal. Thrive.</>,
  featured: {
    display: true,
    title: <>Recent Project: <strong className="ml-4">AI-Powered Iridology</strong></>,
    href: "/work/iridology-ai", 
    href: "/work/iridology-ai", 
  },
  subline: (
    <>
      I'm Vishal, a final-year BNYS student, integrating ancient naturopathy with modern AI-driven diagnostics.
      <br /> 
      Exploring holistic wellness through my venture </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, a ${person.role} based in Tamil Nadu`,
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
        An aspiring BNYS (Bachelor of Naturopathy & Yogic Sciences) doctor who's passionate about integrative healthcare, AI-driven Iridology, and holistic wellness ventures. Founder of Praneon Wellness Retreat Centre (in planning) — blending traditional healing sciences with modern wellness approaches.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experience",
    experiences: [
      {
        company: "Integrating AI in Iridology — Praneon Wellness",
        timeframe: "Jan 2023 - Present",
        role: "Founder & Innovator",
        achievements: [
          <>Developing AI-powered Iris diagnostic system focusing on preventive wellness insights aligned with Naturopathy.</>,
          <>Creating practitioner-assisting tools blending AI precision with human empathy for BNYS doctors.</>,
        ],
      },
      {
        company: "BNYS Internship – Pain Management Clinic",
        timeframe: "2026 - 2027",
        role: "Internship Trainee",
        achievements: [
          <>Performed supervised clinical assessments for musculoskeletal disorders using Chiropractic & Acupuncture modalities.</>,
          <>Assisted in therapeutic Yoga sessions for lifestyle disease management and stress reduction.</>,
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Academic Pathway",
    institutions: [
      {
        name: "Sona Medical College of Naturopathy & Yoga",
        description: <>Pursuing BNYS with specialization in holistic pain management, lifestyle medicine, and wellness retreat planning.</>,
      },
      {
        name: "Holy Cross Matriculation Higher Secondary School",
        description: <>Completed Higher Secondary with active participation in Science Club, Debate Club, Health Camps, Cultural Events, and Environmental Initiatives.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Core Skills",
    skills: [
      {
        title: "AI-Driven Iridology",
        description: <>Integrating AI vision systems to automate Iris diagnostics for preventive health assessments and practitioner-support tools.</>,
      //  images: [
      //    {
      //      src: "/images/projects/project-01/cover.jpg",
      //      alt: "Iridology AI Project",
      //      width: 16,
      //      height: 9,
      //    },
      //  ],
      },
      {
        title: "Holistic Pain & Lifestyle Disease Management",
        description: <>Proficient in Acupuncture, Hydrotherapy, Mud Therapy, and Manual Chiropractic techniques for managing chronic conditions.</>,
      },
      {
        title: "Wellness Retreat Conceptualization",
        description: <>Planning nature-integrated retreat experiences blending yoga therapy, hydrotherapy, and personalized wellness programs.</>,
      },
      {
        title: "Business Development & Brand Strategy",
        description: <>Strategizing e-commerce and wellness brand positioning with a focus on holistic health products and services.</>,
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Articles & Blogs",
  title: "Sharing Thoughts on Wellness, Tech & Healing...",
  description: `Read latest articles by ${person.name} on modern holistic practices`,
};

const work = {
  path: "/work",
  label: "Projects",
  title: `Projects – ${person.name}`,
  description: `Innovative projects blending Naturopathy & Technology by ${person.name}`,
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo Gallery – ${person.name}`,
  description: `A visual showcase of my journey in wellness & personal ventures`,
  images: [
    {
      src: "/images/gallery/Personal Bio Pic.jpg",
      alt: "Personal Bio Pic",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Price Reciving Pic.jpg",
      alt: "Price Reciving Pic",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
