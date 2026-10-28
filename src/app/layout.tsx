import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import type { Viewport } from "next";
import classNames from "classnames";

import { Column, Flex, Meta, ThemeInit } from "@once-ui-system/core";
import { BackToTop, Footer, Header, RouteGuard, Providers } from "@/components";
import { ServerRendered } from "@/components/ServerRendered";
import { AestheticBackground } from "@/components/aesthetic/AestheticBackground";
import { AestheticStyles } from "@/components/aesthetic/AestheticStyles";
import { AestheticSwitcher } from "@/components/aesthetic/AestheticSwitcher";
import { buildSearchIndex } from "@/utils/searchIndex";
import { NavigationProgress } from "@/components/motion";
import {
  aesthetic,
  baseURL,
  dataStyle,
  display,
  features,
  fontFamilies,
  aesthetics,
  home,
  person,
  style,
  styleOverrides,
} from "@/resources";

// Theme attributes of every aesthetic (with styleOverrides applied), so the
// init script can restore a visitor's pick before the first paint.
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

// Runs right after Once UI's ThemeInit, which paints the configured theme and style first.
function themeInitExtras() {
  const parts: string[] = [];

  // Once UI's ThemeProvider follows the device when no theme is saved, which would undo a light
  // or dark default on hydration. Saving the default as the visitor's choice keeps it, and the
  // theme switcher still changes it.
  if (style.theme !== "system") {
    parts.push(`if (!localStorage.getItem('data-theme')) {
      localStorage.setItem('data-theme', ${JSON.stringify(style.theme)});
    }`);
  }

  // With the aesthetic switcher on, restore the visitor's last pick.
  if (display.aestheticSwitcher) {
    parts.push(`const saved = localStorage.getItem('data-aesthetic');
    const styles = ${JSON.stringify(aestheticAttributes())};
    if (saved && styles[saved]) {
      root.setAttribute('data-aesthetic', saved);
      Object.entries(styles[saved]).forEach(([key, value]) => {
        root.setAttribute('data-' + key, value);
      });
    }`);
  }

  if (!parts.length) return null;
  return `(function() {
  try {
    const root = document.documentElement;
    ${parts.join("\n    ")}
  } catch (e) {}
})();`;
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
  const initScript = themeInitExtras();

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
        {/* Their server copy runs before the first paint; see ServerRendered */}
        <ServerRendered>
          <ThemeInit config={style} dataStyle={dataStyle} />
          {initScript && (
            <script
              id="theme-init-extras"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: runs before the first paint; the payload is our own config
              dangerouslySetInnerHTML={{ __html: initScript }}
            />
          )}
        </ServerRendered>
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
          {(features.navigationProgress ?? true) && <NavigationProgress />}
          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          {display.aestheticSwitcher && <AestheticSwitcher />}
          <Header searchEntries={(features.search ?? true) ? buildSearchIndex() : undefined} />
          <Flex as="main" zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
          {(features.backToTop ?? true) && <BackToTop />}
        </Column>
      </Providers>
    </Flex>
  );
}
