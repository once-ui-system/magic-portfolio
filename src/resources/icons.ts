import {IconType} from "react-icons";

import {
    HiArrowRight,
    HiArrowTopRightOnSquare,
    HiArrowUpRight,
    HiCalendarDays,
    HiEnvelope,
    HiOutlineDocument,
    HiOutlineEye,
    HiOutlineEyeSlash,
    HiOutlineGlobeAsiaAustralia,
    HiOutlineLink,
    HiOutlineRocketLaunch,
} from "react-icons/hi2";

import {
    PiBookBookmarkDuotone,
    PiGridFourDuotone,
    PiHouseDuotone,
    PiImageDuotone,
    PiUserCircleDuotone,
} from "react-icons/pi";

import {
    SiAdguard,
    SiCplusplus,
    SiDart,
    SiFigma,
    SiFlutter,
    SiJavascript,
    SiKotlin,
    SiMariadb,
    SiMongodb,
    SiNextdotjs,
    SiNodedotjs,
    SiReact,
    SiSupabase,
    SiTypescript,
} from "react-icons/si";

import {
    FaDiscord,
    FaFacebook,
    FaGithub,
    FaLinkedin,
    FaPinterest,
    FaReddit,
    FaTelegram,
    FaThreads,
    FaWhatsapp,
    FaX,
    FaXTwitter,
} from "react-icons/fa6";
import {TbBrandCSharp} from "react-icons/tb";
import {FaDog, FaJava} from "react-icons/fa";

export const iconLibrary: Record<string, IconType> = {
    arrowUpRight: HiArrowUpRight,
    arrowRight: HiArrowRight,
    email: HiEnvelope,
    globe: HiOutlineGlobeAsiaAustralia,
    person: PiUserCircleDuotone,
    grid: PiGridFourDuotone,
    book: PiBookBookmarkDuotone,
    openLink: HiOutlineLink,
    calendar: HiCalendarDays,
    home: PiHouseDuotone,
    gallery: PiImageDuotone,
    discord: FaDiscord,
    eye: HiOutlineEye,
    eyeOff: HiOutlineEyeSlash,
    github: FaGithub,
    linkedin: FaLinkedin,
    x: FaX,
    twitter: FaXTwitter,
    threads: FaThreads,
    arrowUpRightFromSquare: HiArrowTopRightOnSquare,
    document: HiOutlineDocument,
    rocket: HiOutlineRocketLaunch,
    javascript: SiJavascript,
    nextjs: SiNextdotjs,
    nodejs: SiNodedotjs,
    csharp: TbBrandCSharp,
    java: FaJava,
    kotlin: SiKotlin,
    flutter: SiFlutter,
    dart: SiDart,
    typescript: SiTypescript,
    reactjs: SiReact,
    cplusplus: SiCplusplus,
    rover: FaDog,
    adguard: SiAdguard,
    mongodb: SiMongodb,
    sql: SiMariadb,
    supabase: SiSupabase,
    figma: SiFigma,
    facebook: FaFacebook,
    pinterest: FaPinterest,
    whatsapp: FaWhatsapp,
    reddit: FaReddit,
    telegram: FaTelegram,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
