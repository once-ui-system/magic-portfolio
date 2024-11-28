import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from "classnames";

import { Footer, Header, RouteGuard } from "@/components";
import { baseURL, effects, style } from "@/app/resources";

import { Inter } from "next/font/google";
import { Source_Code_Pro } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";

import { routing } from "@/i18n/routing";
import { Background, Flex } from "@/once-ui/components";

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "black",
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();

  return {
    metadataBase: new URL(`https://${baseURL}/${locale}`),
    title: "Daniel Crotty | The Lax Teacher",
    description:
      "Daniel Crotty, 3x All-American and 2021 MAC Defensive Player of the Year, offers personalized lacrosse lessons for all positions, ages, and skill levels in Charlotte, NC.",
    openGraph: {
      title: "Daniel Crotty | The Lax Teacher",
      description:
        "Learn lacrosse from Daniel Crotty, a former college coach, 3x All-American, and 2021 MAC Defensive Player of the Year. Private and group lessons for all skill levels in Charlotte, NC.",
      url: `https://${baseURL}/${locale}`,
      siteName: "Daniel Crotty | The Lax Teacher",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `https://${baseURL}/images/north_south_game.png`,
          width: 828,
          height: 1465,
          alt: "Daniel Crotty teaching lacrosse players on the field",
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: "Daniel Crotty | The Lax Teacher",
      description:
        "Daniel Crotty, 3x All-American and 2021 MAC Defensive Player of the Year, offers personalized lacrosse lessons for all positions, ages, and skill levels in Charlotte, NC.",
      images: [`https://${baseURL}/images/north_south_game.png`],
    },
    themeColor: "#1a73e8",
  };
}

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

type FontConfig = {
  variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
 */

const code = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={messages}>
      <Flex
        as="html"
        lang="en"
        background="page"
        data-neutral={style.neutral}
        data-brand={style.brand}
        data-accent={style.accent}
        data-solid={style.solid}
        data-solid-style={style.solidStyle}
        data-theme={style.theme}
        data-border={style.border}
        data-surface={style.surface}
        data-transition={style.transition}
        className={classNames(
          primary.variable,
          secondary ? secondary.variable : "",
          tertiary ? tertiary.variable : "",
          code.variable
        )}
      >
        <Flex
          style={{ minHeight: "100vh" }}
          as="body"
          fillWidth
          margin="0"
          padding="0"
          direction="column"
        >
          <Background
            mask={effects.mask as any}
            gradient={effects.gradient as any}
            dots={effects.dots as any}
            lines={effects.lines as any}
          />
          <Flex fillWidth minHeight="16"></Flex>
          <Header />
          <Flex
            zIndex={0}
            fillWidth
            paddingY="l"
            paddingX="l"
            justifyContent="center"
            flex={1}
          >
            <Flex justifyContent="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
        </Flex>
      </Flex>
    </NextIntlClientProvider>
  );
}
