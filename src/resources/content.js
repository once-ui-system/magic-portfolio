import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Radical",
  lastName: "SMP",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Minecraft 服务器",
  avatar: "/images/avatar.jpg",
  email: "have-not-email-yet@example.com",
  location: "Asia/Shanghai", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "中文"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      We occasionally send out updates about servers, community events, etc.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://www.github.com/RadicalSMP",
  },
  {
    name: "Bilibili",
    icon: "bilibili",
    link: "https://www.bilibili.com",
  },
  {
    name: "QQ群",
    icon: "qq",
    link: "https://qm.qq.com/cgi-bin/qm/qr?k=HXg7R5F1Io2yZ7bSsyfFUokTCRX7NIhN&jump_from=webapi&authKey=JTUEgr+D3vS/qs5fl3aJG/UNAx/UbBb3ePZnVvDa3q3DSCRacNLPjt5htZYkUbz2",
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
  title: `${person.name} Server`,
  description: `${person.role} 的官方网站`,
  headline: <>根号的离谱服务器</>,
  featured: {
    display: true,
    title: <>目前的服务器版本: <strong className="ml-4">Java 1.21.7</strong></>,
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      欢迎来到根号的离谱服务器！<br />
      作为一个Minecraft群组服务器, 我们不仅有着良好的游戏环境, 更有着丰富的社区活动和交流平台。<br />
      目前, 我们以Velocity实现互通, 拥有Paper端大厅与Fabric端生存服务器, 版本为Java 1.21.7。<br />

    </>
  ),
};

const about = {
  path: "/about",
  label: "关于我们",
  title: `关于 - ${person.name}`,
  description: `遇见 ${person.name}, 一个Minecraft交流社区`,
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
    title: "概要",
    description: (
      <>
        根号的离谱服务器是一个Minecraft群组服务器, 旨在为玩家提供一个良好的游戏环境和丰富的社区活动。<br />
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "发展历程",
    experiences: [
      {
        company: "二周目",
        timeframe: "2025 - 至今",
        role: "新版本, 新特性, 新体验",
        achievements: [
          <>
            以Velocity实现互通, 开创根号新篇章; 从零开始, 打造全新服务器。
          </>,
          <>
            期待你的加入, 一起探索未知的Minecraft世界!
          </>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/projects/project-01/cover-01.jpg",
            alt: "二周目",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "一周目",
        timeframe: "2022 - 2025",
        role: "根号起源",
        achievements: [
          <>
            由Fabric+MCDR构建而成.
          </>,
          <>
            在众多玩家的努力下欣欣向荣.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Figma",
        description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
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
      {
        title: "Next.js",
        description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
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

const blog = {
  path: "/blog",
  label: "博客",
  title: "服务器中的点点滴滴",
  description: `${person.name}的点点滴滴`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "展示",
  title: `展示 - ${person.name}`,
  description: `${person.name}的成果展示`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "图库",
  title: `图库 - ${person.name}`,
  description: `${person.name} 的图库`,
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
      src: "/images/gallery/horizontal-5.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-6.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-7.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-8.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-9.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
