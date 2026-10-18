// Every font an aesthetic can use. Each one gets its own CSS variable, and the
// aesthetic decides which variable becomes heading, body, label and code text
// (see `fonts` in aesthetics.ts). Browsers only download the fonts a page uses.
//
// To add a font: import it from next/font/google (or next/font/local), give it
// a variable here, and add it to `fontFamilies` below.
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Inter_Tight,
  JetBrains_Mono,
} from "next/font/google";

const geist = Geist({
  variable: "--font-family-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-family-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-family-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

const interTight = Inter_Tight({
  variable: "--font-family-inter-tight",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-family-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-family-bricolage",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const fontFamilies = {
  geist,
  geistMono,
  instrumentSerif,
  interTight,
  jetbrainsMono,
  bricolage,
};

export type FontFamily = keyof typeof fontFamilies;
