import { Home, Person, Social } from "@/types";

const person: Person = {
  firstName: "StreakTap",
  lastName: "",
  name: "StreakTap",
  role: "iOS habit tracker",
  avatar: "/favicon.svg",
  email: "hello@streaktap.app",
  location: "Etc/UTC",
  languages: [],
};

const social: Social = [
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/og.png",
  label: "Home",
  title: "StreakTap — One tap. Every day.",
  description:
    "A minimalist iOS habit tracker. Tap once a day to build and keep your streak. No accounts, no ads, no noise.",
  headline: <>One tap. Every day. That's it.</>,
  featured: {
    display: false,
    title: <></>,
    href: "/",
  },
  subline: (
    <>
      StreakTap is a habit tracker with one job: help you show up every day,
      without distractions.
    </>
  ),
};

/**
 * App Store URL — search for `apps.apple.com/app/streaktap` to update.
 */
const appStoreUrl = "https://apps.apple.com/app/streaktap/id6769443048";

const landing = {
  tagline: "The simplest way to build a habit.",
  eyebrow: "For iOS",
  appStoreUrl,
  heroImage: "/images/hero-phone.png",

  widgets: {
    heading: "On your home screen. Not just in the app.",
    subline:
      "Add a StreakTap widget and see today's habits without opening anything.",
    items: [
      {
        image: "/images/widget-1.png",
        caption: "Small widget — today's streaks at a glance",
      },
      {
        image: "/images/widget-2.png",
        caption: "Medium widget — multiple habits in one view",
      },
      {
        image: "/images/widget-3.png",
        caption: "Large widget — full list with streak counts",
      },
      {
        image: "/images/widget-4.png",
        caption: "Lock screen widget — a single habit, always visible",
      },
      {
        image: "/images/widget-5.png",
        caption: "Lock screen widget — streak count only",
      },
    ],
  },

  steps: [
    {
      number: "01",
      title: "Add a habit.",
      body: "Name it. Pick a color if you want. Done.",
    },
    {
      number: "02",
      title: "Tap once a day.",
      body: "When you do the thing, tap the card. That's the whole interaction.",
    },
    {
      number: "03",
      title: "Watch the streak grow.",
      body: "Days become weeks. Weeks become months. No charts, no badges, no nudging.",
    },
  ],

  features: {
    does: [
      "Tracks daily habits with a single tap",
      "Shows current and best streaks",
      "Works offline; your data stays on your device",
      "Supports daily, weekly, and \"X times per week\" habits",
      "Lets you skip a day without breaking the streak (when you mean to)",
      "Reorders with a long-press and drag",
    ],
    doesnt: [
      "Send you push notifications you don't want",
      "Sell or share your data",
      "Ask you to sign up for an account",
      "Show ads",
      "Add streak-shaming or guilt mechanics",
      "Try to be a social network",
    ],
  },

  principles: [
    "Simplicity over features.",
    "Speed over flexibility.",
    "Clarity over customization.",
    "Function over decoration.",
  ],
  principlesClosing:
    "StreakTap exists because most habit trackers try to do too much. We picked the smallest possible thing that works — a daily tap — and refused to add anything that gets in its way.",

  faq: [
    { q: "Is it free?", a: "Yes." },
    { q: "Does it work on Android?", a: "Not yet. iOS only." },
    {
      q: "Where is my data stored?",
      a: "On your device. There is no account and no cloud sync.",
    },
    { q: "Can I export my data?", a: "Yes, from the settings screen." },
    {
      q: "What if I miss a day?",
      a: "You can mark it as a planned skip — that protects your streak. If you just miss it, the streak resets. We don't punish you about it.",
    },
    {
      q: "Do you send notifications?",
      a: "Only if you ask for them. Off by default.",
    },
  ],
};

export { person, social, home, landing, appStoreUrl };
