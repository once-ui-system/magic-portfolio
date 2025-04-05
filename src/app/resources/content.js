import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Akshay",
  lastName: "Sabale",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  location: "America/Chicago", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: [ ], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      Dynamic and results-driven Software Engineer with over two years of industry experience in designing, building, and optimizing large-scale data processing pipelines, cloud-based architectures, and machine learning workflows.
      Currently pursuing a Master’s in Computer Science at the University of Texas at Arlington, specializing in Big Data Management and Intelligent Systems.
      Technical expertise includes Python, Java, SQL, Scala, TensorFlow, PyTorch, Apache Spark, Hadoop, Kubernetes, Docker, and FastAPI.
      Always eager to explore innovative data-driven solutions and leverage cutting-edge technologies to enhance business intelligence and decision-making.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/ASabale",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/akshaysabale",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:akshaysabale07169@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Software Engineer</>,
  subline: (
    <>
      I'm {person.name}, a software engineer passionate about building scalable and efficient applications. I specialize in crafting robust solutions that enhance user experiences and drive innovation.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from Texas, USA`,
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
        Akshay is a software engineer with expertise in cloud computing, big data processing,
        and scalable system design. With experience in building high-performance data pipelines,
        optimizing infrastructure, and developing full-stack applications, he is passionate
        about leveraging technology to drive efficiency and innovation.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "University of Texas at Arlington",
        timeframe: "Aug 2024 – Present",
        role: "Graduate Teaching Assistant (Data Structures & Database Systems)",
        achievements: [
          <>
            Conducted weekly sessions on data structures and algorithms, leading to a 25% improvement in student exam performance.
          </>,
          <>
            Designed and implemented a full-stack project using JavaScript and PostgreSQL, enhancing students' real-world software development skills.
          </>,
          <>
            Provided guidance on database design and complex SQL queries, bridging theoretical concepts with practical applications.
          </>,
        ],
        images: [],
      },
      {
        company: "Integral Ad Science",
        timeframe: "Sept 2020 – Sept 2022",
        role: "Software Engineer",
        achievements: [
          <>
            Reduced processing costs by 65% and time by 71% by transitioning from Hadoop based on-premises infrastructure to AWS.
          </>,
          <>
            Designed Kinesis data pipeline handling 200k+ messages/sec, improving processing latency by 56%.
          </>,
          <>
            Automated workflows and multi-layered validations, reducing errors by 90% in reporting.
          </>,
          <>
            Introduced Cloudwatch-based monitoring and alerting, cutting downtime by 85% and ensuring 99.9% system availability.
          </>,
          <>
            Led the design of Airflow-based ETL pipelines to aggregate over 2 billion daily records, reducing processing time by 60%.
          </>,
          <>
            Created customizable reporting systems using Looker and Snowflake, improving analytics accessibility by 40%.
          </>,
          <>
            Engineered a multithreaded Java service to process ad sessions, accelerating report generation by 65%.
          </>,
          <>
            Built RESTful APIs enabling real-time data retrieval, enhancing user report generation speed by 50%.
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
        name: "University of Texas at Arlington",
        description: <>Master's in Computer Science, specializing in Big Data Management and Intelligent Systems. Expected May 2025.</>,
      },
      {
        name: "Vishwakarma Institute of Technology, Pune",
        description: <>B.Tech in Computer Engineering, graduated in October 2020.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      // {
      //   title: "Next.js",
      //   description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
      //   // optional: leave the array empty if you don't want to display images
      //   images: [
      //     {
      //       src: "/images/projects/project-01/cover-04.jpg",
      //       alt: "Project image",
      //       width: 16,
      //       height: 9,
      //     },
      //   ],
      // },
      {
        title: "AWS Cloud Computing",
        description: <>Extensive experience with AWS services, including CDK, S3, EC2, ECS, Elastic Load Balancing, Kinesis, DynamoDB, EMR, SNS, Glue, and IAM, for scalable and efficient cloud infrastructure.</>,
        images: [],
      },
      {
        title: "Big Data Processing",
        description: <>Designed and optimized data processing pipelines using Snowflake, Apache PySpark, Airflow, and AWS EMR to handle petabyte-scale ad data.</>,
        images: [],
      },
      {
        title: "Backend Development",
        description: <>Proficient in Java, Python for building RESTful APIs and microservices with authentication, security, and data processing capabilities.</>,
        images: [],
      },
      {
        title: "Infrastructure as Code (IaC)",
        description: <>Experience in deploying infrastructure using AWS CDK, and container orchestration with Docker and Kubernetes.</>,
        images: [],
      },
      {
        title: "Database & Storage",
        description: <>Worked with MySQL, Snowflake, and AWS S3 for data warehousing, efficient querying, and scalable storage solutions.</>,
        images: [],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about tech and life",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "Projects",
  description: `Projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  images: [
    {
      src: "/images/gallery/Virginia_tech_1.jpg",
      alt: "image",
      orientation: "horizontal", // vertical | horizontal
    },
    {
      src: "/images/gallery/UTA-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
