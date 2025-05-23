"use client";
import React from "react";
import styles from "./BlurIn.module.scss";

interface BlurInProps {
  children: React.ReactNode;
  delay?: number;
}

export const BlurIn = ({ children, delay = 0 }: BlurInProps) => {
  return (
    <div className={styles.blurIn} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
};
