"use client";

import { blog, person, socialSharing } from "@/resources";
import type { IconName } from "@/resources/icons";
import { IconButton, Row, VisuallyHidden, useToast } from "@once-ui-system/core";
import { type KeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./QuoteShare.module.scss";
import { getPostBody } from "./articleScroll";

interface QuoteShareProps {
  title: string;
  url: string;
}

type Popover = { quote: string; top: number; left: number; below: boolean };

type QuoteAction = {
  key: string;
  icon: IconName;
  label: string;
  share?: (quote: string, title: string, url: string) => string;
};

const MIN_CHARS = 10;
const MAX_CHARS = 600;
// Leaves room for the name and the link inside X's 280 characters
const X_QUOTE_CHARS = 200;
const GAP = 8;
// On touch the native selection menu sits above the text and the drag handles hang below it
const TOUCH_GAP = 32;

const clip = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

// Labels from blog.quoteShare in content.tsx, with English defaults
const labels = {
  toolbar: blog.quoteShare?.toolbar ?? "Share quote",
  shareOn: blog.quoteShare?.shareOn ?? ((platform: string) => `Share quote on ${platform}`),
  copy: blog.quoteShare?.copy ?? "Copy quote",
  copied: blog.quoteShare?.copied ?? "Quote copied to clipboard",
  copyFailed: blog.quoteShare?.copyFailed ?? "Couldn't copy the quote",
  hint: blog.quoteShare?.hint ?? "Quote selected. Press Tab to share it.",
};

const attributed = (quote: string) => `"${quote}" — ${person.name}`;

// The platforms from socialSharing that can carry a quote as text; copy is copyLink. LinkedIn is
// left out: its documented share URL only takes a link, not prefilled text.
const quoteActions: QuoteAction[] = [
  {
    key: "x",
    icon: "twitter",
    label: "X",
    share: (quote, _title, url) =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(attributed(clip(quote, X_QUOTE_CHARS)))}&url=${encodeURIComponent(url)}`,
  },
  {
    key: "whatsapp",
    icon: "whatsapp",
    label: "WhatsApp",
    share: (quote, _title, url) =>
      `https://wa.me/?text=${encodeURIComponent(`${attributed(quote)} ${url}`)}`,
  },
  {
    key: "telegram",
    icon: "telegram",
    label: "Telegram",
    share: (quote, _title, url) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(attributed(quote))}`,
  },
  {
    key: "email",
    icon: "email",
    label: "Email",
    share: (quote, title, url) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${attributed(quote)}\n\n${url}`)}`,
  },
  { key: "copyLink", icon: "openLink", label: "Copy" },
];

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  // navigator.clipboard only exists on https and localhost, e.g. not when testing over the LAN
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(area);
  if (!ok) throw new Error("copy failed");
}

// Select a passage of the article to copy it as a quote or share it. With a keyboard, Tab moves
// from the selection into the toolbar, the arrow keys move between its buttons and Escape closes
// it. Platforms follow socialSharing.platforms in once-ui.config.ts.
export function QuoteShare({ title, url }: QuoteShareProps) {
  const [popover, setPopover] = useState<Popover | null>(null);
  const { addToast } = useToast();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const pointerDown = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const open = popover !== null;

  const actions = quoteActions.filter(
    (action) => socialSharing.platforms[action.key as keyof typeof socialSharing.platforms],
  );

  useEffect(() => {
    const body = getPostBody();
    if (!body) return;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const focusInside = () => !!toolbarRef.current?.contains(document.activeElement);

    const evaluate = () => {
      // Focus moved into the toolbar: the passage is already captured
      if (focusInside()) return;
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
        setPopover(null);
        return;
      }
      const range = selection.getRangeAt(0);
      const quote = selection.toString().replace(/\s+/g, " ").trim();
      const inside = body.contains(range.startContainer) && body.contains(range.endContainer);
      // A quoted code block reads badly in a post, so code is left alone
      const touchesCode = Array.from(body.querySelectorAll("pre")).some((pre) =>
        range.intersectsNode(pre),
      );
      if (!inside || touchesCode || quote.length < MIN_CHARS || quote.length > MAX_CHARS) {
        setPopover(null);
        return;
      }
      const rect = range.getBoundingClientRect();
      const below = touch || rect.top < 72;
      const top = below ? rect.bottom + (touch ? TOUCH_GAP : GAP) : rect.top - GAP;
      setPopover({ quote, left: rect.left + rect.width / 2, top, below });
    };

    // Wait for the pointer to come up before showing anything, so it never chases a drag
    const onSelectionChange = () => {
      clearTimeout(timer);
      timer = setTimeout(
        () => {
          if (!pointerDown.current) evaluate();
        },
        touch ? 400 : 150,
      );
    };
    const onPointerDown = () => {
      pointerDown.current = true;
    };
    const onPointerUp = () => {
      pointerDown.current = false;
      clearTimeout(timer);
      timer = setTimeout(evaluate, 10);
    };
    const hide = () => {
      if (!focusInside()) setPopover(null);
    };

    document.addEventListener("selectionchange", onSelectionChange);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("resize", hide);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("selectionchange", onSelectionChange);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("resize", hide);
    };
  }, []);

  // While the toolbar is up, Tab from the selection lands on its first button and Escape closes it
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      const toolbar = toolbarRef.current;
      if (!toolbar || toolbar.contains(document.activeElement)) return;
      if (event.key === "Escape") setPopover(null);
      if (event.key === "Tab" && !event.shiftKey) {
        event.preventDefault();
        returnFocus.current = document.activeElement as HTMLElement | null;
        toolbar.querySelector<HTMLElement>("button")?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Keep the whole toolbar on screen; its width depends on how many platforms are on
  useLayoutEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar || !popover) return;
    const half = toolbar.offsetWidth / 2;
    const left = Math.min(window.innerWidth - half - GAP, Math.max(half + GAP, popover.left));
    toolbar.style.left = `${left}px`;
  }, [popover]);

  if (actions.length === 0) return null;

  const hint = (
    <VisuallyHidden as="output" aria-live="polite">
      {popover ? labels.hint : ""}
    </VisuallyHidden>
  );

  if (!popover) return hint;

  // Done with the passage: drop the highlight so the toolbar doesn't pop straight back up
  const finish = () => {
    const back = returnFocus.current;
    returnFocus.current = null;
    window.getSelection()?.removeAllRanges();
    setPopover(null);
    if (back?.isConnected) back.focus();
  };

  const run = async (action: QuoteAction) => {
    if (action.share) {
      window.open(action.share(popover.quote, title, url), "_blank", "noopener,noreferrer");
    } else {
      try {
        await copyText(`${attributed(popover.quote)} ${url}`);
        addToast({ tone: "success", message: labels.copied });
      } catch {
        addToast({ tone: "danger", message: labels.copyFailed });
      }
    }
    finish();
  };

  // Roving focus between the buttons, as a toolbar should
  const onToolbarKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button"));
    const index = buttons.indexOf(document.activeElement as HTMLElement);
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: buttons.length - 1,
    };
    if (event.key === "Escape") {
      event.preventDefault();
      finish();
    } else if (event.key in moves) {
      event.preventDefault();
      buttons[(moves[event.key] + buttons.length) % buttons.length]?.focus();
    }
  };

  return (
    <>
      {hint}
      {createPortal(
        <Row
          ref={toolbarRef}
          className={`${styles.popover} ${popover.below ? styles.below : ""}`}
          position="fixed"
          zIndex={10}
          background="surface"
          border
          radius="m"
          shadow="l"
          padding="4"
          gap="2"
          role="toolbar"
          aria-label={labels.toolbar}
          style={{ top: popover.top, left: popover.left }}
          onKeyDown={onToolbarKeyDown}
          // Keep the selection alive while a button is pressed
          onPointerDown={(event) => event.stopPropagation()}
          onMouseDown={(event) => event.preventDefault()}
        >
          {actions.map((action) => {
            const label = action.share ? labels.shareOn(action.label) : labels.copy;
            return (
              <IconButton
                key={action.key}
                size="s"
                variant="tertiary"
                icon={action.icon}
                tooltip={label}
                aria-label={label}
                onClick={() => run(action)}
              />
            );
          })}
        </Row>,
        document.body,
      )}
    </>
  );
}
