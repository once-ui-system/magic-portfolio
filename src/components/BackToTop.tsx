"use client";

import { backToTop } from "@/resources";
import { IconButton, Row } from "@once-ui-system/core";
import { useEffect, useState } from "react";
import styles from "./BackToTop.module.scss";

// The button shows once the visitor is this far down the page.
const SHOW_AFTER = 600;

const scrollToTop = () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
};

/** Floating button that scrolls back to the top. Turn it off with features.backToTop. */
export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > SHOW_AFTER);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Styled like the header's menu, corners included (data-border, as on the header). On phones it
  // sits above the menu bar at the bottom.
  return (
    <Row
      data-border="rounded"
      position="fixed"
      bottom="24"
      right="24"
      zIndex={9}
      background="page"
      border="neutral-alpha-weak"
      radius="m-4"
      shadow="l"
      padding="4"
      className={styles.backToTop}
      data-visible={visible}
      inert={!visible}
    >
      <IconButton
        icon="arrowUp"
        variant="ghost"
        tooltip={backToTop.label ?? "Back to top"}
        tooltipPosition="left"
        onClick={scrollToTop}
      />
    </Row>
  );
};
