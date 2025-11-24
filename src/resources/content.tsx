import {About, Blog, Gallery, Home, Newsletter, Person, Social, Work} from "@/types";
import {Line, Row, Text} from "@once-ui-system/core";

const person: Person = {
    firstName: "Paulis",
    lastName: "Gributs",
    name: `Paulis Gributs`,
    role: "Senior Fullstack Developer",
    avatar: "/images/avatar.jpg",
    email: "paulis@gributs.com",
    location: "Europe/Paris", // Expecting the IANA time zone identifier, e.g. 'Europe/Vienna'
    languages: ["English", "French"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
    display: false,
    title: <>Subscribe to {person.firstName}'s Newsletter</>,
    description: <>My weekly newsletter about creativity and engineering</>,
};

const social: Social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: "GitHub",
        icon: "github",
        link: "https://github.com/kevinx8",
    },
    {
        name: "LinkedIn",
        icon: "linkedin",
        link: "https://www.linkedin.com/in/paulis-gributs/",
    },
    {
        name: "Email",
        icon: "email",
        link: `mailto:${person.email}`,
    },
    {
        name: "Rover",
        icon: "rover",
        link: `https://www.rover.com/sit/paulig88666`,
    },
    {
        name: "Adguard",
        icon: "adguard",
        link: "https://adguard.com/?aid=31141&source=PersonalSite",
    }
];

const home: Home = {
    path: "/",
    image: "/images/og/home.png",
    label: "Home",
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <>Building your vision from the ground up</>,
    featured: {
        display: true,
        title: (
            <Row gap="12" vertical="center">
                <strong className="ml-4">Attrape-Rêves</strong>{" "}
                <Line background="brand-alpha-strong" vert height="20"/>
                <Text marginRight="4" onBackground="brand-medium">
                    Featured work
                </Text>
            </Row>
        ),
        href: "/work/attrape-reves",
    },
    subline: (
        <>
            I'm Paulis, a freelance Senior Fullstack Developer
            <br/>Turning Complex Problems into Intuitive, Data-Driven Experiences
        </>
    ),
};

const about: About = {
    path: "/about",
    label: "About",
    title: `About – ${person.name}`,
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: false,
    },
    avatar: {
        display: true,
    },
    calendar: {
        display: true,
        link: "https://cal.com/paulis-gributs",
    },
    intro: {
        display: true,
        title: "Introduction",
        description: (
            <>
                I am a software engineer with a passion for building intelligent,
                full-stack applications that bridge the gap between cutting-edge research
                and real-world impact. My expertise spans from developing and deploying AI
                systems to managing complex projects for global audiences, such as leading a
                team for an Android app with over 120 million users.
            </>
        ),
    },
    work: {
        display: true, // set to false to hide this section
        title: "Work Experience",
        experiences: [
            {
                company: "LERO/Open University",
                timeframe: "2023 - 2024",
                role: "Senior Research Software Engineer",
                achievements: [
                    <>
                        Published research paper with university team maintaining 82% excellence rate.
                    </>,
                    <>
                        Built full-stack application from scratch using Flutter, Python & MongoDB to track user values
                        via purchasing
                        habits.
                    </>,
                    <>
                        Integrated LLM AI recommender system increasing user satisfaction by 35%.
                    </>
                ],
                images: [
                    // optional: leave the array empty if you don't want to display images
                    {
                        src: "/images/projects/project-01/vsb.jpg",
                        alt: "Once UI Project",
                        width: 9,
                        height: 18,
                    },
                    {
                        src: "/images/projects/project-01/vsb2.jpg",
                        alt: "Once UI Project",
                        width: 9,
                        height: 18,
                    },
                    {
                        src: "/images/projects/project-01/vsb3.jpg",
                        alt: "Once UI Project",
                        width: 9,
                        height: 18,
                    },
                ],
            },
            {
                company: <a href="https://wikipedia.org/wiki/YouTube_Vanced" target="_blank">Youtube Vanced (Google CA)</a>,
                timeframe: "2018 - 2022",
                role: "Lead Developer",
                achievements: [
                    <>
                        Managed developer team for Android applications serving 120M+ users.
                    </>,
                    <>
                        Collaborated with sponsors (Brave, Adguard) and YouTube-related teams.
                    </>,
                    <>
                        Performed Java Small code decompilation and developed backends using C#
                        Projects.
                    </>,
                ],
                images: [],
            },
            {
                company: "Intel®",
                timeframe: "2021 - 2022",
                role: "Software Engineer Intern",
                achievements: [
                    <>
                        Contributed to DPDK framework and enhanced testing suite in SCRUM team.
                    </>,
                    <>
                        Resolved production bugs and handled regression testing.
                    </>,
                    <>
                        Contributed to 20+ Pull Requests via Git; led team to 2nd place in Intel STEM Challenge.
                    </>
                ],
            },
        ],
    },
    studies: {
        display: true, // set to false to hide this section
        title: "Studies",
        institutions: [
            {
                name: "University of Limerick BSc in Computer Systems, GPA: 3.9/4.0 (2019 - 2023)",
                description: <ul>
                    <li>Awarded President’s Volunteer Award for contributions to Environmental Society</li>
                    <li>Tutored fellow students in computer science curriculum</li>
                    <li>Thesis: Developed Sentiment Analysis Application to track user mood via text messages</li>
                </ul>,
            },
            {
                name: "Université Paul Valéry (2025)",
                description: <>Improved my French level to B1 through IEFE.</>,
            },
        ],
    },
    technical: {
        display: true, // set to false to hide this section
        title: "Technical skills",
        skills: [
            {
                title: "Mobile Applications",
                description: (
                    [<>Created Several Mobile Applications including their backends;</>,
                        <br/>,
                        <a href="https://play.google.com/store/apps/details?id=com.kevinx8.negate" target="_blank">Negate</a>,
                        <br/>,
                        <a href="https://value-shopping-basket.codemagic.app/" target="_blank">Value Shopping Basket</a>,
                        <br/>,
                        <a href="https://wikipedia.org/wiki/YouTube_Vanced" target="_blank">YouTube Vanced</a>
                    ]
                ),
                tags: [
                    {
                        name: "Flutter",
                        icon: "flutter",
                    },
                    {
                        name: "Dart",
                        icon: "dart"
                    },
                    {
                        name: "Java",
                        icon: "java"
                    },
                    {
                        name: "Kotlin",
                        icon: "kotlin"
                    }
                ],
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: "/images/projects/project-01/negate.jpg",
                        alt: "Negate Info",
                        width: 9,
                        height: 20,
                    },
                    {
                        src: "/images/projects/project-01/vsb.jpg",
                        alt: "VSB Info",
                        width: 9,
                        height: 20,
                    },
                    {
                        src: "/images/projects/project-01/vanced.webp",
                        alt: "Vanced Settings",
                        width: 9,
                        height: 20,
                    },
                ],
            },
            {
                title: "Autonomous Programs",
                description: (
                    [<>Able to build Backends and Discord Bots with 99.99% uptime.</>,
                        <br/>,
                        <a href="https://codefling.com/discord-bots/update-checker-bot" target="_blank">Link to an example bot of
                            mine.</a>]
                ),
                tags: [
                    {
                        name: "Node.js",
                        icon: "nodejs",
                    },
                    {
                        name: "TypeScript",
                        icon: "typescript"
                    },
                    {
                        name: "MongoDB",
                        icon: "mongodb"
                    },
                    {
                        name: "SQL",
                        icon: "sql"
                    }
                ],
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: "/images/projects/project-01/cover-02.jpg",
                        alt: "Bot output Example",
                        width: 16,
                        height: 9,
                    }
                ],
            },
            {
                title: "Plugins & Backends",
                description: ([
                        <>Writing Plugins and Backend Applications in C# since 2018.</>,
                        <br/>,
                        <a href="https://magicservices.co/" target="_blank">Contracted developer on Magic Services.</a>
                    ]
                ),
                tags: [
                    {
                        name: "",
                        icon: "csharp",
                    },
                    {
                        name: "Java",
                        icon: "java"
                    },
                    {
                        name: "C/++",
                        icon: "cplusplus"
                    }
                ]
            },
            {
                title: "Frontends",
                description: ([
                        <>Building robust websites using Vite, Next.js and React.js.</>,
                        <br/>,
                        <a href="https://attraperevesint.fr/" target="_blank">Link to a client's site.</a>
                    ]
                ),
                tags: [
                    {
                        name: "JavaScript",
                        icon: "javascript",
                    },
                    {
                        name: "React.js",
                        icon: "reactjs",
                    },
                    {
                        name: "Next.js",
                        icon: "nextjs"
                    }
                ],
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: "/images/projects/project-01/cover-03.jpg",
                        alt: "Site Front Page",
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
    label: "Work",
    title: `Projects – ${person.name}`,
    description: `Design and dev projects by ${person.name}`,
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

export {person, social, newsletter, home, about, blog, work, gallery};
