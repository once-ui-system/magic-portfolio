import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Khiem",
  lastName: "Nguyen Huu",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Information Technology Student @ University of Wollongong",
  avatar: "/images/avatar.jpg",
  email: "khiema8k99@gmail.com",
  location: "Australia/Sydney", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Vietnamese"], // optional: Leave the array empty if you don't want to display languages
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
    name: 'GitHub',
    icon: 'github',
    link: 'https://github.com/khiemhuu',
},
{
    name: 'LinkedIn',
    icon: 'linkedin',
    link: 'https://www.linkedin.com/in/huu-khiem-nguyen-9a56a8197/',
},
{
    name: 'Personal Email',
    icon: 'email',
    link: 'mailto:khiema8k99@gmail.com',
},
{
    name: 'Work Email',
    icon: 'email',
    link: 'mailto:hkn215@uowmail.edu.au',
},
{
    name: 'Photography Instagram',
    icon: 'instagram',
    link: 'https://www.instagram.com/khiem.jpg/',
},
{
    name: 'Personal Instagram',
    icon: 'instagram',
    link: 'https://www.instagram.com/khiemnghuu',
},
{
    name: 'CV',
    icon: 'cv',
    link: 'https://drive.google.com/file/d/1pFOjQTe3eP59GluLWNkhlyh_JlVAtG9e/view?usp=sharing',
},
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Hi! I am Khiêm</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">Baselink</strong></>,
    href: "",
  },
  subline: (
    <>a Bachelor of Information Technology student at University of Wollongong, Australia. I am currently studying major in Website Design and Development, also doing photography as my hobby</>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About Khiem`,
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
    title: 'Introduction',
    description: <>Hi, I am Khiem Nguyen Huu. I am from Vietnam 🇻🇳, living in Wollongong, New South Wales, Australia 🇦🇺. I am doing Bachelor of Information Technology (Dean's Scholar) majoring in Website Design and Development. I have a big passion with coding and doing photography.</>
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Student Representative",
        timeframe: "April 2025 - Present",
        role: "School of Computing and Information Technology, Falcuty of Engineering and Information Science  University of Wollongong",
        achievements: [
          <>
            Acted as a liaison between students and faculty, advocating for student interests and ensuring the student voice was consistently represented in school-level decisions.
          </>,
          <>
            Participated in bi-monthly School Committee meetings, contributing to discussions and presenting student feedback as a standing agenda item.
          </>,
          <>
            Maintained regular communication with the student body to gather insights, concerns, and suggestions, and conveyed these effectively to academic staff.
          </>,
          <>
            Collaborated with academic and administrative stakeholders to improve student experience, policies, and educational support services.
          </>,
          
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
          {
            src: "/images/studentrep.png",
            alt: "Student Representative",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Member of Faculty Education Committee",
        timeframe: "June 2025 - Present",
        role: "Falcuty of Engineering and Information Science, University of Wollongong",
        achievements: [
          <>
            Represent the voice of international students at the faculty level, contributing actively to education policy discussions and decision-making processes.
          </>,
          <>
            Attend and participate in committee meetings as a standing agenda item, delivering student feedback, concerns, and proposals to improve academic and student life.
          </>,
          <>
            Proactively engage with peers to gather diverse student perspectives and advocate for a more inclusive and supportive university experience.
          </>,
          <>
            Collaborate with faculty staff and working groups to enhance curriculum quality, student services, and learning environments across the faculty.
          </>,
          <>
            Foster strong relationships with university stakeholders to promote student-centred initiatives and continuous improvement.
          </>,
          
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Wollongong, Australia",
        description: <><strong>Major: Website Design and Development</strong>
        <br/>I am currently pursuing a Bachelor of Information Technology with a major in Website Design and Development. I have been fortunate to enroll in the Dean's Scholar program, an exclusive opportunity for high-achieving students, which has allowed me to connect with inspiring peers and industry professionals.
        </>,
      },
      {
        name: "Huynh Thuc Khang High School - Collège de Vinh",
        description: <>A8 Class of 2022
        <br /><span><strong>ACTIVITIES AND SOCIETY</strong> - Youth Union Program:
        <br />Former Head of the Design Department at Thunder Debate Club (TDC)
        <br />Former Head of the Design Department, Founder Team at HIGGS - Huynh Thuc Khang Science Club
        <br />Former Crew Member of the Design and Media Department at Phan Cinephilia Club
        <br />Former Vice President of Break Out Crew (Dance Club)
        <br />Former Head of the Media Department at Huynh Thuc Khang English Club (H.E.C)
        <br />Former Member of the Design Department at Youth Unity Model United Nations (YUMUN)</span></>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Skills and Awards",
    skills: [
      {
        title: "UI/UX Design: Figma",
        description: <>Able to design elements and prototype of Website and Software in Figma.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
        ],
      },
      {
        title: "Web Technology: HTML, CSS, JavaScript, React, Python, SQL Database",
        description: <>Building the web application with HTML, CSS, JavaScript. Understanding how to use React, Python, mySQL database into the app. Also have a knowledge of Next.js, ViteJS, UI Framework like Once UI, Ant Design</>,
        // optional: leave the array empty if you don't want to display images
        images: [
        ],
      },
      {
        title: "Photography",
        description: <>Able to take photos with professional camera. Also have a knowledge of Photoshop, Lightroom, and other photo editing software.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
        ],
      },
      {
        title: "Engineering and Information Sciences Scholars and Advanced Scholarship - SEP 24",
        description: <>Awarded for outstanding academic achievements within the Faculty of Engineering and Information Sciences. Recognizes excellence in the field of Information Technology and consistent performance in the program.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
        ],
      },
      {
        title: "Executive Dean's Merit List 2023 - JUL 24",
        description: <>Recognized for achieving a Weighted Average Mark ranking in the top 5% of students in the undergraduate program. Highlights dedication and academic excellence in the field of Information Technology.</>,
        // optional: leave the array empty if you don't want to display images
        images: [
        ],
      },
      {
        title: 'UOW University Excellence Scholarship',
        description: <>Scholarship awarded for academic excellence and outstanding performance throughout the course of study. Supports and encourages students who demonstrate strong academic abilities.</>,
        images: [
        ]
    },
    {
        title: 'People\’s Choice Award',
        description: <>The prize for the photography competition by UOW for encouring sustainable environment protections (Sustainable snapshots: putting Country into focus photography competition 2024)
        </>,
        images: [
            {
                src: '/images/projects/project-01/Photo24.png',
                alt: 'Project image',
                width: 12,
                height: 16
            },
        ]
    }
    ],
  },
};

const blog = {
  path: "/work",
  label: "Work",
  title: "Projects and Works",
  description: `Read what ${person.name} has been up to recently.`,
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
    { src: '/images/gallery/DSCF3186.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "31.9 mm | 1/4,000 | f2.8 | FUJI-XT50" },
    { src: '/images/gallery/DSCF3193.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "50 mm | 1/4,000 | f2.8 | FUJI-XT50" },
    { src: '/images/gallery/DSCF3202.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF3212.JPG', alt: 'image', orientation: 'vertical', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/img-01.jpg', alt: 'image', orientation: 'horizontal', location: 'UNI OF WOLLONGONG', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2106.JPG', alt: 'image', orientation: 'vertical', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2134.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2171.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2436.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2440.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2532.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2548.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2554.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2616.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2685.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2697.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2713.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2722.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2734.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2735.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2749.JPG', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/DSCF2761.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2763.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2766.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2771.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2779.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2800.JPG', alt: 'image', orientation: 'vertical' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2813.JPG', alt: 'image', orientation: 'vertical' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2827.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2849.JPG', alt: 'image', orientation: 'vertical' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2852.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2859.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2861.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2868.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2884.JPG', alt: 'image', orientation: 'vertical' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2908.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2930.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2958.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF2975.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF3056.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/DSCF3074.JPG', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/MANLY1.jpeg', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/MANLY2.jpeg', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/MANLY3.jpeg', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/MANLY4.jpeg', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/MANLY5.jpeg', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/MANLY6.jpeg', alt: 'image', orientation: 'vertical' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/MANLY7.jpeg', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/MANLY8.jpeg', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/MANLY9.jpeg', alt: 'image', orientation: 'horizontal' , location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250"},
    { src: '/images/gallery/MANLY10.jpeg', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/MANLY11.jpeg', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/MANLY12.jpeg', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/MANLY13.jpeg', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/MANLY14.jpeg', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/MANLY15.jpeg', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/MANLY16.jpeg', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
    { src: '/images/gallery/MANLY17.jpeg', alt: 'image', orientation: 'horizontal', location: 'SYDNEY', caminfo: "135mm | 1/30 | f11 | ISO250" },
]
};

export { person, social, newsletter, home, about, blog, work, gallery };
