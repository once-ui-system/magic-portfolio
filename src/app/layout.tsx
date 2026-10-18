import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import type { Viewport } from "next";
import classNames from "classnames";

import { Column, Flex, Meta } from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers } from "@/components";
import { AestheticBackground } from "@/components/aesthetic/AestheticBackground";
import { AestheticStyles } from "@/components/aesthetic/AestheticStyles";
import { AestheticSwitcher } from "@/components/aesthetic/AestheticSwitcher";
import {
  aesthetic,
  baseURL,
  dataStyle,
  display,
  fontFamilies,
  aesthetics,
  home,
  person,
  style,
  styleOverrides,
} from "@/resources";

// Theme attributes of every aesthetic (with styleOverrides applied), so the
// theme script can restore a visitor's pick before the first paint.
function aestheticAttributes() {
  const { theme: _theme, ...overrides } = styleOverrides;
  return Object.fromEntries(
    Object.entries(aesthetics).map(([name, preset]) => {
      const merged = { ...preset.style, ...overrides };
      return [
        name,
        {
          brand: merged.brand,
          accent: merged.accent,
          neutral: merged.neutral,
          solid: merged.solid,
          "solid-style": merged.solidStyle,
          border: merged.border,
          surface: merged.surface,
          transition: merged.transition,
          scaling: merged.scaling,
        },
      ];
    }),
  );
}

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

// viewport-fit=cover lets the bottom menu sit above the home indicator
// (see Header.module.scss) instead of the browser letterboxing the page.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang={person.locale ?? "en"}
      data-aesthetic={aesthetic}
      fillWidth
      className={classNames(Object.values(fontFamilies).map((font) => font.variable))}
    >
      <head>
        <AestheticStyles />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = 'system';
                  
                  // Set defaults from config
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    "viz-style": dataStyle.variant,
                  })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // With the aesthetic switcher on, restore the visitor's last pick
                  ${
                    display.aestheticSwitcher
                      ? `
                  const savedAesthetic = localStorage.getItem('data-aesthetic');
                  const aestheticStyles = ${JSON.stringify(aestheticAttributes())};
                  if (savedAesthetic && aestheticStyles[savedAesthetic]) {
                    root.setAttribute('data-aesthetic', savedAesthetic);
                    Object.entries(aestheticStyles[savedAesthetic]).forEach(([key, value]) => {
                      root.setAttribute('data-' + key, value);
                    });
                  }`
                      : ""
                  }

                  // Apply saved theme
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <Column
          as="body"
          background="page"
          fillWidth
          style={{ minHeight: "100vh" }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          <AestheticBackground />
          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          {display.aestheticSwitcher && <AestheticSwitcher />}
          <Header />
          <Flex as="main" zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
        </Column>
      </Providers>
    </Flex>
  );
}
