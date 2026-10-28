"use client";

import { blog } from "@/resources";
import { Button, useToast } from "@once-ui-system/core";
import { useEffect } from "react";
import { articleEnd, articleProgress, getPostBody, prefersReducedMotion } from "./articleScroll";

type Saved = { p: number; t: number };

// Below 10% there is nothing to resume; past 90% the reader has finished
const MIN_PROGRESS = 0.1;
const DONE_PROGRESS = 0.9;
const MAX_AGE = 1000 * 60 * 60 * 24 * 90;
const SAVE_EVERY = 1000;
const PROMPT_DELAY = 800;

// One bookmark per page, keyed by its path, so posts and projects never share one
const storageKey = (path: string) => `resume:${path}`;
const sessionKey = (path: string) => `resume-seen:${path}`;

// Storage can throw in private windows or with site data blocked, so every access is guarded
function readSaved(path: string): Saved | null {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(path)) || "null");
    return typeof saved?.p === "number" && typeof saved?.t === "number" ? saved : null;
  } catch {
    return null;
  }
}

function writeSaved(path: string, p: number) {
  try {
    localStorage.setItem(
      storageKey(path),
      JSON.stringify({ p: Math.round(p * 1000) / 1000, t: Date.now() }),
    );
  } catch {}
}

function clearSaved(path: string) {
  try {
    localStorage.removeItem(storageKey(path));
  } catch {}
}

// A page is offered once per tab: a refresh or a later visit in the same tab doesn't offer it again,
// because the browser restores the scroll position on its own after a refresh. Checking and marking
// are separate, and the mark is only written once the prompt delay has passed, so an effect that
// runs twice (React Strict Mode in development) doesn't use the visit up before the toast shows.
function seenThisSession(path: string) {
  try {
    return sessionStorage.getItem(sessionKey(path)) !== null;
  } catch {
    return true;
  }
}

function markSeen(path: string) {
  try {
    sessionStorage.setItem(sessionKey(path), "1");
  } catch {}
}

// Remembers how far a reader got through a post or project and, on their next visit, offers to
// jump back there with a toast. Renders nothing itself.
export function ResumeReading() {
  const { addToast, removeToast } = useToast();

  useEffect(() => {
    const body = getPostBody();
    if (!body) return;

    const path = window.location.pathname;
    const saved = readSaved(path);
    const fresh = !seenThisSession(path);
    let toastId: string | null = null;
    let target: number | null = null;

    const closePrompt = () => {
      if (toastId) removeToast(toastId);
      toastId = null;
      target = null;
    };

    const resume = () => {
      if (target !== null) {
        window.scrollTo({
          top: target * articleEnd(body),
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      }
      closePrompt();
    };

    let promptTimer: ReturnType<typeof setTimeout> | undefined;
    if (fresh) {
      // Give the page a beat to settle. Only now does the visit count as seen: the cleanup cancels
      // this timer, so a first effect run that is thrown away leaves the visit for the next one.
      promptTimer = setTimeout(() => {
        markSeen(path);
        if (
          !saved ||
          window.location.hash ||
          saved.p <= MIN_PROGRESS ||
          saved.p >= DONE_PROGRESS ||
          Date.now() - saved.t >= MAX_AGE
        ) {
          return;
        }
        // Skip it if they've already scrolled close by
        if (articleProgress(body) >= saved.p - 0.05) return;
        target = saved.p;
        toastId = addToast({
          tone: "info",
          message: blog.resumeReading?.prompt ?? "Pick up where you left off?",
          duration: 12000,
          action: (
            <Button
              size="s"
              variant="secondary"
              label={blog.resumeReading?.action ?? "Continue"}
              onClick={resume}
            />
          ),
        });
      }, PROMPT_DELAY);
    }

    let finished = false;
    let lastSave = 0;
    let saveTimer: ReturnType<typeof setTimeout> | undefined;

    const save = () => {
      saveTimer = undefined;
      lastSave = Date.now();
      // After a client-side navigation the old article is gone and can't be measured
      if (finished || !body.isConnected) return;
      const p = articleProgress(body);
      // Reaching the end clears the bookmark for good this visit, even if they scroll back up
      if (p >= DONE_PROGRESS) {
        finished = true;
        clearSaved(path);
      } else {
        writeSaved(path, p);
      }
    };

    const onScroll = () => {
      // Scrolled there on their own: the offer has done its job
      if (target !== null && articleProgress(body) >= target - 0.02) closePrompt();
      if (saveTimer) return;
      saveTimer = setTimeout(save, Math.max(0, SAVE_EVERY - (Date.now() - lastSave)));
    };

    const flush = () => {
      if (saveTimer) {
        clearTimeout(saveTimer);
        save();
      }
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearTimeout(promptTimer);
      flush();
      closePrompt();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [addToast, removeToast]);

  return null;
}
