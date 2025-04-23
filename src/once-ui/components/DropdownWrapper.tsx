"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import {
  useFloating,
  shift,
  offset,
  flip,
  size,
  autoUpdate,
  Placement,
} from "@floating-ui/react-dom";
import { Flex, Dropdown } from ".";
import styles from "./DropdownWrapper.module.scss";

export interface DropdownWrapperProps {
  fillWidth?: boolean;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  floatingPlacement?: Placement;
  trigger: ReactNode;
  dropdown: ReactNode;
  selectedOption?: string;
  style?: React.CSSProperties;
  className?: string;
  onSelect?: (value: string) => void;
  closeAfterClick?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const DropdownWrapper = forwardRef<HTMLDivElement, DropdownWrapperProps>(
  (
    {
      trigger,
      dropdown,
      selectedOption,
      minHeight,
      onSelect,
      closeAfterClick = true,
      isOpen: controlledIsOpen,
      onOpenChange,
      minWidth,
      maxWidth,
      fillWidth = false,
      floatingPlacement = "bottom-start",
      className,
      style,
    },
    ref,
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

    const handleOpenChange = useCallback(
      (newIsOpen: boolean) => {
        if (!isControlled) {
          setInternalIsOpen(newIsOpen);
        }
        onOpenChange?.(newIsOpen);
      },
      [onOpenChange, isControlled],
    );

    const { x, y, strategy, refs, update } = useFloating({
      placement: floatingPlacement,
      open: isOpen,
      middleware: [
        offset(4),
        minHeight ? undefined : flip(),
        shift(),
        size({
          apply({ availableWidth, availableHeight, elements }) {
            Object.assign(elements.floating.style, {
              width: fillWidth ? "100%" : "auto",
              minWidth: minWidth ? `${minWidth}rem` : undefined,
              maxWidth: maxWidth ? `${maxWidth}rem` : `${availableWidth}px`,
              minHeight: `${Math.min(minHeight || 0)}px`,
              maxHeight: `${availableHeight}px`,
            });
          },
        }),
      ],
      whileElementsMounted: autoUpdate,
    });

    useImperativeHandle(ref, () => wrapperRef.current as HTMLDivElement);

    useEffect(() => {
      if (wrapperRef.current) {
        refs.setReference(wrapperRef.current);
      }
    }, [refs, mounted]);

    useEffect(() => {
      if (!mounted) {
        setMounted(true);
      }
    }, [mounted]);

    useEffect(() => {
      if (isOpen && mounted) {
        requestAnimationFrame(() => {
          if (dropdownRef.current) {
            refs.setFloating(dropdownRef.current);
            update();
          }
        });
      }
    }, [isOpen, mounted, refs, update]);

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
          handleOpenChange(false);
        }
      },
      [handleOpenChange, wrapperRef],
    );

    const handleFocusOut = useCallback(
      (event: FocusEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.relatedTarget as Node)) {
          handleOpenChange(false);
        }
      },
      [handleOpenChange, wrapperRef],
    );

    useEffect(() => {
      const currentWrapperRef = wrapperRef.current;

      document.addEventListener("mousedown", handleClickOutside);
      currentWrapperRef?.addEventListener("focusout", handleFocusOut);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        currentWrapperRef?.removeEventListener("focusout", handleFocusOut);
      };
    }, [handleClickOutside, handleFocusOut]);

    return (
      <Flex
        fillWidth={fillWidth}
        direction="column"
        transition="macro-medium"
        style={{
          ...(minHeight && isOpen
            ? {
                marginBottom: `${minHeight + 8}px`,
              }
            : {}),
          ...style,
        }}
        className={className}
        ref={wrapperRef}
        onClick={() => {
            if (closeAfterClick) {
                handleOpenChange(!isOpen);
            }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpenChange(!isOpen);
          }
        }}
        tabIndex={-1}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {trigger}
        {isOpen && (
          <Flex
            zIndex={1}
            className={styles.fadeIn}
            minWidth={minWidth}
            ref={dropdownRef}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            role="listbox"
          >
            <Dropdown
              minWidth={minWidth}
              radius="l"
              selectedOption={selectedOption}
              onSelect={onSelect}
            >
              {dropdown}
            </Dropdown>
          </Flex>
        )}
      </Flex>
    );
  },
);

DropdownWrapper.displayName = "DropdownWrapper";
export { DropdownWrapper };
