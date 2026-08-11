import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Kamalakannan",
  lastName: "B",
  name: `Kamalakannan B`,
  role: "Senior Android Developer",
  avatar: "/images/avatar_final.jpg",
  email: "srikannan101@gmail.com",
  location: "Asia/Kolkata", 
  languages: ["English", "Telugu", "Tamil"], 
  locale: "en", 
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about Android development</>,
};

const social: Social = [
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/kamalakannan-b-2ab92b75/",
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
  headline: <>Delivering production-grade Android apps at scale</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Retail Banking App</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/retail-banking-amsterdam",
  },
  subline: (
    <>
      I'm {person.firstName}, a {person.role.toLowerCase()} with 11 years of experience specialising in fintech, banking applications, IoT, and video streaming.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
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
        {person.firstName} is a Hyderabad-based {person.role.toLowerCase()} with 11 years of experience specialising in fintech, banking applications, IoT, and video streaming. He has a proven track record of delivering production-grade apps at scale, working with major clients like Backbase, DBS Bank, and Schneider Electrics.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Backbase",
        location: "Hyderabad",
        timeframe: "May 2025 - Present",
        role: "Senior Android Developer",
        achievements: [
          <>Developed and maintained core modules — Onboarding, Cards, Savings, and Insurance — for CIH Bank's retail banking app built on the Backbase platform, serving over 2 million users in Morocco.</>,
          <>Architected features using Kotlin, MVVM, and Clean Architecture with KOIN for dependency injection and Jetpack components including ViewModel and Coroutines.</>,
          <>Improved app stability by actively working on crash rate reduction and ANR fixes.</>,
          <>Leveraged AI-assisted development tools (GitHub Copilot, Cursor) to accelerate feature delivery.</>,
        ],
        images: [],
      },
      {
        company: "DBS Bank",
        location: "Singapore",
        timeframe: "August 2022 - April 2025",
        role: "Senior Android Developer",
        achievements: [
          <>Contributed to the DBS Digibank app (1M+ downloads) serving users across Singapore and Indonesia.</>,
          <>Implemented Jetpack components — ViewModel, Dagger Hilt and Coroutines — replacing legacy RxJava patterns.</>,
          <>Led the Java to Kotlin migration for the Bank & Earn module and implemented multi-module architecture.</>,
          <>Delivered a measurable performance improvement by reducing screen load time from 11 seconds to 7 seconds for a key user flow.</>,
        ],
        images: [],
      },
      {
        company: "Schneider Electrics Pvt Ltd",
        location: "Bangalore",
        timeframe: "April 2019 - July 2022",
        role: "Senior Android Developer",
        achievements: [
          <>Involved in the designing the Architecture of the App and developed an app from scratch with MVVM architecture pattern & Jetpack components.</>,
          <>Worked on developing BLE sdk for android that communicate with the Schneider IOT devices.</>,
          <>Integrated Firebase Analytics, authentication, notifications in the App.</>,
        ],
        images: [],
      },
      {
        company: "Ray IOT Solutions",
        location: "Bangalore",
        timeframe: "Jan 2018 - Apr 2019",
        role: "Senior Android Developer",
        achievements: [
          <>Single handedly developed an app from scratch and released the app in production.</>,
          <>Collaborated with UX designers and backend engineers throughout the project.</>,
        ],
        images: [],
      },
      {
        company: "VVDN Tech Pvt Ltd",
        location: "Gurgaon",
        timeframe: "June 2015 - Aug 2017",
        role: "Android Developer",
        achievements: [
          <>Built Android application with Java language & XML for all the projects.</>,
          <>Worked on Video Streaming & Wi-Fi Bluetooth Applications that has IOT device communication.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, 
    title: "Studies",
    institutions: [
      {
        name: "Sri Shakthi Institute of Engineering & technology",
        description: <>BE - CSE (2011 - 2015), Coimbatore</>,
      },
    ],
  },
  technical: {
    display: true, 
    title: "Technical skills",
    skills: [
      {
        title: "Android Development",
        description: (
          <>Extensive experience in building Android applications using modern architectures and tools.</>
        ),
        tags: [
          { name: "Kotlin", icon: "dev" },
          { name: "Java", icon: "dev" },
          { name: "Compose", icon: "dev" },
          { name: "MVVM", icon: "dev" },
        ],
        images: [],
      },
      {
        title: "Libraries & Tools",
        description: (
          <>Proficient with various Android libraries for networking, DI, and asynchronous programming.</>
        ),
        tags: [
          { name: "Coroutines", icon: "dev" },
          { name: "Dagger-Hilt", icon: "dev" },
          { name: "Koin", icon: "dev" },
          { name: "Retrofit", icon: "dev" },
          { name: "RoomDB", icon: "dev" },
        ],
        images: [],
      },
      {
        title: "IoT & Video Streaming",
        description: (
          <>Extensive experience integrating IoT devices via BLE/Bluetooth and building video streaming capabilities in Android.</>
        ),
        tags: [
          { name: "IoT", icon: "dev" },
          { name: "BLE / Bluetooth", icon: "dev" },
          { name: "Wi-Fi", icon: "dev" },
          { name: "Media Player", icon: "dev" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about Android and tech...",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Android projects by ${person.name}`,
};

const gallery: Gallery = {
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
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
