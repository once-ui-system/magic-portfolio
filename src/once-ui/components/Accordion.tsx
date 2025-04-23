"use client";

import React, { useState, forwardRef, useImperativeHandle, useEffect, useCallback } from "react";
import { Flex, Icon, Text, Column, Grid } from ".";
import styles from "./Accordion.module.scss";

export interface AccordionHandle extends HTMLDivElement {
  toggle: () => void;
  open: () => void;
  close: () => void;
}

interface AccordionProps extends Omit<React.ComponentProps<typeof Flex>, "title"> {
  title: React.ReactNode;
  children: React.ReactNode;
  icon?: string;
  iconRotation?: number;
  size?: "s" | "m" | "l";
  radius?: "xs" | "s" | "m" | "l" | "full";
  open?: boolean;
}

const Accordion = forwardRef<AccordionHandle, AccordionProps>(
  (
    {
      title,
      children,
      open = false,
      iconRotation = 180,
      radius,
      icon = "chevronDown",
      size = "m",
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
      setIsOpen(open);
    }, [open]);

    const toggleAccordion = useCallback(() => {
      setIsOpen((prev) => !prev);
    }, []);

    useImperativeHandle(
      ref,
      () => {
        const methods = {
          toggle: toggleAccordion,
          open: () => setIsOpen(true),
          close: () => setIsOpen(false),
        };

        return Object.assign(document.createElement("div"), methods) as unknown as AccordionHandle;
      },
      [toggleAccordion],
    );

    return (
      <Column fillWidth className={styles.border}>
        <Flex
          tabIndex={0}
          className={styles.accordion}
          cursor="pointer"
          transition="macro-medium"
          paddingY={size === "s" ? "8" : size === "m" ? "12" : "16"}
          paddingX={size === "s" ? "12" : size === "m" ? "16" : "20"}
          vertical="center"
          horizontal="space-between"
          onClick={toggleAccordion}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleAccordion();
            }
          }}
          aria-expanded={isOpen}
          aria-controls="accordion-content"
          radius={radius}
          role="button"
        >
          <Text variant="heading-strong-s">{title}</Text>
          <Icon
            name={icon}
            size={size === "s" ? "xs" : "s"}
            onBackground={isOpen ? "neutral-strong" : "neutral-weak"}
            style={{
              display: "flex",
              transform: isOpen ? `rotate(${iconRotation}deg)` : "rotate(0deg)",
              transition: "var(--transition-micro-medium)",
            }}
          />
        </Flex>
        <Grid
          id="accordion-content"
          fillWidth
          style={{
            gridTemplateRows: isOpen ? "1fr" : "0fr",
            transition:
              "grid-template-rows var(--transition-duration-macro-medium) var(--transition-eased)",
          }}
          aria-hidden={!isOpen}
        >
          <Flex fillWidth minHeight={0} overflow="hidden">
            <Column fillWidth paddingX="20" paddingTop="8" paddingBottom="16" {...rest}>
              {children}
            </Column>
          </Flex>
        </Grid>
      </Column>
    );
  },
);

Accordion.displayName = "Accordion";
export { Accordion };
