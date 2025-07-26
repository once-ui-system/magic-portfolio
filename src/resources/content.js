import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Vishal",
  lastName: "N",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Aspiring Naturopathic Doctor & Wellness Entrepreneur",
  avatar: "/images/avatar.jpg",
  email: "thevishalbnys@gmail.com", // Change to your email
  location: "Asia/Kolkata",
  languages: ["English", "Tamil"], 
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
    icon: "linktree",
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
  headline: <> Align. Heal. Thrive</>,
  featured: {
    display: true,
    title: <>Recent Project: <strong className="ml-4">AI-Powered Iridology</strong></>,
    href: "/work/iridology-ai", 
  },
  subline: (
    <>
      I'm Vishal, a final-year BNYS student, integrating ancient naturopathy with modern AI-driven diagnostics.
      <br /> Exploring holistic wellness through my venture </>
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
    display: false, // You can enable this if you want to embed Calendly link
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        A BNYS (Bachelor of Naturopathy & Yogic Sciences) student with a passion for integrative healthcare,
        AI-driven Iridology, and holistic wellness ventures. Currently building Praneon, a wellness brand focusing on personalized healing.
      </>
    ),
  },
  work: {
    display: true,
    title: "Clinical Experience",
    experiences: [
      {
        company: "BNYS Internship – Pain Management Clinic",
        timeframe: "2025 - Present",
        role: "Internship Trainee",
        achievements: [
          <>Performed supervised clinical assessments for musculoskeletal disorders using Chiropractic & Acupuncture modalities.</>,
          <>Assisted in therapeutic Yoga sessions for lifestyle disease management and stress reduction.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Academic Pathway",
    institutions: [
      {
        name: "Bachelor of Naturopathy & Yogic Sciences (BNYS)",
        description: <>Pursuing from XYZ Naturopathy College, specializing in holistic pain management and lifestyle medicine.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "My Wellness Toolkit",
    skills: [
      {
        title: "AI-Driven Iridology",
        description: <>Working on integrating AI vision systems to automate Iris diagnostics for personalized health assessments.</>,
        images: [
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Iridology AI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Naturopathic Healing Modalities",
        description: <>Hands-on practice with Hydrotherapy, Mud Therapy, Acupuncture, and Manual Chiropractic Techniques.</>,
        images: [],
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
      src: "/images/gallery/horizontal-1.jpg",
      alt: "Workshop Session",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "Chiropractic Practice",
      orientation: "vertical",
    },
    // Add more image objects as you add images.
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
