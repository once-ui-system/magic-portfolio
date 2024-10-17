import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Maksym',
    lastName:  'Petriv',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Full Stack Developer',
    avatar:    '/images/avatar.png',
    location:  'Europe/France/Monaco',        // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ['English', 'French', 'Ukrainian', 'Polish', 'Russian']  // optional: Leave the array empty if you don't want to display languages
}

const newsletter = {
    display: false,
    title: <>Subscribe to {person.firstName}'s Newsletter</>,
    description: <>I occasionally write about design, technology, and share thoughts on the intersection of creativity and engineering.</>
}

const social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/petrivskyyy',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/maksym-petriv-b6ba062a0/',
    },
    {
      name: 'Telegram',
      icon: 'telegram',
      link: 'https://t.me/petrivskyyy'
    },
    {
        name: 'WhatsApp',
        icon: 'whatsapp',
        link: 'https://wa.me/33751494698',
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:petriv050711@gmail.com',
    },
]

const home = {
    label: 'Home',
    title: `${person.name}'s Portfolio`,
    description: `Portfolio website showcasing my work as a ${person.role}`,
    headline: <>Full Stack Developer</>,
    subline: <>Hi, I'm Maksym, a Full Stack Developer with a passion for Artificial Intelligence.<br/>I specialize in building dynamic, user-friendly web applications and<br/>constantly explore how AI can enhance digital experiences.<br/>Let's create something extraordinary together!</>
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
        display: true,
        link: 'https://cal.com'
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: <>"Maksym Petriv | France-based Full Stack Developer crafting innovative websites with a focus on AI integration."</>
    },
    work: {
        display: true, // set to false to hide this section
        title: 'Projects Portfolio',
        experiences: [
            {
                company: 'G-Yachts Monaco',
                timeframe: '06/2024 - Present',
                role: 'Full Stack Developer and Tech Lead',
                achievements: [
                    <>Developed a sophisticated website for G-Yachts Monaco, a premier yacht brokerage, using Next.js for a seamless and fast user experience. The project includes a custom-built administrative panel powered by Payload CMS, enabling efficient content management and easy site updates. The combination of Next.js and Payload CMS ensures both frontend performance and backend flexibility, providing G-Yachts Monaco with a robust platform for showcasing their offerings.</>,
                    <>Integration of APIs for real-time currency changes and newsletters. API integration of yachts with Yatco. Generation of PDF brochures for each yacht</>,
                    <><a href="https://www.g-yachts.com/en">G-Yachts WebSite</a></>
                ],
                images: [ // optional: leave the array empty if you don't want to display images
                    {
                        src: '/images/projects/g-yachts/main.png',
                        alt: 'G-Yachts Main Page',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/g-yachts/admin.png',
                        alt: 'Admin Panel Main Page',
                        width: 16,
                        height: 9
                    }
                ]
            },
            {
                company: 'Aurumgroup Switzerland',
                timeframe: '08/2024 - 09/2024',
                role: 'Full Stack Developer',
                achievements: [
                    <>Designed and developed a high-performance website for Aurumgroup, a leading company in its industry, using Next.js to ensure a fast, responsive, and engaging user experience. The website highlights Aurumgroup's services and offerings with a focus on sleek design and optimized performance. Leveraging Next.js, the site delivers a seamless browsing experience, allowing Aurumgroup to effectively connect with their audience.</>,
                    <><a href="https://www.aurumgroup.ch/">Aurumgroup WebSite</a></>
                ],
                images: [
                    {
                      src: '/images/projects/aurumgroup/main.png',
                      alt: 'Main Page of Aurumgroup Website',
                      width: 16,
                      height: 9
                    },
                    {
                      src: '/images/projects/aurumgroup/about.png',
                        alt: 'Main Page of Aurumgroup Website',
                        width: 16,
                        height: 9
                    }
                ]
            },
            {
                company: 'EcoPod Ukraine',
                timeframe: '11/2021 - 12/2021',
                role: 'Front End Developer',
                achievements: [
                    <>Created a user-centric website for EcoPod, focusing on Frontend development and intuitive UI/UX design. The website emphasizes an eco-friendly aesthetic, ensuring a visually engaging and seamless browsing experience. With a clean and modern interface, the site effectively communicates EcoPod's mission and offerings, providing users with an accessible and enjoyable online experience.</>,
                    <><a href="https://en.ecopod.ua/">EcoPod WebSite</a></>
                ],
                images: [
                    {
                        src: '/images/projects/ecopod/main.png',
                        alt: 'Main Page of EcoPod Website',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/ecopod/products.png',
                        alt: 'About Page of EcoPod Website',
                        width: 16,
                        height: 9
                    }
                ]
            },
            {
                company: 'My Portfolio',
                achievements: [
                    <>I made my portfolio that you are looking at now using Next.js and the OnceUI library</>
                ],
                images: [
                    {
                        src: '/images/projects/portfolio/main.png',
                        alt: 'Main Page of My Portfolio',
                        width: 16,
                        height: 9
                    }
                ]
            }
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Studies',
        institutions: [
            {
                name: 'CNED France',
                description: <>BTS SIO (SLAM) - Software Development, Mathematics & Computer Science</>,
            },
            {
                name: 'Lycée Jules Ferry Cannes',
                description: <>BAC STI2D - Bachelor of science and technology for industry and sustainable development</>,
            },
            {
                name: 'Lycée Carnot Cannes',
                description: <>BAC General</>,
            },
            {
                name: 'University of Toronto',
                description: <>Learn to Program: The Fundamentals | Certification<br/><a href="https://www.coursera.org/account/accomplishments/verify/3CM33JH7UCVP">Certification Link</a></>,
            }
        ]
    },
    technical: {
        display: true, // set to false to hide this section
        title: 'Technical skills',
        skills: [
            {
                title: 'Next.js, React, Tailwind CSS, Python, C, C#, JavaScript, TypeScript, Figma, Adobe XD',
                images: [
                    {
                        src: '/images/projects/project-01/next.webp',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/react.webp',
                        alt: 'Project image',
                        width: 9,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/python.webp',
                        alt: 'Project image',
                        width: 9,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/typescript.svg',
                        alt: 'Project image',
                        width: 9,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/c.png',
                        alt: 'Project image',
                        width: 9,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/figma.png',
                        alt: 'Project image',
                        width: 9,
                        height: 9
                    }
                ]
            },
            {
                title: 'Node.js, MongoDB, REST API, GraphQL, MySQL, API Integration',
                images: [
                    {
                        src: '/images/projects/project-01/node.webp',
                        alt: 'Project image',
                        width: 16,
                        height: 9
                    },
                    {
                        src: '/images/projects/project-01/mongo.svg',
                        alt: 'Project image',
                        width: 9,
                        height: 9
                    }
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
    label: 'Work',
    title: 'My projects',
    description: `Dev projects by ${person.name}`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}

const gallery = {
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection by ${person.name}`,
    // Images from https://pexels.com
    images: [
        { 
            src: '/images/gallery/img-01.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-02.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-03.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-04.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-05.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-06.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-07.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-08.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-09.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-10.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-11.jpg', 
            alt: 'image',
            orientation: 'vertical'
        },
        { 
            src: '/images/gallery/img-12.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-13.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
        { 
            src: '/images/gallery/img-14.jpg', 
            alt: 'image',
            orientation: 'horizontal'
        },
    ]
}

export { person, social, newsletter, home, about, blog, work, gallery };