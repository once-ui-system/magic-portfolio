import type { About, News, Podcast, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "José",
  lastName: "Martínez Estrada",
  name: `José`,
  role: "Desarrollador Web",
  avatar: "/images/avatar.jpg",
  email: "josemartinezestrada111@gmail.com",
  location: "Europe/Madrid",
  city: "Almería, España",
  region: "Andalucía",
  countryCode: "ES",
  languages: ["Español (nativo)", "Inglés (A2)", "Francés (A1)"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Suscríbete a mi boletín para no perderte las últimas novedades.</>,
  description: (
    <>Mi boletín de noticias semanales sobre novedades en el mundo del desarrollo e informática.</>
  ),
};

/** Contacto directo por WhatsApp, usado por el botón flotante de contacto. */
const whatsapp = {
  number: "34644497129",
  url: "https://wa.me/34644497129",
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/jxse111",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/jos%C3%A9-mart%C3%ADnez-estrada-997b77208/",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Inicio",
  title: `Portfolio Profesional de ${person.name}`,
  description: `Portfolio de ${person.firstName} ${person.lastName}, ${person.role} full-stack en ${person.city}. Proyectos con Next.js, Angular, PHP, Java y Docker.`,
  headline: <>Haciendo que el diseño cobre vida en cada línea de código.</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">ESQUILS</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Proyectos destacados
        </Text>
      </Row>
    ),
    href: "/work/Esquils",
  },
  subline: (
    <>
      Mi nombre es José, soy el desarrollador web. Creo y desarrollo proyectos web para empresas y
      clientes.
      <br /> Después del trabajo desarrollo mis propios proyectos y sigo formándome.
    </>
  ),
  /** Frase corta bajo el titular: qué hago exactamente, sin rodeos. */
  intro: (
    <>
      Desarrollador web full-stack en {person.city}. Construyo aplicaciones a medida para empresas:
      la interfaz, la lógica de servidor, la base de datos y el despliegue.
    </>
  ),
  /** Tecnologías principales, para el vistazo rápido de quien revisa el perfil. */
  stack: [
    { name: "Next.js", icon: "nextjs" },
    { name: "React", icon: "react" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Angular", icon: "angular" },
    { name: "PHP", icon: "php" },
    { name: "Java", icon: "java" },
    { name: "MySQL", icon: "mysql" },
    { name: "Docker", icon: "docker" },
  ],
};

const about: About = {
  path: "/about",
  label: "Sobre Mí",
  title: `Sobre mí – ${person.name}`,
  description: `Conoce a ${person.firstName} ${person.lastName}, ${person.role} full-stack en ${person.city}: su experiencia, formación y habilidades técnicas.`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    // Desactivado: el enlace era el de ejemplo de la plantilla y llevaba a la web
    // de cal.com, no a una agenda tuya. Para reactivarlo, crea tu enlace en
    // cal.com (o Calendly), ponlo abajo y cambia display a true.
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Presentación",
    description: (
      <>
        Apasionado por la tecnología y el desarrollo web. Siempre estoy en busca de aprender y
        mejorar, tanto en el ámbito de la programación como en el de la informática, abarcando desde
        el hardware hasta el software. Soy perseverante y disfruto viendo los resultados de mi
        esfuerzo, compartiendo ideas y aprendiendo de los demás.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Experiencia laboral",
    experiences: [
      {
        company: "Berdea SAT",
        timeframe: "Actualmente",
        role: "Full-stack Developer",
        achievements: [
          <>
            Actualmente trabajo como desarrollador full-stack en Berdea SAT, donde colaboro en el
            desarrollo de aplicaciones web y la gestión de proyectos.
          </>,
        ],
      },
      {
        company: "TECH LINKU GROUP SL",
        timeframe: "03/2025 - 06/2025",
        role: "Técnico en prácticas",
        achievements: [
          <>
            Colaboré con los departamentos de IT, comercial y técnico en la gestión de productos
            electrónicos, control de inventario y desarrollo web, así como en el diseño de elementos
            visuales publicitarios para la página.
          </>,
        ],
      },
      {
        company: "Updigital Almería",
        timeframe: "03/2022 - 06/2022",
        role: "Técnico en reparación de equipos informáticos",
        achievements: [
          <>Realicé la parte de montaje, reparación y mantenimiento de equipos informáticos.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Estudios",
    institutions: [
      {
        name: "IES Aguadulce",
        description: <>DAW: Formación de grado superior en Desarrollo de Aplicaciones Web.</>,
      },
      {
        name: "IES Campos de Níjar",
        description: <>SMR: Formación de grado medio en Sistemas Microinformáticos y Redes.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Habilidades técnicas",
    skills: [
      {
        title: "Primer año académico (DAW)",
        description: (
          <>
            Experiencia en programación en Java, diseño y gestión de bases de datos con MySQL/SQL
            Live, desarrollo de interfaces básicas con HTML y CSS, y creación de pruebas unitarias
            utilizando JUnit.
          </>
        ),
        tags: [
          {
            name: "java",
            icon: "java",
          },
          {
            name: "MySQL",
            icon: "MySQL",
          },
          {
            name: "HTML",
            icon: "HTML",
          },
          {
            name: "CSS",
            icon: "CSS",
          },
          {
            name: "JUnit",
            icon: "JUnit",
          },
        ],
      },
      {
        title: "Segundo año académico (DAW)",
        description: (
          <>
            Experiencia en desarrollo con PHP y gestión de bases de datos mediante PhpMyAdmin.
            Manejo de entornos locales con XAMPP, desarrollo de APIs RESTful y uso del framework
            Angular 17. Durante mi proyecto de fin de curso adquirí conocimientos prácticos en
            Docker, incluyendo Docker Compose y la creación de Dockerfiles.
          </>
        ),
        tags: [
          {
            name: "php",
            icon: "php",
          },
          {
            name: "angular",
            icon: "angular",
          },
          {
            name: "phpmyadmin",
            icon: "phpmyadmin",
          },
          {
            name: "docker",
            icon: "docker",
          },
        ],
        // optional: leave the array empty if you don't want to display images
        images: [
          {
            src: "/images/projects/algrano/ALGRANO.png",
            alt: "Captura de la aplicación web Algrano",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Habilidades adquiridas en Sistemas Microinformáticos y Redes (SMR)",
        description: (
          <>
            Experiencia en ensamblaje y mantenimiento de equipos de sobremesa y portátiles,
            incluyendo la instalación, configuración y optimización del sistema para un rendimiento
            eficiente. Conocimientos en ciberseguridad básica y administración de redes locales
            (LAN/WLAN), así como en la detección y resolución de incidencias técnicas. Durante la
            formación adquirí competencias en instalación de sistemas operativos, gestión de
            servidores, configuración de dispositivos de red, soporte técnico a usuarios y seguridad
            informática a nivel básico.
          </>
        ),
        tags: [
          {
            name: "apache tomcat",
            icon: "apache Tomcat",
          },
          {
            name: "ubuntu server",
            icon: "ubuntu server",
          },
          {
            name: "windows server",
            icon: "windows server",
          },
        ],
      },
    ],
  },
};

const news: News = {
  path: "/noticias",
  label: "Noticias",
  title: "Noticias de Apple, IA y tecnología",
  description: `Últimas noticias de Apple, inteligencia artificial y tecnología, seleccionadas y actualizadas automáticamente en el portfolio de ${person.firstName} ${person.lastName}.`,
  // Las fuentes RSS se configuran en src/lib/news/sources.ts
};

const podcast: Podcast = {
  path: "/podcast",
  label: "Apple Slices",
  title: "Apple Slices — Apple y tecnología en trozos",
  description: `Trozos de actualidad sobre Apple, inteligencia artificial y desarrollo, grabados por ${person.firstName} ${person.lastName} paseando junto al mar.`,
};

const work: Work = {
  path: "/work",
  label: "Proyectos",
  title: `Mis proyectos`,
  description: `Proyectos web desarrollados por ${person.firstName} ${person.lastName}: aplicaciones a medida para empresas y clientes.`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Galería de imágenes",
  title: `Galería de imágenes – ${person.name}`,
  description: `Álbum de fotografías de ${person.firstName} ${person.lastName}.`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/Paisaje2.jpg",
      alt: "Escollera de rocas junto al mar en un día despejado, con la costa al fondo",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Paisaje1.jpg",
      alt: "Atardecer sobre una zona de matorral costero, con una valla de madera y montañas en el horizonte",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Paisaje4.jpg",
      alt: "Torre de piedra encajada en la pared rocosa de un barranco",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/Paisaje3.jpg",
      alt: "Cala de aguas turquesas con barcas fondeadas y una montaña de doble pico al fondo",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/Paisaje5.jpg",
      alt: "Cielo anaranjado al anochecer surcado por la estela de un avión",
      orientation: "vertical",
    },
  ],
};

export { person, social, whatsapp, newsletter, home, about, news, podcast, work, gallery };
