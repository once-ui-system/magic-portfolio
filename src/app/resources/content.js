import { Logo } from "@/once-ui/components";

const person = {
  firstName: "Lara",
  lastName: "Kirkute",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Sozialpädagogin",
  avatar: "/images/avatar.jpg",
  email: "kontakt@kirkute.de",
  location: "Europe/Berlin", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "German"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
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
    name: "E-Mail",
    icon: "email",
    link: `mailto:${person.email}`,
  },
  {
    name: "Impressum",
    icon: "info",
    link: `/impressum`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `Home - ${person.lastName}.de`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Soziale catchy headline</>,
  featured: {
    display: false,
    title: <>Recent project: <strong className="ml-4">Once UI</strong></>,
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      Ich bin {person.firstName}, Sozialpädagogin mit Herz und Engagement. 
      <br /> Mein Ziel ist es, Menschen in schwierigen Lebenslagen zu begleiten und gemeinsam Lösungen zu finden.
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
    subItems: true,
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
    title: "Einführung",
    description: (
    <>
      Lara ist Sozialpädagogin aus Nürnberg mit Leidenschaft für die Unterstützung von Menschen in herausfordernden Lebenssituationen.
      <br />
      Ihr Schwerpunkt liegt auf individueller Beratung, sozialer Begleitung und der Entwicklung nachhaltiger Lösungswege.
      <br />
      Sie engagiert sich sowohl beruflich als auch ehrenamtlich für soziale Gerechtigkeit und Chancengleichheit.
    </>
  ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Berufserfahrung",
    experiences: [
      {
        company: "Marburg Klinik",
        timeframe: "2019 - 2020",
        role: "Freiwilliges Soziales Jahr",
        achievements: [
          <>
            Viel gelernt
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-05.jpg",
            alt: "Marburg Klinik",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studium",
    institutions: [
      {
        name: "Soziale Arbeit (B.A.)",
        description: <>Technische Hochschule Nürnberg Georg Simon Ohm<br></br>(20xx - 20xx)</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Ausbildungen & Seminare",
    skills: [
      {
        title: "Basisseminar PSNV (Psychische Erste Hilfe)",
        description: <>Malteser<br></br>(20xx)</>,
        images: [],
      },
      {
        title: "Aufbauseminar Krisenintervention (Psychosoziale Akuthilfe)",
        description: <>Malteser<br></br>(20xx)</>,
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
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
