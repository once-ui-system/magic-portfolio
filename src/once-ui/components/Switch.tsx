"use client";

import React, { forwardRef } from "react";
import classNames from "classnames";

import { Flex, InteractiveDetails, InteractiveDetailsProps, Spinner } from ".";
import styles from "./Switch.module.scss";
import commonStyles from "./SharedInteractiveStyles.module.scss";

interface SwitchProps
  extends Omit<InteractiveDetailsProps, "onClick">,
    React.InputHTMLAttributes<HTMLInputElement> {
  style?: React.CSSProperties;
  className?: string;
  isChecked: boolean;
  loading?: boolean;
  name?: string;
  value?: string;
  disabled?: boolean;
  reverse?: boolean;
  ariaLabel?: string;
  onToggle: () => void;
}

const Switch: React.FC<SwitchProps> = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      isChecked,
      reverse = false,
      loading = false,
      onToggle,
      ariaLabel = "Toggle switch",
      disabled,
      name,
      value,
      ...props
    },
    ref,
  ) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!disabled && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onToggle();
      }
    };

    const handleClick = () => {
      if (!disabled) {
        onToggle();
      }
    };

    return (
      <Flex
        gap="16"
        vertical="center"
        horizontal={reverse ? "space-between" : undefined}
        fillWidth={reverse}
        className={classNames(styles.container, className, {
          [styles.reverse]: reverse,
          [styles.disabled]: disabled,
        })}
        onClick={handleClick}
        role="switch"
        aria-checked={isChecked}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        tabIndex={-1}
      >
        <input
          ref={ref}
          type="checkbox"
          name={name}
          value={value}
          checked={isChecked}
          onChange={onToggle}
          className={commonStyles.hidden}
          tabIndex={-1}
        />
        <div
          className={classNames(styles.switch, {
            [styles.checked]: isChecked,
            [styles.disabled]: disabled,
          })}
        >
          <div
            onKeyDown={handleKeyDown}
            tabIndex={disabled ? -1 : 0}
            className={classNames(styles.element, {
              [styles.checked]: isChecked,
              [styles.disabled]: disabled,
            })}
          >
            {loading && <Spinner size="xs" />}
          </div>
        </div>
        {props.label && <InteractiveDetails {...props} onClick={() => {}} />}
      </Flex>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
