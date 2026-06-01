import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Row, Text } from "@once-ui-system/core";

const personEn: Person = {
  firstName: "Mindsend",
  lastName: "Datatech",
  name: "Mindsend Datatech",
  role: "Applied engineering and data science team building robust software, AI integrations, and digital infrastructure.",
  avatar: "/images/avatar.png",
  email: "info@mindsend.xyz",
  location: "America/Sao_Paulo", 
  languages: ["English", "Portuguese"],
};

const personPt: Person = {
  ...personEn,
  role: "Equipe de engenharia aplicada e ciência de dados construindo software robusto, integrações de IA e infraestrutura digital.",
};

const newsletterEn: Newsletter = {
  display: false,
  title: <>Subscribe to {personEn.firstName}'s Newsletter</>,
  description: (
    <>I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.</>
  ),
};

const newsletterPt: Newsletter = {
  display: false,
  title: <>Inscreva-se na Newsletter de {personPt.firstName}</>,
  description: (
    <>Escrevo ocasionalmente sobre design, tecnologia e compartilho pensamentos sobre a interseção entre criatividade e engenharia.</>
  ),
};

const social: Social = [
  { name: "GitHub", icon: "github", link: "https://github.com/mindsend-datatech" },
];

const homeEn: Home = {
  path: "/",
  image: "https://opengraph.b-cdn.net/production/images/c53b648f-c423-4882-b67f-b10117ea61e5.jpg?token=-m4wfD7XKjkhxfcKZRbRrPyQYbCEX3VdsTSShF51NbY&height=630&width=1200&expires=33295179384",
  label: "Home",
  title: `${personEn.name}`,
  description: `${personEn.name}`,
  headline: <>Just beyond human </>,
  featured: {
    display: false,
    title: <>Recent project: <strong className="ml-4">Kadena Cabinet</strong></>,
    href: "/work/cabinet",
  },
  subline: <>Transforming complex challenges into accessible, seamless solutions for frontier technologies{" "}</>,
};

const homePt: Home = {
  ...homeEn,
  headline: <>Além dos limites humanos</>,
  featured: {
    display: false,
    title: <>Projeto recente: <strong className="ml-4">Kadena Cabinet</strong></>,
    href: "/work/cabinet",
  },
  subline: <>Transformando desafios complexos em soluções acessíveis e eficientes para tecnologias de fronteira{" "}</>,
};

const aboutEn: About = {
  path: "/about",
  label: "About",
  title: `About – ${personEn.name}`,
  description: `Meet the ${personEn.name} crew`,
  tableOfContent: { display: true, subItems: false },
  avatar: { display: true },
  calendar: { display: true, link: "https://cal.com/mindsend" },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32' }}>
        <Text variant="body-default-l" onBackground="neutral-strong" style={{ fontSize: '1.5rem', lineHeight: '1.6', margin: 0 }}>
          We are an applied engineering and data science team focused on building robust, scalable software and AI integrations for modern systems. With deep technical foundations across infrastructure, backend development, and data architecture, we turn complex challenges into streamlined, production-ready solutions.
        </Text>
        <Text variant="body-default-l" onBackground="neutral-strong" style={{ fontSize: '1.5rem', lineHeight: '1.6', margin: 0 }}>
          Our objective is to deliver practical, secure digital infrastructure that scales. Whether designing data pipelines, developing applications, or deploying machine learning models, our focus remains on engineering excellence and sustainable software architecture.
        </Text>
      </div>
    ),
  },
  work: {
    display: true,
    title: "Our team",
    experiences: [
      {
        company: "Ariel Serranoni",
        timeframe: " ",
        role: "Co-founder, Applied Mathematician & Software Engineer",
        linkedin: "https://www.linkedin.com/in/ariel-serranoni-1b762815a/",
        github: "https://github.com/aserranoni/",
        achievements: [
          "Ariel is an applied mathematician with a Master’s in Computer Science and a strong background in software architecture. With solid mathematical foundations, he focuses on designing, building, and scaling complex backend infrastructure, decentralized protocols, and modern Web applications.",
        ],
        images: [{ src: "/images/og/ariel.jpg", alt: "Ariel Serranoni", width: 1, height: 1 }]
      },
      {
        company: "Francisco Miranda",
        timeframe: " ",
        role: "Co-founder, Data Scientist & Software Engineer",
        linkedin: "https://www.linkedin.com/in/chicodias/",
        github: "https://github.com/chicodias",
        achievements: [
          "Francisco brings analytical rigor and a systematic approach to software development. With a background in Statistics and Data Science and an ongoing MBA in Software Engineering, he excels at structuring data pipelines, designing backend infrastructure, and bridging analytical models with production-ready applications.",
        ],
        images: [{ src: "/images/og/chico.jpg", alt: "Francisco Miranda", width: 1, height: 1 }]
      },
    ],
  },
  studies: { display: false, title: "Studies", institutions: [] },
  technical: {
    display: true,
    title: "Our Stack",
    skills: [
      { title: "Pact", description: "Smart contract language for Kadena.", images: [{ src: "/icons/pact.svg", alt: "Pact", width: 48, height: 48 }], link: "https://kadena.io/pact" },
      { title: "Solidity", description: "Smart contract language for Ethereum.", images: [{ src: "/icons/solidity.svg", alt: "Solidity", width: 48, height: 48 }], link: "https://soliditylang.org/" },
      { title: "TypeScript", description: "Main programming language for frontend and backend.", images: [{ src: "/icons/typescript.svg", alt: "TypeScript", width: 48, height: 48 }], link: "https://www.typescriptlang.org/" },
      { title: "Next.js", description: "Framework for building React applications.", images: [{ src: "/icons/nextdotjs.svg", alt: "Next.js", width: 48, height: 48 }], link: "https://nextjs.org/" },
      { title: "Vercel", description: "Platform for deployment and hosting.", images: [{ src: "/icons/vercel.svg", alt: "Vercel", width: 48, height: 48 }], link: "https://vercel.com/" },
      { title: "C#", description: "Backend programming language.", images: [{ src: "/icons/dotnet.svg", alt: "C#", width: 48, height: 48 }], link: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
      { title: "PostgreSQL", description: "Relational database management system.", images: [{ src: "/icons/postgresql.svg", alt: "PostgreSQL", width: 48, height: 48 }], link: "https://www.postgresql.org/" },
      { title: "MongoDB", description: "NoSQL database management system.", images: [{ src: "/icons/mongodb.svg", alt: "MongoDB", width: 48, height: 48 }], link: "https://www.mongodb.com/" },
      { title: "Python", description: "General-purpose programming language.", images: [{ src: "/icons/python.svg", alt: "Python", width: 48, height: 48 }], link: "https://python.org" },
      { title: "R", description: "Language for statistical computing.", images: [{ src: "/icons/r.svg", alt: "R", width: 48, height: 48 }], link: "https://www.r-project.org/" },
      { title: "Linux", description: "Open-source operating system.", images: [{ src: "/icons/linux.svg", alt: "Linux", width: 48, height: 48 }], link: "https://www.kernel.org/" },
      { title: "Docker", description: "Platform for containerized applications.", images: [{ src: "/icons/docker.svg", alt: "Docker", width: 48, height: 48 }], link: "https://www.docker.com/" },
      { title: "TailwindCSS", description: "Utility-first CSS framework.", images: [{ src: "/icons/tailwindcss.svg", alt: "TailwindCSS", width: 48, height: 48 }], link: "https://tailwindcss.com" },
      { title: "Github", description: "Platform for code hosting and version control.", images: [{ src: "/icons/github.svg", alt: "Github", width: 48, height: 48 }], link: "https://github.com" },
      { title: "WalletConnect", description: "Protocol for connecting dApps to mobile wallets.", images: [{ src: "/icons/walletconnect.svg", alt: "WalletConnect", width: 48, height: 48 }], link: "https://walletconnect.network" },
      { title: "Git", description: "Distributed version control system.", images: [{ src: "/icons/git.svg", alt: "Git", width: 48, height: 48 }], link: "https://git-scm.com/" },
    ],
  },
};

const aboutPt: About = {
  ...aboutEn,
  label: "Sobre",
  title: `Sobre – ${personPt.name}`,
  description: `Conheça a equipe ${personPt.name}`,
  intro: {
    display: true,
    title: "Introdução",
    description: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32' }}>
        <Text variant="body-default-l" onBackground="neutral-strong" style={{ fontSize: '1.5rem', lineHeight: '1.6', margin: 0 }}>
          Somos uma equipe de engenharia aplicada e ciência de dados focada na construção de software escalável e robusto, e integrações de IA para sistemas modernos. Com profundas bases técnicas em infraestrutura, desenvolvimento backend e arquitetura de dados, transformamos desafios complexos em soluções eficientes e prontas para produção.
        </Text>
        <Text variant="body-default-l" onBackground="neutral-strong" style={{ fontSize: '1.5rem', lineHeight: '1.6', margin: 0 }}>
          Nosso objetivo é fornecer infraestrutura digital prática e segura que seja escalável. Seja projetando pipelines de dados, desenvolvendo aplicativos ou implantando modelos de aprendizado de máquina, nosso foco permanece na excelência em engenharia e na arquitetura de software sustentável.
        </Text>
      </div>
    ),
  },
  work: {
    display: true,
    title: "Nossa equipe",
    experiences: [
      {
        company: "Ariel Serranoni",
        timeframe: " ",
        role: "Cofundador, Matemático Aplicado e Engenheiro de Software",
        linkedin: "https://www.linkedin.com/in/ariel-serranoni-1b762815a/",
        github: "https://github.com/aserranoni/",
        achievements: [
          "Ariel é um matemático aplicado com mestrado em Ciência da Computação e forte experiência em arquitetura de software. Com sólidas bases matemáticas, ele foca no design, construção e escalonamento de infraestrutura backend complexa, protocolos descentralizados e aplicações web modernas.",
        ],
        images: [{ src: "/images/og/ariel.jpg", alt: "Ariel Serranoni", width: 1, height: 1 }]
      },
      {
        company: "Francisco Miranda",
        timeframe: " ",
        role: "Cofundador, Cientista de Dados e Engenheiro de Software",
        linkedin: "https://www.linkedin.com/in/chicodias/",
        github: "https://github.com/chicodias",
        achievements: [
          "Francisco traz rigor analítico e uma abordagem sistemática para o desenvolvimento de software. Com experiência em Estatística e Ciência de Dados e um MBA em andamento em Engenharia de Software, ele se destaca na estruturação de pipelines de dados, design de infraestrutura backend e conexão de modelos analíticos com aplicações de produção.",
        ],
        images: [{ src: "/images/og/chico.jpg", alt: "Francisco Miranda", width: 1, height: 1 }]
      },
    ],
  },
  technical: {
    display: true,
    title: "Nossas Tecnologias",
    skills: [
      { title: "Pact", description: "Linguagem de smart contracts para Kadena.", images: [{ src: "/icons/pact.svg", alt: "Pact", width: 48, height: 48 }], link: "https://kadena.io/pact" },
      { title: "Solidity", description: "Linguagem de smart contracts para Ethereum.", images: [{ src: "/icons/solidity.svg", alt: "Solidity", width: 48, height: 48 }], link: "https://soliditylang.org/" },
      { title: "TypeScript", description: "Linguagem principal para frontend e backend.", images: [{ src: "/icons/typescript.svg", alt: "TypeScript", width: 48, height: 48 }], link: "https://www.typescriptlang.org/" },
      { title: "Next.js", description: "Framework para construção de aplicações React.", images: [{ src: "/icons/nextdotjs.svg", alt: "Next.js", width: 48, height: 48 }], link: "https://nextjs.org/" },
      { title: "Vercel", description: "Plataforma de hospedagem e deployment.", images: [{ src: "/icons/vercel.svg", alt: "Vercel", width: 48, height: 48 }], link: "https://vercel.com/" },
      { title: "C#", description: "Linguagem de programação backend.", images: [{ src: "/icons/dotnet.svg", alt: "C#", width: 48, height: 48 }], link: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
      { title: "PostgreSQL", description: "Sistema de gerenciamento de banco de dados relacional.", images: [{ src: "/icons/postgresql.svg", alt: "PostgreSQL", width: 48, height: 48 }], link: "https://www.postgresql.org/" },
      { title: "MongoDB", description: "Sistema de gerenciamento de banco de dados NoSQL.", images: [{ src: "/icons/mongodb.svg", alt: "MongoDB", width: 48, height: 48 }], link: "https://www.mongodb.com/" },
      { title: "Python", description: "Linguagem de programação de uso geral.", images: [{ src: "/icons/python.svg", alt: "Python", width: 48, height: 48 }], link: "https://python.org" },
      { title: "R", description: "Linguagem para computação estatística.", images: [{ src: "/icons/r.svg", alt: "R", width: 48, height: 48 }], link: "https://www.r-project.org/" },
      { title: "Linux", description: "Sistema operacional de código aberto.", images: [{ src: "/icons/linux.svg", alt: "Linux", width: 48, height: 48 }], link: "https://www.kernel.org/" },
      { title: "Docker", description: "Plataforma para aplicações em contêineres.", images: [{ src: "/icons/docker.svg", alt: "Docker", width: 48, height: 48 }], link: "https://www.docker.com/" },
      { title: "TailwindCSS", description: "Framework CSS utilitário.", images: [{ src: "/icons/tailwindcss.svg", alt: "TailwindCSS", width: 48, height: 48 }], link: "https://tailwindcss.com" },
      { title: "Github", description: "Plataforma de hospedagem de código e controle de versão.", images: [{ src: "/icons/github.svg", alt: "Github", width: 48, height: 48 }], link: "https://github.com" },
      { title: "WalletConnect", description: "Protocolo para conectar dApps a carteiras mobile.", images: [{ src: "/icons/walletconnect.svg", alt: "WalletConnect", width: 48, height: 48 }], link: "https://walletconnect.network" },
      { title: "Git", description: "Sistema de controle de versão distribuído.", images: [{ src: "/icons/git.svg", alt: "Git", width: 48, height: 48 }], link: "https://git-scm.com/" },
    ],
  },
};

const blogEn: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Building at the edge of technology",
  description: `Insights, deep dives, and lessons from ${personEn.name} on building AI integrations, infrastructure, and real-world software applications.`,
};

const blogPt: Blog = {
  ...blogEn,
  title: "Construindo na fronteira da tecnologia",
  description: `Insights, análises profundas e lições da ${personPt.name} sobre construção de integrações de IA, infraestrutura e aplicações de software do mundo real.`,
};

const workEn: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${personEn.name}`,
  description: `Projects by ${personEn.name}`,
};

const workPt: Work = {
  ...workEn,
  label: "Trabalhos",
  title: `Projetos – ${personPt.name}`,
  description: `Projetos por ${personPt.name}`,
};

const galleryEn: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${personEn.name}`,
  description: `A photo collection by ${personEn.name}`,
  images: [{ src: "/images/hero.png", alt: "image", orientation: "horizontal" }],
};

const galleryPt: Gallery = {
  ...galleryEn,
  label: "Galeria",
  title: `Galeria de fotos – ${personPt.name}`,
  description: `Uma coleção de fotos de ${personPt.name}`,
};

type DictionaryType = {
  person: Person;
  newsletter: Newsletter;
  home: Home;
  about: About;
  blog: Blog;
  work: Work;
  gallery: Gallery;
};

const dictionaries: Record<string, DictionaryType> = {
  "en": {
    person: personEn,
    newsletter: newsletterEn,
    home: homeEn,
    about: aboutEn,
    blog: blogEn,
    work: workEn,
    gallery: galleryEn,
  },
  "pt-BR": {
    person: personPt,
    newsletter: newsletterPt,
    home: homePt,
    about: aboutPt,
    blog: blogPt,
    work: workPt,
    gallery: galleryPt,
  }
};

export const getDictionary = (locale: string) => {
  return dictionaries[locale] || dictionaries["en"];
};

// Fallback exports for backward compatibility where locale isn't available
export const person = personEn;
export { social };
export const newsletter = newsletterEn;
export const home = homeEn;
export const about = aboutEn;
export const blog = blogEn;
export const work = workEn;
export const gallery = galleryEn;
