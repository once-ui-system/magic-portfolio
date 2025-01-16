"use client";

import React, { useState, useRef, useEffect, forwardRef, ReactNode } from "react";
import classNames from "classnames";
import { DropdownWrapper, Flex, Icon, IconButton, Input, InputProps, Option } from ".";
import inputStyles from "./Input.module.scss";
import type { OptionProps } from "./Option";
import type { DropdownWrapperProps } from "./DropdownWrapper";
import { Placement } from "@floating-ui/react-dom";

type SelectOptionType = Omit<OptionProps, "selected">;

interface SelectProps
  extends Omit<InputProps, "onSelect" | "value">,
    Pick<DropdownWrapperProps, "minHeight" | "minWidth" | "maxWidth"> {
  options: SelectOptionType[];
  value?: string;
  emptyState?: ReactNode;
  onSelect?: (value: string) => void;
  floatingPlacement?: Placement;
  searchable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value = "",
      onSelect,
      searchable = false,
      emptyState = "No results",
      minHeight,
      minWidth,
      maxWidth,
      floatingPlacement,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(!!value);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(() => {
      if (!options?.length || !value) return null;
      return options.findIndex((option) => option.value === value);
    });
    const [searchQuery, setSearchQuery] = useState("");
    const selectRef = useRef<HTMLDivElement | null>(null);
    const clearButtonRef = useRef<HTMLButtonElement>(null);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (selectRef.current && !selectRef.current.contains(event.relatedTarget as Node)) {
        setIsFocused(false);
        setIsDropdownOpen(false);
      }
    };

    const handleSelect = (value: string) => {
      if (onSelect) onSelect(value);
      setIsDropdownOpen(false);
      setIsFilled(true);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isFocused && event.key !== "Enter") return;

      switch (event.key) {
        case "Escape":
          setIsDropdownOpen(false);
          break;
        case "ArrowDown":
          if (!isDropdownOpen) {
            setIsDropdownOpen(true);
            break;
          }
          event.preventDefault();
          setHighlightedIndex((prevIndex) => {
            const newIndex =
              prevIndex === null || prevIndex === options.length - 1 ? 0 : prevIndex + 1;
            return newIndex;
          });
          break;

        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex((prevIndex) => {
            const newIndex =
              prevIndex === null || prevIndex === 0 ? options.length - 1 : prevIndex - 1;
            return newIndex;
          });
          break;

        case "Enter":
          event.preventDefault();
          if (highlightedIndex !== null && isDropdownOpen) {
            handleSelect(options[highlightedIndex].value);
          } else {
            setIsDropdownOpen(true);
          }
          break;

        default:
          break;
      }
    };

    const handleClearSearch = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setSearchQuery("");
      // Force focus back to the input after clearing
      const input = selectRef.current?.querySelector("input");
      if (input) {
        input.focus();
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node) &&
          !clearButtonRef.current?.contains(event.target as Node)
        ) {
          setIsDropdownOpen(false);
        }
      };

      const handleFocusOut = (event: FocusEvent) => {
        if (event.target instanceof HTMLInputElement) {
          handleBlur(event as unknown as React.FocusEvent<HTMLInputElement>);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("focusout", handleFocusOut);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("focusout", handleFocusOut);
      };
    }, []);

    return (
      <DropdownWrapper
        fillWidth
        ref={(node) => {
          selectRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        isOpen={isDropdownOpen}
        onOpenChange={setIsDropdownOpen}
        floatingPlacement={floatingPlacement}
        minHeight={minHeight}
        trigger={
          <Input
            {...rest}
            style={{
              textOverflow: "ellipsis",
              ...style,
            }}
            value={value}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            readOnly
            className={classNames("cursor-interactive", "fill-width", {
              [inputStyles.filled]: isFilled,
              [inputStyles.focused]: isFocused,
              className,
            })}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          />
        }
        dropdown={
          <>
            {searchable && (
              <Flex fillWidth position="relative">
                <Input
                  data-scaling="90"
                  style={{
                    marginTop: "-1px",
                    marginLeft: "-1px",
                    width: "calc(100% + 2px)",
                  }}
                  labelAsPlaceholder
                  id="search"
                  label="Search"
                  height="s"
                  radius="none"
                  hasSuffix={
                    searchQuery ? (
                      <IconButton
                        tooltip="Clear"
                        tooltipPosition="left"
                        icon="close"
                        variant="ghost"
                        size="s"
                        onClick={handleClearSearch}
                      />
                    ) : undefined
                  }
                  hasPrefix={<Icon name="search" size="xs" />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onBlur={handleBlur}
                />
              </Flex>
            )}
            <Flex fillWidth padding="4" direction="column" gap="2">
              {options
                .filter((option) =>
                  option.label?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((option, index) => (
                  <Option
                    key={option.value}
                    {...option}
                    onClick={() => {
                      option.onClick?.(option.value);
                      handleSelect(option.value);
                    }}
                    selected={option.value === value}
                    highlighted={index === highlightedIndex}
                    tabIndex={-1}
                  />
                ))}
              {searchQuery &&
                options.filter((option) =>
                  option.label?.toString().toLowerCase().includes(searchQuery.toLowerCase()),
                ).length === 0 && (
                  <Flex fillWidth vertical="center" horizontal="center" paddingX="16" paddingY="32">
                    {emptyState}
                  </Flex>
                )}
            </Flex>
          </>
        }
      />
    );
  },
);

Select.displayName = "Select";
export { Select };
