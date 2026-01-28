import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work, CV } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Oscar",
  lastName: "Garcia",
  name: `Oscar Garcia`,
  role: "Développeur web / DevOps Junior",
  avatar: "/images/avatar.jpg",
  email: "oscargarcia.og@proton.me",
  location: "Europe/Paris", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Français", "Anglais"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "CV",
    icon: "document",
    link: "/cv",
    essential: true,
  },
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/PabloHavane",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/oscargarcia-dev/",
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
  description: `Portfolio montrant mon travail en tant que ${person.role}`,
  headline: <>Bonjour,</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Mon CV</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          (cliquez ici pour le télécharger)
        </Text>
      </Row>
    ),
    href: "/cv",
  },
  subline: (
    <>
    Je m'appelle Oscar, je suis alternant développeur web / Devops chez <Text as="span" size="xl" weight="strong">VIASANTE Mutuelle</Text>. Et ceci est mon portfolio.
</>
  ),
};

const about: About = {
  path: "/about",
  label: "A propos",
  title: `A propos – ${person.name}`,
  description: `Rencontrez ${person.name}, ${person.role} de ${person.location}`,
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
        Etudiant alternant en informatique âgé de 21 ans passionné par la programmation web, le DevOps et la cybersécurité. 
        <br />
        Actuellement en 3e année de BUT Informatique à l'IUT Paul Sabatier de Toulouse, je suis à la recherche d'une alternance en cybersécurité ou DevSecOps pour continuer mes études en école d'ingénieur.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Experience",
    experiences: [
      {
        company: "VIASANTE Mutuelle",
        timeframe: "Aout 2025 - Présent",
        role: "Alternant Développeur / DevOps",
        achievements: [
          <>
            Conteneurisation et industrialisation des développements et des déploiements de l’équipe grâce au DevOps.
          </>,
          <>
            Déploiement de l'application interne d’archivage développée lors de mon stage.
          </>,
          <>
            Participation au RUN et au traitement de tickets GLPI.
          </>,
          <>
            Développement d’évolutions sur les applications internes.
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "Once UI Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "VIASANTE Mutuelle",
        timeframe: "Avril 2025 - Juin 2025",
        role: "Stagiaire Développeur Web / DevOps",
        achievements: [
          <>
            Développement d’une application web full-stack interne pour le suivi d’archivage de documents contenant des données personnelles.
          </>,
          <>
            Conteneurisation de l’application pour préparer au déploiement futur.
          </>,
        ],
        images: [],
      },
      {
        company: "E. Leclerc Saint-Orens",
        timeframe: "Avril 2024 - Juillet 2025",
        role: "Job étudiant - Employé Polyvalent",
        achievements: [
          <>
            Samedi : Mise en rayon au rayon Fruits et Légumes
          </>,
          <>
            Dimanche : Vendeur et Conseiller au rayon Multimédia en autonomie
          </>,
        ],
        images: [],
      },
      {
        company: "BDE ATIDUT",
        timeframe: "Mars 2023 - Mars 2024",
        role: "Président du Bureau des Étudiants",
        achievements: [
          <>
            Gestion/Pilotage de l’association et de la vie étudiante sur le campus
          </>,
          <>
            Organisation d’événements (soirées, voyages, activités sportives, culturelles, etc.) pour les étudiants.
          </>,
          <>
            Encadrement et gestion d’équipe lors du Week-End d’Intégration Inter-IUT (850 participants)
          </>
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Formation",
    institutions: [
      {
        name: "BUT Informatique",
        description: <>En 3e année à l'IUT Paul Sabatier (Toulouse, 31), parcours Déploiement d’Applications Communicantes et Sécurisées</>,
      },
      {
        name: "Baccalauréat Général",
        description: <>Physique/Science de l’ingénieur option Mathématiques complémentaires, mention Bien - Parcours Espace - Lycée Pierre Paul Riquet, St-Orens de Gameville 31</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Compétences",
    skills: [
      { // Réaliser
        title: "Réaliser",
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
      { // Optimiser
        title: "Optimiser",
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
      { // Adminisrer
        title: "Adminisrer",
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
      { // Gérer
        title: "Gérer",
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
      { // Conduire
        title: "Conduire",
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
      { // Collaborer
        title: "Collaborer",
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

const work: Work = {
  path: "/work",
  label: "Expériences",
  title: `Projets – ${person.name}`,
  description: `Projets de développement par ${person.name}`,
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

const cv : CV = {
  path: "/cv",
  label: "CV",
  title: `CV – ${person.name}`,
  description: `Curriculum Vitae de ${person.name}`,
  filePath: "/cv-oscar-garcia.pdf",
};

export { person, social, newsletter, home, about, blog, work, gallery, cv };
