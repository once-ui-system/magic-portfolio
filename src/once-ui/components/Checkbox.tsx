"use client";

import React, { useState, useEffect, forwardRef } from "react";
import classNames from "classnames";
import { Flex, Icon, InteractiveDetails, InteractiveDetailsProps } from ".";
import styles from "./SharedInteractiveStyles.module.scss";

interface CheckboxProps
  extends Omit<InteractiveDetailsProps, "onClick">,
    React.InputHTMLAttributes<HTMLInputElement> {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  onToggle?: () => void;
}

const generateId = () => `checkbox-${Math.random().toString(36).substring(2, 9)}`;

const Checkbox: React.FC<CheckboxProps> = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      style,
      className,
      isChecked: controlledIsChecked,
      isIndeterminate = false,
      onToggle,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isChecked, setIsChecked] = useState(controlledIsChecked || false);
    const [checkboxId] = useState(generateId());

    useEffect(() => {
      if (controlledIsChecked !== undefined) {
        setIsChecked(controlledIsChecked);
      }
    }, [controlledIsChecked]);

    const toggleItem = () => {
      if (disabled) return;
      if (onToggle) {
        onToggle();
      } else {
        setIsChecked(!isChecked);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleItem();
      }
    };

    return (
      <Flex
        vertical="center"
        gap="16"
        className={classNames(styles.container, className, {
          [styles.disabled]: disabled,
        })}
        style={style}
      >
        <input
          type="checkbox"
          ref={ref}
          aria-checked={
            isIndeterminate
              ? "mixed"
              : controlledIsChecked !== undefined
                ? controlledIsChecked
                : isChecked
          }
          checked={controlledIsChecked !== undefined ? controlledIsChecked : isChecked}
          onChange={toggleItem}
          disabled={disabled}
          className={styles.hidden}
          tabIndex={-1}
          {...props}
        />
        <Flex
          style={{
            borderRadius: "min(var(--static-space-4), var(--radius-xs))",
          }}
          role="checkbox"
          position="relative"
          tabIndex={0}
          horizontal="center"
          vertical="center"
          radius="xs"
          aria-checked={
            isIndeterminate
              ? "mixed"
              : controlledIsChecked !== undefined
                ? controlledIsChecked
                : isChecked
          }
          aria-labelledby={checkboxId}
          onClick={toggleItem}
          onKeyDown={handleKeyDown}
          className={classNames(styles.element, {
            [styles.checked]:
              controlledIsChecked !== undefined
                ? controlledIsChecked || isIndeterminate
                : isChecked,
            [styles.disabled]: disabled,
          })}
        >
          {(controlledIsChecked !== undefined ? controlledIsChecked : isChecked) &&
            !isIndeterminate && (
              <Flex className={styles.icon}>
                <Icon onSolid="brand-strong" name="check" size="xs" />
              </Flex>
            )}
          {isIndeterminate && (
            <Flex className={styles.icon}>
              <Icon onSolid="brand-strong" name="minus" size="xs" />
            </Flex>
          )}
        </Flex>
        {props.label && <InteractiveDetails id={checkboxId} {...props} onClick={toggleItem} />}
      </Flex>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
