import { IconType } from 'react-icons';

import {
	HiChevronUp,
	HiChevronDown,
	HiChevronRight,
	HiChevronLeft,
	HiArrowUpRight,
	HiOutlineArrowPath,
	HiCheck,
	HiMiniQuestionMarkCircle,
	HiMiniXMark,
	HiOutlineLink,
	HiExclamationTriangle,
	HiInformationCircle,
	HiExclamationCircle,
	HiCheckCircle,
	HiMiniGlobeAsiaAustralia,
	HiEnvelope,
	HiCalendarDays
} from "react-icons/hi2";

import {
	PiHouseDuotone,
	PiUserCircleDuotone,
	PiGridFourDuotone,
	PiBookBookmarkDuotone,
	PiImageDuotone
} from "react-icons/pi";

import {
	FaDiscord,
	FaGithub,
	FaLinkedin,
	FaXTwitter
} from "react-icons/fa6";

export const iconLibrary: Record<string, IconType> = {
	chevronUp: HiChevronUp,
    chevronDown: HiChevronDown,
	chevronRight: HiChevronRight,
	chevronLeft: HiChevronLeft,
	refresh: HiOutlineArrowPath,
	arrowUpRight: HiArrowUpRight,
	check: HiCheck,
	helpCircle: HiMiniQuestionMarkCircle,
	infoCircle: HiInformationCircle,
	warningTriangle: HiExclamationTriangle,
	errorCircle: HiExclamationCircle,
	checkCircle: HiCheckCircle,
	email: HiEnvelope,
	globe: HiMiniGlobeAsiaAustralia,
	person: PiUserCircleDuotone,
	grid: PiGridFourDuotone,
	book: PiBookBookmarkDuotone,
	close: HiMiniXMark,
	openLink: HiOutlineLink,
	calendar: HiCalendarDays,
	home: PiHouseDuotone,
	gallery: PiImageDuotone,
	discord: FaDiscord,
	github: FaGithub,
	linkedin: FaLinkedin,
	x: FaXTwitter,
};