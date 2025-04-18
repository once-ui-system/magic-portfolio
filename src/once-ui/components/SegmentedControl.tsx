"use client";

import { useState, useEffect, useRef } from "react";
import { ToggleButton, Scroller, Flex } from ".";
import type { ToggleButtonProps } from "./ToggleButton";

interface ButtonOption extends Omit<ToggleButtonProps, "selected"> {
  value: string;
}

interface SegmentedControlProps extends Omit<React.ComponentProps<typeof Scroller>, "onToggle"> {
  buttons: ButtonOption[];
  onToggle: (value: string, event?: React.MouseEvent<HTMLButtonElement>) => void;
  defaultSelected?: string;
  fillWidth?: boolean;
  selected?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  buttons,
  onToggle,
  defaultSelected,
  fillWidth = true,
  selected,
  className,
  style,
  ...scrollerProps
}) => {
  const [internalSelected, setInternalSelected] = useState<string>(() => {
    if (selected !== undefined) return selected;
    if (defaultSelected !== undefined) return defaultSelected;
    return buttons[0]?.value || "";
  });

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (selected !== undefined) {
      setInternalSelected(selected);
    }
  }, [selected]);

  const handleButtonClick = (
    clickedButton: ButtonOption,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    const newSelected = clickedButton.value;
    setInternalSelected(newSelected);
    onToggle(newSelected, event);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const focusedIndex = buttonRefs.current.findIndex((ref) => ref === document.activeElement);

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        const prevIndex =
          focusedIndex === -1
            ? buttons.length - 1 // If nothing is focused, focus the last item
            : focusedIndex > 0
              ? focusedIndex - 1
              : buttons.length - 1;
        buttonRefs.current[prevIndex]?.focus();
        break;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        const nextIndex =
          focusedIndex === -1
            ? 0 // If nothing is focused, focus the first item
            : focusedIndex < buttons.length - 1
              ? focusedIndex + 1
              : 0;
        buttonRefs.current[nextIndex]?.focus();
        break;
      case "Enter":
      case " ": // Space key
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < buttons.length) {
          const focusedButton = buttons[focusedIndex];
          setInternalSelected(focusedButton.value);
          onToggle(focusedButton.value);
        }
        break;
      default:
        return;
    }
  };

  const selectedIndex = buttons.findIndex((button) => button.value === internalSelected);

  return (
    <Scroller
      direction="row"
      minWidth={0}
      {...scrollerProps}
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={handleKeyDown}
    >
      <Flex fillWidth gap="-1">
        {buttons.map((button, index) => {
          return (
            <ToggleButton
              ref={(el) => {
                buttonRefs.current[index] = el as HTMLButtonElement;
              }}
              variant="outline"
              radius={index === 0 ? "left" : index === buttons.length - 1 ? "right" : "none"}
              key={button.value}
              selected={index === selectedIndex}
              onClick={(event) => handleButtonClick(button, event)}
              role="tab"
              className={className}
              style={style}
              aria-selected={index === selectedIndex}
              aria-controls={`panel-${button.value}`}
              tabIndex={index === selectedIndex ? 0 : -1}
              fillWidth={fillWidth}
              {...button}
            />
          );
        })}
      </Flex>
    </Scroller>
  );
};

SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl };
export type { SegmentedControlProps, ButtonOption };
