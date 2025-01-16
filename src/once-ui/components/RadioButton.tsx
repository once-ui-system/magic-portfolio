"use client";

import React, { useState, useEffect, forwardRef } from "react";
import classNames from "classnames";
import { Flex, InteractiveDetails, InteractiveDetailsProps } from ".";
import styles from "./SharedInteractiveStyles.module.scss";

interface RadioButtonProps
  extends Omit<InteractiveDetailsProps, "onClick">,
    React.InputHTMLAttributes<HTMLInputElement> {
  style?: React.CSSProperties;
  className?: string;
  isChecked?: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
  onToggle?: () => void;
}

const generateId = () => `radio-${Math.random().toString(36).substring(2, 9)}`;

const RadioButton: React.FC<RadioButtonProps> = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    { style, className, isChecked: controlledIsChecked, name, value, onToggle, disabled, ...props },
    ref,
  ) => {
    const [isChecked, setIsChecked] = useState(controlledIsChecked || false);
    const [radioId] = useState(generateId());

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
        zIndex={1}
        className={classNames(styles.container, className, {
          [styles.disabled]: disabled,
        })}
        style={style}
      >
        <input
          type="radio"
          ref={ref}
          name={name}
          value={value}
          checked={controlledIsChecked !== undefined ? controlledIsChecked : isChecked}
          onChange={toggleItem}
          disabled={disabled}
          className={styles.hidden}
          tabIndex={-1}
          {...props}
        />
        <Flex
          role="radio"
          aria-checked={controlledIsChecked !== undefined ? controlledIsChecked : isChecked}
          aria-labelledby={radioId}
          aria-disabled={disabled}
          position="relative"
          horizontal="center"
          vertical="center"
          radius="full"
          onClick={toggleItem}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          className={classNames(styles.element, {
            [styles.checked]: controlledIsChecked !== undefined ? controlledIsChecked : isChecked,
            [styles.disabled]: disabled,
          })}
        >
          {(controlledIsChecked !== undefined ? controlledIsChecked : isChecked) && (
            <Flex
              style={{
                backgroundColor: "var(--neutral-on-solid-strong)",
              }}
              radius="full"
              width="12"
              height="12"
              className={styles.icon}
            />
          )}
        </Flex>
        {props.label && <InteractiveDetails id={radioId} {...props} onClick={toggleItem} />}
      </Flex>
    );
  },
);

RadioButton.displayName = "RadioButton";

export { RadioButton };
export type { RadioButtonProps };
