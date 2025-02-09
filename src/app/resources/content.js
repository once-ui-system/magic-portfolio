import { InlineCode } from "@/once-ui/components";
import { display } from "./config";

const person = {
  firstName: "Gina",
  lastName: "Horch",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Scrum Master and Full Stack Developer",
  avatar: "/images/GinaHeadShot.webp",
  location: "Australia/Perth", // Expecting the IANA time zone identifier
  languages: ["English", "German"], 
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/GinaHorch",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/gina-horch",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:social.insight.solutions@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Kaya, welcome to my Portfolio</>,
  subline: (
    <>
      I'm Gina, a certified Scrum Master and Full-Stack Developer passionate about empowering teams
      to deliver impactful solutions through Agile methodologies and scalable user-centred technology.
      Explore my portfolio to learn more about my work and skills.
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
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
      <p>
      Gina is a certified Scrum Master and Full-Stack Developer with a strong foundation in collaboration, servant leadership, 
      and delivering impactful solutions. With a 22-year career in law enforcement, followed by two years in research, she has 
      spent her professional life fostering cross-functional teamwork, driving innovation, and ensuring alignment between 
      strategy and execution.
      </p>
      <p>
      Her Agile journey began long before formal certification, as she consistently applied key Agile principles — adaptability, 
      transparency, and continuous improvement—while managing high-pressure, multi-agency investigations. As an Investigations Manager 
      at a busy metropolitan police station, she coached and mentored teams to enhance investigative capabilities, balanced competing 
      priorities, and built strong stakeholder relationships. In her role as a Research Assistant, she refined these skills further, 
      facilitating data-driven decision-making and cross-functional collaboration.
      </p>
      <p>
      Now, as a Scrum Master, Gina is dedicated to building high-performing teams by fostering a culture of trust, empowerment, and 
      continuous learning. She excels at removing blockers, optimising workflows, and ensuring that teams stay aligned with business 
      objectives to deliver value-driven outcomes. 
      </p>
      <p>
      In addition to her Agile expertise, Gina brings technical proficiency in full-stack development, crafting scalable, user-centered 
      applications that solve real-world problems. She seamlessly integrates her deep understanding of Agile methodologies with hands-on 
      experience in modern web technologies, ensuring that both teams and products evolve efficiently in dynamic environments. 
      </p>
      <p>
      With a passion for servant leadership, innovation, and continuous improvement, Gina thrives at the intersection of technology 
      and team empowerment, enabling organisations to navigate complexity and achieve meaningful, lasting impact.
      </p>
      </>
    ),
  },
  work: {
    display: false, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "FLY",
        timeframe: "2022 - Present",
        role: "Senior Design Engineer",
        achievements: [
          <>
            Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
            engagement and 30% faster load times.
          </>,
          <>
            Spearheaded the integration of AI tools into design workflows, enabling designers to
            iterate 50% faster.
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
    ],
  },

  technical: {
    display: true, // set to false to hide this section
    title: "A Journey of Service",
    description: (
      <>
      <p>
      Gina has spent her career championing the needs of vulnerable children, victim-survivors, and the wider 
      community. Her decades of service reflect resilience, compassion, respect, and a steadfast commitment
      to empowering individuals and strengthening communities. Whether through law enforcement, research, or
      community leadership, her work embodies a deep commitment to collaborating with others to drive
      meaningful and lasting change.
      </p>
      <br /><br />
      <p>
      Each recognition earned reflects Gina's dedication to fostering empowerment, resilience, and safety 
      within the communities she has worked alongside.
      </p>
      </>
    ),
    services: [
      {
        title: "WA Police Excellence Awards (2017)",
        description: <>Gina was awarded the 9 News WA Police Excellence Award 2017 - Police Officer of the Year
        for her dedication to victim-survivors and their families.</>,
        videos: [
          // optional: leave the array empty if you don't want to display images
          {
            title: "WA Police Excellence Award 2017",
            src: "/images/about/video-thumbnail.webp",
            alt: "WA Police Excellence Award 2017",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Canva Force for Good Scholarship (2024)",
        description: <>Gina was awarded the Canva Force for Good Scholarship, a partnership with She Codes Australia
        supporting women to break into tech and building meaningful careers through education, inclusion, and empowerment.</>,
        images: [{
          
      }]  
      },
      {
        title: "First Class Honours in Psychology (2021)",
          description: <>Gina was awarded First Class Honours in Psychology at Edith Cowan University (2021) with her thesis
          focused on improving responses for children and young people who have displayed harmful sexual behaviours.</>,
        images: [{
          
      }]  
      },
      {
        title: "WA Police Medal (2018)",
        description: <>Gina was awarded the WA Police Medal for 10 years of diligent and ethical service with the
          Western Australia Police Force.</>,
        images: [{
          
      }]  
      },
      {
        title: "Certificate of Outstanding Performance (2017)",
        description: <>Gina was awarded the Certificate of Outstanding Performance in recognition for her nomination for the 2017
        Australian Council of Women and Policing "Excellence in Policing" Awards in the category of "Most Outstanding Female Investigator".</>,
        images: [
          
        ],
      },
      {
        title: "Certificate of Outstanding Performance (2015)",
        description: <>Gina was awarded the Certificate of Outstanding Performance for her dedication and exemplary compassion to victims of
        the Australian Federal Government's Royal Commission into Institutional Child Sex Abuse.</>,
        images: [
          
        ],
      },
      {
        title: "Bravery Award (2005)",
        description: <>Gina was awarded the Bravery Award by the Bavarian Police Force for her decisive actions while off duty in Munich, where she
        intervened to stop the mugging of an elderly man at a train station, ensuring his safety and the arrest of both offenders.</>,
        images: [
          
        ],
      },
    ],
  },
      
   

  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "First Class Honours in Psychology",
        description: <>Completed a Bachelor of Psychology (Honours) at Edith Cowan University (2020-2021).</>,
      },
      {
        name: "Atlassian Agile Project Management",
        description: <>Studied Agile Project Management and Agile Methodologies at Atlassian and received a Professional Certificate (2024).</>,
      },
      {
        name: "Certified SAFe® 6 Scrum Master (SSM)",
        description: <>Completed a two-day course on Lean-Agile principles and practices of the Scaled Agile Framework® (SAFe®) version 6.0. (2025).</>,
      },
      {
        name: "Professional Scrum Master (PSM I)",
        description: <>Completed the Scrum.org learning path and passed the PSM I certification exam, 
        demonstrating a deep understanding of Scrum principles and the ability to apply them to solve complex problems collaboratively (2025).</>,
      },
      {
        name: "Responding to Childhood Trauma",
        description: <>Completed a Professional Certificate in Responding to Childhood Trauma at the University of South Australia (2022).</>,
      },
      {
        name: "Assessing Childhood Trauma",
        description: <>Completed a Professional Certificate in Assessing Childhood Trauma at the University of South Australia (2021).</>,
      },
      {
        name: "Understanding Childhood Trauma",
        description: <>Completed a Professional Certificate in Understanding Childhood Trauma at the University of South Australia (2021).</>,
      },
      {
        name: "Bachelor of Arts (Psychology)",
        description: <>Completed a Bachelor of Arts (Psychology) at Edith Cowan University (2013-2019).</>,
      },
      {
        name: "Investigative Interviewer of Children and Vulnerable Persons",
        description: <>Completed the Investigative Interviewer of Children and Vulnerable Persons (IICVP) course at Western Australia Police Academy (2016).</>,
      },
      {
        name: "Advanced Diploma of Public Safety (Police Investigation)",
        description: <>Studied the Advanced Diploma of Public Safety (Police Investigation) at Western Australia Police Academy (2010-2012).</>,
      },
      {
        name: "Certificate IV in Training and Assessment",
        description: <>Studied the Certificate IV in Training and Assessment at Education Training Advisory Services (2007-2008).</>,
      },
      {
        name: "Diploma of Horticulture",
        description: <>Studied the Diploma of Horticulture at Challenger TAFE (2006-2007).</>,
      },
    ],
  },
};

const agileResources = {
  display: true,
  label: "Agile Resources",
  title: "My Agile Resources",
  description: `A blend of Agile resources by ${person.name}`,
  avatar: {
    display: true,
  },
  intro: {
    display: true,
    title: "My Agile Resources",
    description: (
      <>
      <p>
      Welcome to my go-to collection of essential resources for Scrum Masters! Whether you're just starting your Agile journey 
      or you're a seasoned pro, I’ve gathered the key tools, guides, and references to help you excel. From the Agile Manifesto 
      to PSM I (Scrum.org) and SAFe 6.0, this page is packed with everything you need to grow, adapt, and thrive in your role.
      </p>
      </>
    ),
  manifesto: {
      display: true, // set to false to hide this section
      title: "The Agile Manifesto and Core Principles",
    },
  psm: {
      display: true, // set to false to hide this section
      title: "Professional Scrum Master (PSM I) Resources",
      images:[
        {
          src: "/images/skills/ScrumMasterPoster.webp",
          alt: "Scrum Master Poster from Scrum.org",
          width: 400,
          height: 600,
      }],
      pdf: [
        {
          src: "/images/pdf/ScrumMasterPoster.pdf",
          alt: "Scrum Master Poster from Scrum.org",
          width: 400,
          height: 600,
      }],
    },
  safe: {
      display: true, // set to false to hide this section
      title: "SAFe 6.0 Scrum Master Resources",
    }
  },
};

const work = {
  display: true,
  label: "Projects",
  tableOfContent: {
    display: true,
    subItems: false,
  },
  title: "My projects",
  description: `Explore projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const skills = {
  label: "Skills",
  title: "My technical skills",
  description: `A blend of technical expertise and Agile leadership by ${person.name}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  intro: {
    display: true,
    title: "Professional Scrum Master and Full-Stack Developer",
    description: (
    <>
    <p>
      As a Professional Scrum Master and Full Stack Developer, I bring a unique blend of technical expertise 
      and Agile leadership to every project. By leveraging skills in technologies like React, Django, and 
      Python alongside servant leadership principles, I drive collaboration and deliver robust, user-focused 
      solutions that align technical innovation with iterative, value-driven outcomes.
    </p>
    </>
    ),
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Skills Overview",
    description: <>A visual representation of my technical expertise across key domains, 
            showcasing proficiency in frontend and backend development, data management, 
            Agile leadership, and DevOps practices.</>,
    skills: [
      {
        title: "Scrum, Agile and DevOps",
        description: <>Explore my expertise in Scrum, Agile, and DevOps—from servant leadership and SAFe 6.0 
        to CI/CD automation and Agile Release Trains—all visualised in one streamlined graph.
        </>,
        images: [{
          src: "/images/skills/nextjs.svg",
          alt: "Next JS Logo",
          width: 16,
          height: 9,
      }]  
      },
      {
        title: "Frontend Development and UI Design",
        description: <>Discover my approach to frontend development and UI design, where React, Next.js, and TypeScript 
        meet accessibility, responsive design, and high-performance UI—all captured in one concise graph.</>,
        images: [
          
        ]
    },
      {
        title: "Backend Development and Cloud Expertise",
        description: <>Explore my backend development and cloud expertise, from scalable APIs in Django and Node.js to 
        AWS, Docker, and Kubernetes-powered deployments—all visualized in one streamlined graph.</>,
        
      },
      {
        title: "Databases & Data Analysis & Data Visualisation",
        description: <>Explore my expertise in databases, data analysis, and visualization—from SQL and ETL pipelines to 
        NumPy-driven insights and Chart.js visualisations—all captured in one concise graph.</>,
      
      },
      {
        title: "Version Control and Collaboration Tools",
        description: <>Explore my expertise in version control and collaboration, from Git and GitHub workflows to 
        Agile project management with Jira and Trello—all visualized in one streamlined graph.</>,

      },
    ],
  },
};

export { person, social, home, about, agileResources, work, skills };
