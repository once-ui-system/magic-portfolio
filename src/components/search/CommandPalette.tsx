"use client";

import {
  about,
  blog,
  display,
  gallery,
  home,
  person,
  routes,
  search,
  social,
  work,
} from "@/resources";
import type { IconName } from "@/resources/icons";
import { formatDate } from "@/utils/formatDate";
import type { SearchEntry } from "@/utils/searchIndex";
import {
  Button,
  IconButton,
  Kbar,
  type KbarItem,
  Kbd,
  Row,
  useHotkeys,
  useTheme,
  useToast,
} from "@once-ui-system/core";
import { useMemo, useState } from "react";

// Another dialog, or an enlarged image, is open: the palette must not open on top of it.
const otherOverlayOpen = () =>
  document.querySelector('[aria-modal="true"], [role="button"][aria-expanded="true"]') !== null;

// Labels from `search` in content.tsx, with English defaults
const labels = {
  search: search.label ?? "Search",
  pages: search.sections?.pages ?? "Pages",
  actions: search.sections?.actions ?? "Actions",
  links: search.sections?.links ?? "Links",
  theme: search.actions?.theme ?? "Switch light or dark theme",
  copyEmail: search.actions?.copyEmail ?? "Copy email address",
  emailCopied: search.actions?.emailCopied ?? "Email address copied.",
  rss: search.actions?.rss ?? "RSS feed",
};

const openInNewTab = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

const pages: { href: keyof typeof routes; label: string; description: string; icon: IconName }[] = [
  { href: "/", label: home.label, description: home.description, icon: "home" },
  { href: "/about", label: about.label, description: about.description, icon: "person" },
  { href: "/work", label: work.label, description: work.description, icon: "grid" },
  { href: "/blog", label: blog.label, description: blog.description, icon: "book" },
  { href: "/gallery", label: gallery.label, description: gallery.description, icon: "gallery" },
];

type CommandPaletteProps = {
  /** Posts and projects from `buildSearchIndex`, built on the server. */
  entries: SearchEntry[];
};

/**
 * ⌘K / Ctrl+K command palette on core `Kbar`: pages, posts, projects, a few actions and the social
 * links. "/" opens it too when you're not typing. Turn it off with features.search.
 */
export function CommandPalette({ entries }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const { addToast } = useToast();

  const requestOpen = (next: boolean) => {
    if (next && otherOverlayOpen()) return;
    setOpen(next);
  };

  useHotkeys("/", () => requestOpen(true), { enabled: !open });

  const items = useMemo<KbarItem[]>(() => {
    const pageItems: KbarItem[] = pages
      .filter((page) => routes[page.href])
      .map((page) => ({
        id: `page:${page.href}`,
        name: page.label,
        section: labels.pages,
        href: page.href,
        icon: page.icon,
        keywords: page.description,
      }));

    const entryItems: KbarItem[] = entries.map((entry) => ({
      id: entry.id,
      name: entry.title,
      section: entry.kind === "post" ? blog.label : work.label,
      href: entry.href,
      icon: entry.kind === "post" ? "document" : "rocket",
      keywords: entry.keywords,
      description: entry.kind === "post" ? formatDate(entry.publishedAt) : undefined,
    }));

    const actions: KbarItem[] = [];
    if (display.themeSwitcher) {
      actions.push({
        id: "action:theme",
        name: labels.theme,
        section: labels.actions,
        icon: "dark",
        keywords: "theme dark light mode appearance",
        perform: () => {
          const current = document.documentElement.getAttribute("data-theme");
          setTheme(current === "dark" ? "light" : "dark");
        },
      });
    }
    if (person.email) {
      actions.push({
        id: "action:email",
        name: labels.copyEmail,
        section: labels.actions,
        icon: "copy",
        keywords: `email contact mail ${person.email}`,
        description: person.email,
        perform: () => {
          if (!navigator.clipboard) {
            addToast({ tone: "neutral", message: person.email });
            return;
          }
          navigator.clipboard.writeText(person.email).then(
            () => addToast({ tone: "success", message: labels.emailCopied }),
            () => addToast({ tone: "neutral", message: person.email }),
          );
        },
      });
    }
    if (routes["/blog"]) {
      actions.push({
        id: "action:rss",
        name: labels.rss,
        section: labels.actions,
        icon: "rss",
        keywords: "rss feed subscribe reader",
        perform: () => openInNewTab("/api/rss"),
      });
    }

    const links: KbarItem[] = social
      .filter((item) => item.link && !item.link.startsWith("mailto:"))
      .map((item) => ({
        id: `social:${item.name}`,
        name: item.name,
        section: labels.links,
        icon: item.icon,
        keywords: "social profile",
        perform: () => openInNewTab(item.link),
      }));

    return [...pageItems, ...entryItems, ...actions, ...links];
  }, [entries, setTheme, addToast]);

  return (
    <Kbar
      items={items}
      open={open}
      onOpenChange={requestOpen}
      aria-label={labels.search}
      radius="m"
    >
      {/* Without a click handler these render as plain elements: the Kbar trigger is the button. */}
      <Row s={{ hide: true }}>
        <Button variant="ghost" prefixIcon="search" weight="default">
          <Kbd keys="mod+k" />
        </Button>
      </Row>
      <Row hide s={{ hide: false }}>
        <IconButton variant="ghost" icon="search" aria-label={labels.search} />
      </Row>
    </Kbar>
  );
}
