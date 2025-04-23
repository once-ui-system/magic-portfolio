"use client";

import React, { forwardRef, useState } from "react";
import { Input } from ".";
import { Flex } from ".";
import { IconButton } from ".";
import styles from "./NumberInput.module.scss";
import classNames from "classnames";

interface NumberInputProps
  extends Omit<React.ComponentProps<typeof Input>, "type" | "value" | "onChange"> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  padStart?: number;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ value, onChange, min, max, step = 1, padStart, ...props }, ref) => {
    const [localValue, setLocalValue] = useState<string>(
      padStart && value !== undefined
        ? value.toString().padStart(padStart, "0")
        : (value?.toString() ?? ""),
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);

      const numValue = parseFloat(newValue);
      if (!isNaN(numValue) && onChange) {
        onChange(numValue);
      }
    };

    const updateValue = (newValue: number) => {
      const formattedValue = padStart
        ? newValue.toString().padStart(padStart, "0")
        : newValue.toString();
      setLocalValue(formattedValue);
      onChange?.(newValue);
    };

    const increment = () => {
      const currentValue = parseFloat(localValue) || 0;
      const newValue = currentValue + step;
      if (max === undefined || newValue <= max) {
        updateValue(newValue);
      }
    };

    const decrement = () => {
      const currentValue = parseFloat(localValue) || 0;
      const newValue = currentValue - step;
      if (min === undefined || newValue >= min) {
        updateValue(newValue);
      }
    };

    return (
      <Input
        {...props}
        ref={ref}
        type="number"
        value={localValue}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        hasSuffix={
          <>
            <Flex position="static" minWidth={1.25}></Flex>
            <Flex
              position="absolute"
              right="0"
              top="0"
              direction="column"
              borderLeft="neutral-medium"
              fillHeight
              background="neutral-alpha-weak"
            >
              <Flex
                fillHeight
                position="static"
                borderBottom="neutral-medium"
                paddingX="4"
                className={classNames(styles.stepper, "transition-micro-medium")}
              >
                <IconButton
                  icon="chevronUp"
                  variant="ghost"
                  size="s"
                  onClick={increment}
                  aria-label="Increment value"
                />
              </Flex>
              <Flex
                fillHeight
                position="static"
                paddingX="4"
                className={classNames(styles.stepper, "transition-micro-medium")}
              >
                <IconButton
                  icon="chevronDown"
                  variant="ghost"
                  size="s"
                  onClick={decrement}
                  aria-label="Decrement value"
                />
              </Flex>
            </Flex>
          </>
        }
        className={styles.numberInput}
      />
    );
  },
);

NumberInput.displayName = "NumberInput";
export { NumberInput };
