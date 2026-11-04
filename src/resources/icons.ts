import { IconType } from "react-icons";

import {
  HiArrowUpRight,
  HiOutlineLink,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiCalendarDays,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineDocument,
  HiOutlineGlobeAsiaAustralia,
  HiOutlineRocketLaunch,
  HiOutlineNewspaper,
  HiOutlineSparkles,
  HiOutlineCpuChip,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineMagnifyingGlass,
  HiOutlineFire,
  HiPlus,
  HiOutlineMicrophone,
} from "react-icons/hi2";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
} from "react-icons/pi";

import {
  SiJavascript,
  SiNextdotjs,
  SiFigma,
  SiSupabase,
  SiReact,
  SiTypescript,
  SiAngular,
  SiPhp,
  SiMysql,
  SiDocker,
} from "react-icons/si";

import { FaJava } from "react-icons/fa6";

import { FaApple } from "react-icons/fa6";

import { FaDiscord, FaGithub, FaLinkedin, FaX, FaThreads, FaXTwitter, FaFacebook, FaPinterest, FaWhatsapp, FaReddit, FaTelegram, } from "react-icons/fa6";

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
  supabase: SiSupabase,
  figma: SiFigma,
  facebook: FaFacebook,
  pinterest: FaPinterest,
  whatsapp: FaWhatsapp,
  reddit: FaReddit,
  telegram: FaTelegram,
  newspaper: HiOutlineNewspaper,
  sparkles: HiOutlineSparkles,
  chip: HiOutlineCpuChip,
  chevronLeft: HiChevronLeft,
  chevronRight: HiChevronRight,
  search: HiOutlineMagnifyingGlass,
  fire: HiOutlineFire,
  apple: FaApple,
  plus: HiPlus,
  microphone: HiOutlineMicrophone,
  react: SiReact,
  typescript: SiTypescript,
  angular: SiAngular,
  php: SiPhp,
  mysql: SiMysql,
  docker: SiDocker,
  java: FaJava,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;
