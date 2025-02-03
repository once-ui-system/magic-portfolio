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
        Gina is a skilled Scrum Master and Full-Stack Developer with a talent for driving collaboration, 
        fostering innovation, and delivering impactful solutions. Combining expertise in Agile methodologies 
        with technical proficiency in modern web technologies, Gina thrives in crafting scalable, user-centered 
        applications that solve real-world problems.
      </p>
      <p>
        Her strengths lie in leading teams to success through servant leadership, empowering cross-functional 
        collaboration, and aligning technical execution with business objectives. With a focus on continuous improvement, 
        she brings together her deep understanding of Agile principles and her hands-on experience in full-stack development 
        to deliver high-quality, adaptive solutions.
      </p>
      <p>
        From building responsive frontend interfaces to architecting robust backend systems, Gina is passionate about leveraging 
        technology to create meaningful, effective digital experiences.
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
    title: "Skills Overview",
    description: (
      <>
      <p>
      By leveraging skills in technologies like React, Django, and Python alongside servant leadership principles, I drive collaboration and 
      deliver robust, user-focused solutions that align technical innovation with iterative, value-driven outcomes.
      </p>
      </>
    ),
    skills: [
      {
        title: "Scrum, Agile and DevOps",
        description: <>Certified Professional Scrum Master (PSM I) with expertise in servant leadership, Lean-Agile principles, and coaching Scrum teams. 
                Experienced in SAFe 6.0 methodologies, including Flow Metrics, Agile Release Trains (ARTs), and Iteration Planning. Skilled in facilitating 
                Agile ceremonies (Sprint Planning, Retrospectives, Stand-Ups) and conflict resolution. DevOps expertise includes CI/CD pipelines, 
                cloud infrastructure, and version control, ensuring seamless deployment and automation.
        </>,
      },
      {
        title: "Frontend Development and UI Design",
        description: <>Crafting modern, accessible, and user-friendly interfaces using HTML, CSS, JavaScript, and TypeScript. I specialise in building scalable 
                React.js applications, leveraging Next.js, Tailwind CSS, and Bootstrap for efficient styling. My expertise includes user-centric design principles, 
                accessibility standards, and responsive layouts. I also integrate tools like Vite, Remix, and GraphQL to enhance performance and data-driven UI experiences.</>,
        
        images: [
          {
            src: "/images/skills/react.svg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Backend Development and Cloud Expertise",
        description: <>Developing robust and scalable backend solutions using Python, C#, and Node.js. Experienced in Django Rest Framework, Flask, and RESTful APIs, 
                I ensure seamless data processing and integrations. Cloud expertise includes AWS S3 for storage, deploying applications on Netlify and Heroku, and 
                containerisation using Docker and Kubernetes. Performance is optimised with Gunicorn for scalable web application hosting.</>,
        
        images: [
          {
            src: "/images/skills/nextjs.svg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Databases & Data Analysis & Data Visualisation",
        description: <>Strong foundation in SQL, PostgreSQL, SQLite, and BigQuery for efficient data querying and management. Skilled in data migrations and 
                ETL/ELT pipelines using Airbyte and DagsterUI. Proficient in NumPy and SciPy for data analysis, and leveraging Matplotlib and Chart.js for insightful 
                data visualisation. Experienced in designing Entity-Relationship Diagrams (ERD) to structure database architecture effectively.</>,
        
        images: [
          {
            src: "/images/skills/backend.svg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Version Control and Collaboration Tools",
        description: <>Ensuring smooth collaboration and source control using Git, GitHub, and GitLab. Experienced in Jira, Trello, and Microsoft Teams for 
                effective Agile project management and tracking. Proficient in Slack and code collaboration tools, fostering team synergy in remote and 
                hybrid environments.</>,

        images: [
          {
            src: "/images/skills/sql.svg",
            alt: "Project image",
            width: 16,
            height: 9,
          },
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
  tableOfContent: {
    display: true,
    subItems: false,
  },
  label: "Agile Resources",
  title: "My Agile Resources",
  description: `Explore Agile content and resources used by ${person.name}`,
  // Create new Agile resources by adding a new .mdx file to app/agile/resources
  // All resources will be listed on the /agile route
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
        title: "Agile Leadership and Practices",
        description: <>Leading Agile teams as a Professional Scrum Master, 
        focusing on delivering iterative value and fostering collaboration.</>,
        
        images: [
          {
            src: "/images/skills/ScrumMasterPoster.webp",
            alt: "Scrum Master Poster from Scrum.org",
            width: 400,
            height: 600,
     
          },
        ],
      },
    ],
  },
};

export { person, social, home, about, agileResources, work, skills };
