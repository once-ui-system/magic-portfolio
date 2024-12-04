import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Daniel",
  lastName: "Crotty",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Lacrosse Coach",
  avatar: "/images/avatar.png",
  location: "America/New_York", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: [
    "Former Coach @ DI Wagner College",
    "Former Coach @ DIII Montclair State University",
    "Former Coach @ DIII Babson College",
  ], // optional: Leave the array empty if you don't want to display languages
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
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/laxteacher/",
  },
  {
    name: "Phone",
    icon: "phone",
    link: "tel:123-456-789",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:dcrotty4@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Design engineer and builder</>,
  subline: (
    <>
      I'm Selene, a design engineer at <InlineCode>FLY</InlineCode>, where I
      craft intuitive
      <br /> user experiences. After hours, I build my own projects.
    </>
  ),
};

const about = {
  label: "About",
  title: "LaxTeacher",
  description: `Daniel Crotty is a private lacrosse coach based in Charlotte, NC. He offers private, individual, and small group lacrosse lessons`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "http://calendly.com/laxteacher",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Hi, I'm Dan Crotty, and welcome to my page! As a former college coach,
        3x All-American, and 2021 MAC Conference Defensive Player of the Year,
        I'm excited to offer private, individual, and small group lacrosse
        lessons for boys and girls of all skill levels and ages in the Charlotte
        area. I am a proud alum of Stevens Institute of Technology, where I
        honed my skills as a defenseman in field lacrosse. I also played as a
        forward in box lacrosse, giving me a deep understanding of what it takes
        to be elite on both sides of the ball.
        <br />
        <br />
        While coaching in college, I oversaw both the face-off units and goalie
        units, gaining immense knowledge of the specialty positions and how to
        train them. I train all positions and ages, and my goal is not just to
        teach the "how" but also the "why." My depth of knowledge allows each
        lesson to be specifically tailored to the areas the athlete needs to
        work on to reach their goals.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Babson College",
        timeframe: "",
        role: "Assistant Coach/Defensive Coordinator",
        achievements: [
          <>
            Coordinated a defense that operated at 75.9% efficiency in 2024
            helping the team return to 2nd straight NCAA Sweet 16
          </>,
          <>
            Held 11 of 20 opponents to 8 goals or less, including 2 top 10
            opponents, & finished with a GAA of 9.45
          </>,
          <>
            Created specialized practice plan with matching offensive and
            defensive plans to optimize instructing days
          </>,
          <>
            Manufactured drills to address and improve deficiencies within the
            defense
          </>,
          <>Assisted heavily in recruiting efforts</>,
        ],
        images: [],
      },
      {
        company: "Montclair State University",
        timeframe: "",
        role: "Defensive & Recruiting Coordinator",
        achievements: [
          <>Coordinated a defense that operated at 71% efficiency in 2023</>,
          <>
            Held 11 of 18 opponents under their season average goals per game
          </>,
          <>
            Utilized film to aid in the growth of the team and defense's IQ and
            conducted drills to address deficiencies within the defense
          </>,
        ],
        images: [],
      },
      {
        company: "Advanced Lacrosse USA",
        timeframe: "",
        role: "Coach & Private Trainer: Faceoffs, Defense, Goalies",
        achievements: [
          <>
            Created lesson plans to increase the development of players of all
            ages and provided constructive feedback so players could go home &
            continue their development on their own
          </>,
          <>
            Conducted private sessions of all positions focused on individual
            development for elementary, middle school & high school players
          </>,
          <>
            Facilitated weekly group defensive, goalie, and faceoff clinics with
            an emphasis on refining players' current techniques, introducing new
            moves, while developing foot work, hand-eye coordination,
            communication, & IQ
          </>,
        ],
        images: [],
      },
      {
        company: "Wagner College",
        timeframe: "",
        role: "Graduate Assistant",
        achievements: [
          <>
            Created practice plans that with drills to address deficiencies
            within the team
          </>,
          <>
            Conducted group & individual film sessions with an emphasis on
            strategy & self-improvement
          </>,
          <>
            Evaluated and communicated with high school age boys looking to be
            recruited at various showcases & prospect camps, & determine whether
            or not they were capable of competing at the Division 1 level on
            behalf of Wagner College Men's Lacrosse
          </>,
        ],
        images: [],
      },
      {
        company: "Trilogy Lacrosse LLC",
        timeframe: "",
        role: "Tournament Operations Intern & Coach",
        achievements: [
          <>
            Coordinated closely with club directors to ensure competitive game
            matchups while liaising with coaches regarding rosters, player
            waivers, game times, field locations, and parking arrangements.
          </>,
          <>
            Coached & managed large groups of middle school boys to teach
            necessary skills to accel in lacrosse & life
          </>,
        ],
        images: [],
      },
      {
        company:
          "Team 91 South & Charlotte, 3D New England & Garden State, Stickwithus",
        timeframe: "",
        role: "Coach",
        achievements: [
          <>
            Coached elementary through high school boys through various camps,
            clinics, & club teams
          </>,
          <>
            Aided high school boys with the college recruitment process giving
            them effective communication skills, reaching out of their behalf, &
            discussing their college needs & desires with them so they find the
            right fit
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
        name: "Wagner College",
        description: (
          <>
            <h4>Master of Business Administration</h4>
            <ul>
              <li>3.50 GPA</li>
              <li>Completed 27 of 36 required credits</li>
            </ul>
          </>
        ),
      },
      {
        name: "Stevens Institute of Technology",
        description: (
          <>
            <h4>Master of Science in Information Systems</h4>
            <ul>
              <li>3.69 GPA</li>
              <li>2020 Academic All-American</li>
              <li>2021 All-MAC Academic Team Men's Lacrosse</li>
              <li>2x MAC Spring Honor Roll</li>
            </ul>
            <br />
            <h4>
              Bachelor of Science in Finance; Minor in Quantitative Finance
            </h4>
            <ul>
              <li>3.30 GPA</li>
              <li>Dean's List</li>
              <li>Edwin A. Stevens Scholarship Recipient</li>
            </ul>
          </>
        ),
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "College Lacrosse",
    skills: [
      {
        title: "Statistics",
        description: (
          <>
            <h4>Career Statistics</h4>
            <ul>
              <li>107 Caused Turnovers</li>
              <li>201 Ground Balls</li>
              <li>3 Goals</li>
              <li>2 Assist</li>
              <li>56 Games Started</li>
              <li>75 Games Played</li>
            </ul>
            <br />
            <h4>Individual Accolades</h4>
            <ul>
              <li>2021 MAC Freedom Defensive Player of the Year</li>
              <li>3x All-American</li>
              <li>Academic All-American</li>
              <li>3x All-Conference</li>
              <li>20+ additional collegiate accolades</li>
            </ul>
          </>
        ),
        images: [
          {
            src: "/images/college_lacrosse/crotty_hit_stick.jpg",
            alt: "Daniel Crotty hitting offensive player",
            width: 16,
            height: 9,
          },
          {
            src: "/images/college_lacrosse/swarthmore_crotty.png",
            alt: "Swarthmore vs. Stevens Institute of Technology",
            width: 16,
            height: 9,
          },
          {
            src: "/images/college_lacrosse/desales_crotty.png",
            alt: "Desales vs. Stevens Institute of Technology",
            width: 16,
            height: 9,
          },
          {
            src: "/images/college_lacrosse/devils_crotty.png",
            alt: "Dickinson College vs. Stevens Institute of Technology",
            width: 16,
            height: 9,
          },
          {
            src: "/images/college_lacrosse/mac_champs_crotty.png",
            alt: "Stevens Institute of Technology - MAC Champs",
            width: 16,
            height: 9,
          },
          {
            src: "/images/college_lacrosse/mac_dpoy_crotty.png",
            alt: "MAC Defensive Player of the Year",
            width: 16,
            height: 9,
          },
        ],
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
