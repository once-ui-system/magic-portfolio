import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Sushanth',
    lastName:  'Reddy',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Software Engineer',
    avatar:    '/images/avatar.png',
    location:  'Asia/Kolkata',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['English']  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: true,
    title: <>Subscribe to {person.firstName}'s Newsletter</>,
    description: <>I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.</>
}

const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/nxtgencat',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://in.linkedin.com/in/nxtgencat',
    },
    {
        name: 'X',
        icon: 'x',
        link: 'https://x.com/nxtgencat',
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:thesushanthmail@gmail.com',
    },
]

const home = {
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <>Software Engineer and Developer</>,
    subline: <>I'm Sushanth Reddy, a Software Engineer skilled in architecting and developing <InlineCode>robust</InlineCode> <InlineCode>scalable </InlineCode>systems. After hours, I build my own projects.</>
}

const about = {
    label: 'About',
    title: 'About me',
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: false
    },
    avatar: {
        display: true
    },
    calendar: {
        display: true,
        link: 'https://cal.com'
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: <>Sushanth Reddy, a Software Engineer, passionate about turning complex technical challenges into elegant solutions. With a focus on web development, Android app development, and operating systems, I strive to deliver exceptional software experiences.</>
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Work Experience',
        experiences: [
            {
                company: 'Softius Internet Services',
                timeframe: 'Jan 2024 - Mar 2024',
                role: 'Frontend Development Team Member',
                achievements: [
                    <>Developed a design system that unified the brand across multiple platforms, improving design consistency by 40%.</>,
                    <>Contributed to the integration of APIs and third-party services into web applications, enhancing functionality and user experience .</>
                ],
                images: []
            },
            {
                company: 'Prasunet Company',
                timeframe: 'Mar 2024 - Apr 2024',
                role: 'Android Development Team Member ',
                achievements: [
                    <>Redesigned the UI/UX for the platform, resulting in a 20% increase in user engagement and 30% faster load times.</>,
                    <>Spearheaded the integration of AI tools into design workflows, enabling designers to iterate 50% faster.</>
                ],
                images: []
            }
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Studies',
        institutions: [
            {
                name: 'SRM Institute of Science and Technology',
                description: <>Studied Computer science and engineering.</>,
            },
            {
                name: ' Bhashyam Junior College',
                description: <>Studied Science stream.</>,
            }
        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Technical skills',
        skills: [
            {
                title: 'Kotlin, Jetpack Compose',
                description: <>Developed scalable Android apps using Kotlin, Jetpack Compose, and modern Android libraries like Hilt and Coroutines.</>,
                images: []
            },
            {
                title: 'JavaScript, React, Next.js',
                description: <>Built responsive web apps with Next.js, leveraging Once UI, Supabase, and dynamic content rendering.</>,
                images: []
            },
            {
                title: 'Python',
                description: <>Developed a web scraper using Python and Selenium to extract data from the Haveloc website efficiently.</>,
                images: []
            },
            {
                title: '',
                description: <>A program for Windows that allows users to easily enable and disable their camera for enhanced privacy. This tool provides a simple and quick way to control camera access, ensuring your privacy is protected when the camera is not in use.</>,
                images: []
            },
            {
                title: 'SQL (Postgres)',
                description: <>Implemented robust database schemas using PostgreSQL, with optimized queries for fast and reliable data operations.</>,
                images: []
            },
            {
                title: 'Docker, Git & AWS',
                description: <>Used Docker for containerization, Git for version control, and AWS for scalable application deployment and cloud infrastructure management.</>,
                images: []
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
    label: 'Projects',
    title: 'My projects',
    description: `Design and dev projects by ${person.name}`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}

const gallery = {
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection by ${person.name}`,
    // Images from https://pexels.com
    images: []
}

export { person, social, newsletter, home, about, blog, work, gallery };