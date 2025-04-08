import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Yannick",
  lastName: "Nyami",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Mobile Engineer",
  avatar: "/images/avatar.png",
  location: "Europe/Paris", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "French", "German"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
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
    link: "https://github.com/javabbt",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/lo%C3%AFc-ngapmen-98b51a124/",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:ngapmennyamiyannickloic@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Mobile engineer and builder</>,
  subline: (
    <>
      I'm Yannick, a mobile engineer (android) at{" "}
      <InlineCode>Adevinta/Leboncoin</InlineCode>, where I craft intuitive
      <br /> user experiences. After hours, I build my own projects.
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
        Yannick is a Paris-based mobile engineer with a passion for building
        scalable and maintainable mobile applications. His expertise lies in
        system design, architecture patterns, and creating robust solutions that
        can handle millions of users.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Adevinta/Leboncoin",
        timeframe: "05/2024 - Present",
        role: "Senior Android Engineer",
        achievements: [
          <>
            leboncoin, is the leading generalist site for sales between
            individuals in France, leader in the real estate and automobile
            markets, key player in employment and vacation rentals. With nearly
            28.8 million unique monthly visitors on average, leboncoin is the
            leading French e-commerce site, and the 2nd most visited e-commerce
            site in France.
          </>,
          <>
            Working on leboncoin's mobile android app. This includes bugs and
            new features.
          </>,
        ],
        images: [],
      },
      {
        company: "Droidcoin",
        timeframe: "01/2023 - Present",
        role: "Android Instructor",
        achievements: [
          <>
            Making paid videos and courses on Android programming for Droidcon,
            teaching android development to thousands of learners.
          </>,
        ],
        images: [],
      },

      {
        company: "Treatwell",
        timeframe: "05/2022 - 04/2024",
        role: "Senior Android Engineer",
        achievements: [
          <>
            Worked on Treatwell's mobile android app, the #1 booking platform in
            Europe for arranging your hair and beauty appointments 8 million
            bookings per month and growing.
          </>,
          <>
            Worked on the onboarding and offline to online flow that increased
            user retention of new users of about 3% and total revenue of about
            1%
          </>,
          <>
            Moved the app from a "Mortar and Flow" architecture to a modular
            MVVM architecture.
          </>,
          <>
            Worked on the Loyalty feature for loyal customers using clean
            architecture methods and SOLID principles.
          </>,
          <>
            Continuous Integration/Deployment Pipeline Integration, pull
            requests, code reviews, load/stress testing, unit/integration/e2e
            testing
          </>,
        ],
        images: [],
      },
      {
        company: "Kreactive",
        timeframe: "06/2023 - 09/2023",
        role: "Senior Android Engineer",
        achievements: [
          <>
            Worked on the Louis Vuitton's official android app, app with over 1
            million users, resolved some bugs to improve the app's quality,
            worked on some intuitive animations to gamify the user's experience.
          </>,
        ],
        images: [],
      },
      {
        company: "Appsolute",
        timeframe: "09/2021 - 09/2022",
        role: "Senior Android Engineer",
        achievements: [
          <>
            Worked on Adoma, android application of the French Ministry of
            Housing. Refactored the app to make it work 100% offline, redesigned
            the app's architecture, moving from MVP to MVVM to make it more
            scalable, rapid and bug free, implemented all the unit and
            instrumented tests of the app, decreasing bugs from 58% to 27%.
          </>,
          <>
            Developed Smile and DHR, mobile apps of the Sisley beauty group.
            Built the mobile apps of the Sisley group Paris, one of the most
            notorious and prestigious beauty company in the world, from scratch.
            Feature modular app with MVVM architecture.
          </>,
          <>
            Worked on Beaba, an IOT project that connects a baby cook to a
            mobile phone to automate baby meals, the app was entirely designed
            from scratch using the MVVM + MVI architecture.
          </>,
          <>
            Continuous Integration/Deployment Pipeline Integration, pull
            requests, code reviews, load/stress testing, unit/integration/e2e
            testing
          </>,
        ],
        images: [],
      },
      {
        company: "SDK GAMES AFRICA",
        timeframe: "01/2019 - 04/2021",
        role: "Android Engineer",
        achievements: [
          <>
            Designed and developed GCTV, the mobile application of one of the
            most popular TV channels in Cameroon. Thousands downloads on
            playstore. The app was built using Java and the MVP architecture,
            built the video streaming player. Integrated multiple third-party
            systems with the escrow platform, including Alipay, increasing
            global revenue.
          </>,
          <>
            Developed an augmented reality kit for the Cameroon breweries, one
            of the very first in Cameroon, which has enabled them to
            substantially increase their customer base.
          </>,
          <>
            Continuous Integration/Deployment Pipeline Integration, pull
            requests, code reviews, load/stress testing, unit/integration/e2e
            testing
          </>,
        ],
        images: [],
      },
      {
        company: "Innovative group tech",
        timeframe: "01/2018 - 12/2018",
        role: "Software Engineer, Intern",
        achievements: [
          <>
            Developed Babillard: the official mobile application for Cameroonian
            universities which purpose is to connect the students and the
            administration and facilitate communication between these two
            entities.
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
        name: "University of Yaounde I",
        description: <>Studied Physics, Mechanical Engineering</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Android",
        description: (
          <>
            Jetpack Compose, Kotlin Coroutines, Dagger Hilt, Room DB, MVVM
            Architecture, Material Design 3...
          </>
        ),
        images: [],
      },
      {
        title: "KMP",
        description: (
          <>
            Kotlin Multiplatform, Compose Multiplatform, SQLDelight, Ktor
            Client, Koin DI...
          </>
        ),
        images: [],
      },
      {
        title: "Flutter",
        description: (
          <>
            Riverpod, Bloc, GoRouter, Dio, Freezed, Flutter Bloc, Material 3
            Design...
          </>
        ),
        images: [],
      },
      {
        title: "NextJs with Typescript",
        description: (
          <>
            Server Components, App Router, tRPC, Prisma, TailwindCSS,
            NextAuth.js...
          </>
        ),
        images: [],
      },
      {
        title: "SpringBoot java and kotlin",
        description: (
          <>
            Spring WebFlux, Spring Security, Spring Data JPA, Kotlin Coroutines,
            Docker, Kubernetes...
          </>
        ),
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
