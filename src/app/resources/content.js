import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Tim',
    lastName:  'Schalk',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Full-Stack Developer & Computer Science Student',
    avatar:    '/images/avatar.jpg',
    location:  'Europe/Berlin',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['German 🇩🇪', 'English 🇺🇸', 'Norsk 🇳🇴 ;)']  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: false,
    title: '', //<>Subscribe to {person.firstName}'s Newsletter</>,
    description: '' //<>I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.</>
}

const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/timschalk',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/tim-schalk/',
    },
]

const home = {
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: 'moin moin', //<>Design engineer and builder</>,
    subline: <>i am tim, a <InlineCode>{'<software />'}</InlineCode> developer, but pulled this beautiful portfolio from <a href="https://github.com/once-ui-system/magic-portfolio" target="_blank">here</a>. long story short, i am not the hero here. {':-)'}</>
}

const about = {
    label: 'About',
    title: 'About me',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: true
    },
    avatar: {
        display: true
    },
    calendar: {
        display: false,
        link: '' //'https://cal.com'
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: <>I'm a passionate software developer, currently pursuing my Master's in Computer Science in Hamburg. With every line of code, I strive to create innovative solutions that push the boundaries of technology. Balancing my studies and projects, I'm confidently shaping my future in the tech world with a laid-back and determined attitude.  Because, you know, who needs sleep when you have endless lines of code to keep you company? But hey, no pressure - it's not like the world depends on my next line of code!<br/><br/>~ Specials thanks to GPT-4 Omni ♥️</>
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Work Experience',
        experiences: [
            {
                company: 'apoways GmbH',
                timeframe: '2021 - Present',
                role: 'Full-Stack Developer',
                achievements: [
                    <>Developing a web application using React JS and Laravel to streamline the ordering process between patients and pharmacies, enhancing efficiency and user experience.</>,
                    <>Creating a communication platform for pharmacists, patients, and care facilities, facilitating seamless interaction and collaboration.</>,
                    <>Building a cross-platform mobile application for Android and iOS using React Native, ensuring accessibility and functionality across devices.</>
                ],
                images: [ // optional: leave the array empty if you don't want to display images
                    {
                        src: '/images/projects/apoways/apoways_web_screenshot.png',
                        alt: 'Apoways Webapp for Pharmacies',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/apoways/apoways_app_screenshot.png',
                        alt: 'Apoways Cross-Platform App',
                        width: 9,
                        height: 9
                    }
                ]
            },
            {
                company: 'Deutsche Telekom AG',
                timeframe: '2017 - 2020',
                role: 'Work-Study Student (Bachelor of Business Informatics)',
                achievements: [
                    <>Analytical activities in ERP, CRM, and SQL-Database Systems.</>,
                    <>Development of complex MS Excel VBA-based tools.</>,
                    <>Design, implementation, and support of virtual machines.</>,
                    <>Webdevelopment</>
                ],
                images: [ ]
            }
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Studies',
        institutions: [
            {
                name: 'Hamburg University of Applied Sciences (HAW Hamburg)',
                description: <>Studying Computer Science.</>,
            },
            {
                name: 'FOM Hochschule für Oekonomie & Management',
                description: <>Studied Business Informatics.</>,
            }
        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Technical skills',
        skills: [
            {
                title: 'React JS & Native',
                description: <>Able to develop awesome apps with React.</>,
                images: [
                    // {
                    //     src: '/images/projects/project-01/cover-02.jpg',
                    //     alt: 'Project image',
                    //     width: 16,
                    //     height: 9
                    // },
                    // {
                    //     src: '/images/projects/project-01/cover-03.jpg',
                    //     alt: 'Project image',
                    //     width: 16,
                    //     height: 9
                    // },
                ]
            },
            {
                title: 'Laravel',
                description: <>Building robust Backend Applications with Laravel.</>,
                images: [
                    // {
                    //     src: '/images/projects/project-01/cover-04.jpg',
                    //     alt: 'Project image',
                    //     width: 16,
                    //     height: 9
                    // },
                ]
            }
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'Writing about design and tech...',
    description: `Read what ${person.name} has been up to recently`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Blog',
    title: 'My blog',
    description: `Let yourself be inspired`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}

const gallery = {
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection`,
    // Images from https://pexels.com
    images: [
        { 
            src: 'https://s3.t1m0thy.de/media/norway-01_low.jpeg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: 'https://s3.t1m0thy.de/media/norway-02_low.jpeg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: 'https://s3.t1m0thy.de/media/crete-01_low.jpeg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: 'https://s3.t1m0thy.de/media/crete-02_low.jpeg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: 'https://s3.t1m0thy.de/media/france-01_low.jpeg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: 'https://s3.t1m0thy.de/media/france-02_low.jpeg', 
            alt: 'image',
            orientation: 'horizontal'
        },
    ]
}

export { person, social, newsletter, home, about, blog, work, gallery };
