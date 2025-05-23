"use client";
import React from "react";
import { Button, ButtonProps } from "@/once-ui/components";
import styles from "./ShimmerButton.module.scss";
import classNames from "classnames";

export const ShimmerButton = ({ className, children, ...props }: ButtonProps) => {
  return (
    <Button className={classNames(styles.shimmer, className)} {...props}>
      {children}
    </Button>
  );
};
