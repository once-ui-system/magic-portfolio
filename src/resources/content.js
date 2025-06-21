import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Yadu",
  lastName: "Krishnan",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Multimedia Specialist",
  avatar: "/images/yadu-avatar.jpg", // Will be replaced with Yadu's actual avatar
  email: "yadu.krishnan.example@gmail.com", // Placeholder email
  location: "Asia/Dubai", // For Abu Dhabi, UAE
  languages: ["English", "Malayalam"],
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  {
    name: "LinkedIn",
    icon: "linkedin", // Assuming 'linkedin' icon exists
    link: "https://www.linkedin.com/in/yadukrishnan-profile-url", // Placeholder
  },
  {
    name: "Instagram",
    icon: "instagram", // Assuming 'instagram' icon exists
    link: "https://www.instagram.com/yadukrishnan-profile-url", // Placeholder
  },
  {
    name: "Behance",
    icon: "behance", // Assuming 'behance' icon exists
    link: "https://www.behance.net/yadukrishnan-profile-url", // Placeholder
  },
  {
    name: "Website", // For your existing "Photography & Videography | Yadu Krishna - Abu Dhabi"
    icon: "globe", // Assuming 'globe' or similar generic web icon exists
    link: "https://www.yourwebsite.com", // Placeholder
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`, // This will use the updated email
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg", // This OG image might need to be updated by Yadu later
  label: "Home",
  title: `${person.name} | Multimedia Specialist & Visual Storyteller`, // Updated title
  description: `Welcome to the portfolio of ${person.name}, a ${person.role} based in Abu Dhabi. Founder of Get Goated.`, // Updated description
  headline: <>Capturing Moments, Crafting Stories.</>, // New headline
  featured: {
    display: false, // Disabled for now
    title: <>Recent project: <strong className="ml-4">Your Awesome Project</strong></>,
    href: "/work/your-awesome-project-slug", // Placeholder
  },
  subline: (
    <>
      I'm {person.firstName}, a {person.role} and the founder of Get Goated. I specialize in bringing visions to life through photography, videography, and compelling digital content.
    </> // Updated subline
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About ${person.name} | Multimedia Specialist & Creative Entrepreneur`,
  description: `Learn more about ${person.name}, his skills, experience as a ${person.role}, and the story behind Get Goated.`,
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
    title: "Meet Yadu Krishnan",
    description: (
      <>
        Yadu Krishnan is an Abu Dhabi-based Multimedia Specialist and the founder of Get Goated. With a robust background in photography, videography, and digital content creation, Yadu is passionate about bringing creative visions to life. Fluent in English and Malayalam, he combines technical expertise with a keen eye for storytelling and a commitment to high-quality results. His work is characterized by clean, vibrant visuals and balanced lighting, tailored to a Gen Z-friendly aesthetic.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "SFC Plus",
        timeframe: "YYYY - Present", // Placeholder
        role: "Multimedia Specialist",
        achievements: [
          <>Developed and executed diverse multimedia projects, enhancing brand presence.</>,
          <>Managed video and photo production workflows, from concept to final delivery.</>,
        ],
        images: [], // Yadu can add project images later
      },
      {
        company: "Get Goated",
        timeframe: "YYYY - Present", // Placeholder for founding year
        role: "Founder / Creative Director",
        achievements: [
          <>Launched and managing a multimedia venture focused on innovative content creation.</>,
          <>Leading creative direction, client projects, and business development.</>,
        ],
        images: [],
      },
      {
        company: "Maven Events",
        timeframe: "YYYY - YYYY", // Placeholder
        role: "Photographer/Videographer", // Example role
        achievements: [
          <>Covered various events, delivering high-quality photographic and video content.</>,
          <>Collaborated with clients to meet event documentation requirements.</>,
        ],
        images: [],
      },
      {
        company: "Royal Swiss Auto Services",
        timeframe: "YYYY - YYYY", // Placeholder
        role: "Photographer/Videographer", // Example role
        achievements: [
          <>Produced promotional photo and video content for luxury automotive services.</>,
          <>Enhanced online visibility through compelling visual assets.</>,
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
        name: "Continuous Professional Development",
        description: <>Dedicated to ongoing learning in multimedia, photography, videography, and emerging digital technologies.</>,
      }
      // Yadu can add specific institutions or courses here
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Video Production & Editing",
        description: <>Adobe Premiere Pro, After Effects, DaVinci Resolve, CapCut. Expertise in color grading, storytelling, camera movements, and lighting.</>,
        images: [], // Yadu can add illustrative images/icons later
      },
      {
        title: "Photography & Photo Editing",
        description: <>Adobe Lightroom, Photoshop. Skilled in capturing clean, vibrant visuals with balanced lighting.</>,
        images: [],
      },
      {
        title: "Creative & Digital Strategy",
        description: <>Creative direction, digital marketing, social media management, and leveraging AI tools for content creation.</>,
        images: [],
      },
      {
        title: "Professional Attributes",
        description: <>Leadership, project management, client communication, and a hands-on approach to achieving high-quality results efficiently.</>,
        images: [],
      }
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog", // Keeping label for now, can be removed from header later if blog is unused
  title: `Insights & Stories by ${person.name}`,
  description: `Explore articles on multimedia trends, creative processes, tech insights, and behind-the-scenes stories from ${person.name}.`,
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
  title: `Photography Showcase | ${person.name}`,
  description: `A curated collection of vibrant photography by ${person.name}, showcasing diverse subjects and styles.`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/projects/project-01/cover-01.jpg",
      alt: "Gallery image 1",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/cover-02.jpg",
      alt: "Gallery image 2",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/cover-03.jpg",
      alt: "Gallery image 3",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/cover-04.jpg",
      alt: "Gallery image 4",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/image-01.jpg",
      alt: "Gallery image 5",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/image-02.jpg",
      alt: "Gallery image 6",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/project-01/image-03.jpg",
      alt: "Gallery image 7",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
