"use client";

import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from "react";
import styles from "./ActionButton.module.scss";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(function ActionButton(
  {
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    children,
    className,
    disabled,
    onClick,
    type = "button",
    ...rest
  },
  ref,
) {
  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      className={[styles.button, styles[variant], styles[size], className]
        .filter(Boolean)
        .join(" ")}
      aria-busy={loading || undefined}
      aria-disabled={loading || disabled || undefined}
      disabled={disabled}
      onClick={(event) => {
        if (loading) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={styles.label}>
        {icon}
        {children}
      </span>
    </button>
  );
});

export default ActionButton;
