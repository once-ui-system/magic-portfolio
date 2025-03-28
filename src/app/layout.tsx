// External dependencies
import { Inter, Source_Code_Pro } from "next/font/google";
import classNames from "classnames";

// Internal dependencies
import { Footer, Header, RouteGuard } from "@/components";
import { baseURL, effects, style } from "@/app/resources";
import { person, home } from "@/app/resources/content";
import { Background, Column, Flex, ToastProvider } from "@/once-ui/components";

// Styles
import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

/**
 * Generates metadata for the application including SEO-related information
 * @returns Metadata object for Next.js
 */
export async function generateMetadata() {
  return {
    metadataBase: new URL(`https://${baseURL}`),
    title: home.title,
    description: home.description,
    openGraph: {
      title: `${person.firstName}'s Portfolio`,
      description: "Portfolio website showcasing my work.",
      url: baseURL,
      siteName: `${person.firstName}'s Portfolio`,
      locale: "en_US",
      type: "website",
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
  };
}

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Configuration type for fonts used in the application
 */
type FontConfig = {
  variable: string;
};

// TODO: Add secondary and tertiary fonts from https://once-ui.com/customize when needed
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;

const code = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Props for the RootLayout component
 */
interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout component that wraps the entire application
 * Provides styling, fonts, and global UI elements like Header and Footer
 */
export default async function RootLayout({ children }: RootLayoutProps) {
  return (
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
        code.variable,
      )}
    >
      <ToastProvider>
        <Column style={{ minHeight: "100vh" }} as="body" fillWidth margin="0" padding="0">
          <Background
            mask={{
              cursor: effects.mask.cursor,
              x: effects.mask.x,
              y: effects.mask.y,
              radius: effects.mask.radius,
            }}
            gradient={{
              display: effects.gradient.display,
              x: effects.gradient.x,
              y: effects.gradient.y,
              width: effects.gradient.width,
              height: effects.gradient.height,
              tilt: effects.gradient.tilt,
              colorStart: effects.gradient.colorStart,
              colorEnd: effects.gradient.colorEnd,
              opacity: effects.gradient.opacity,
            }}
            dots={{
              display: effects.dots.display,
              color: effects.dots.color,
              size: effects.dots.size,
              opacity: effects.dots.opacity,
            }}
            grid={{
              display: effects.grid.display,
              color: effects.grid.color,
              width: effects.grid.width,
              height: effects.grid.height,
              opacity: effects.grid.opacity,
            }}
            lines={{
              display: effects.lines.display,
              opacity: effects.lines.opacity,
            }}
          />
          <Flex fillWidth minHeight="16"></Flex>
          <Header />
          <Flex
            position="relative"
            zIndex={0}
            fillWidth
            paddingY="l"
            paddingX="l"
            horizontal="center"
            flex={1}
          >
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
        </Column>
      </ToastProvider>
    </Flex>
  );
}
