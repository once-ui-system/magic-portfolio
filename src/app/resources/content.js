import { InlineCode } from "@/once-ui/components";

const person = {
    name: 'John Doe',
    role: 'Design Engineer',
    avatar: '/images/avatar.png',
    location: 'Europe/Vienna',
    languages: [ 'English', 'German' ]
}

const newsletter = {
    title: <>Subscribe to my newsletter</>,
    description: <>I ocassionally write about design, tech and sometimes share random thoughts.</>
}

const social = [
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/once-ui-system/nextjs-starter',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/company/once-ui/',
    },
    {
        name: 'X',
        icon: 'x',
        link: '',
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:example@gmail.com',
    },
]

const home = {
    label: 'Home',
    headline: <>Design engineer by day, creative by night</>,
    subline: <>I'm John, design engineer at <InlineCode>Once UI</InlineCode>, working on my AI graphic novel after working hours.</>
}

const about = {
    label: 'About',
    tableOfContent: {
        display: true,
        subItems: true
    },
    intro: {
        title: 'Introduction',
        description: <>Write a short introduction for your CV, start with your job title or main skill, followed by your key achievements or experiences, and then your career goals. Make sure it's concise, typically 2-3 sentences, and tailored to the role you're applying for, highlighting how your skills and experiences make you a perfect fit for the position.</>
    },
    work: {
        title: 'Work experience',
        experiences: [
            {
                company: 'Once UI',
                timeframe: '2022 - present',
                role: 'Senior designer',
                achievements: [
                    <>Include a concise overview of your key responsibilities, highlighting your direct impact on the organization, such as improved processes, cost savings, or revenue generation.</>,
                    <>Include a concise overview of your key responsibilities, highlighting your direct impact on the organization, such as improved processes, cost savings, or revenue generation.</>
                ],
                images: [
                    {
                        src: '/images/projects/project-01/cover.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    }
                ]
            },
            {
                company: 'Once UI 2',
                timeframe: '2022 - present',
                role: 'Senior designer',
                achievements: [
                    <>Include a concise overview of your key responsibilities, highlighting your direct impact on the organization, such as improved processes, cost savings, or revenue generation.</>,
                    <>Include a concise overview of your key responsibilities, highlighting your direct impact on the organization, such as improved processes, cost savings, or revenue generation.</>
                ],
                images: [ ]
            }
        ]
    },
    technical: {
        title: 'Technical skills',
        skills: [
            {
                title: 'Figma',
                description: <>Include a concise overview of your key responsibilities, highlighting your direct impact on the organization, such as improved processes, cost savings, or revenue generation.</>,
                images: [
                    {
                        src: '/images/projects/project-01/cover.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/cover.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/cover.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/cover.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/cover.jpg',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                ]
            }
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'I write about design and tech'
}

const work = {
    label: 'Work',
    title: 'My projects',
    projects: [
        {
            title: '',
        }
    ]
}

export { person, social, newsletter, home, about, blog, work };