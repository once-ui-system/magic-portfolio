"use client";
import React from "react";
import styles from "./BorderBeam.module.scss";
import classNames from "classnames";

export const BorderBeam = ({ className }: { className?: string }) => {
  return <div className={classNames(styles.beam, className)} />;
};
