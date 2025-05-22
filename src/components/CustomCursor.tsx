"use client";

import React, { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.scss";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide the default cursor
    document.body.style.cursor = "none";
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Center the custom cursor on the pointer
        cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
      }
    };
    document.addEventListener("mousemove", moveCursor);
    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return <div ref={cursorRef} className={styles.cursor} />;
};

export default CustomCursor;
