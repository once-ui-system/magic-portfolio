"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo, ReactNode } from "react";
import { Flex, Text, Icon, Column, Input, Option, Row } from ".";
import { createPortal } from "react-dom";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Kbar.module.scss";

export interface KbarItem {
  id: string;
  name: string;
  section: string;
  shortcut: string[];
  keywords: string;
  href?: string;
  perform?: () => void;
  icon?: string;
  description?: ReactNode;
}

const SectionHeader: React.FC<{ label: string }> = ({ label }) => (
  <Flex 
    paddingX="12"
    paddingBottom="8"
    paddingTop="12"
    textVariant="label-default-s"
    onBackground="neutral-weak"
  >
    {label}
  </Flex>
);

interface KbarTriggerProps {
  onClick?: () => void;
  children: React.ReactNode;
  [key: string]: any; // Allow any additional props
}

export const KbarTrigger: React.FC<KbarTriggerProps> = ({ onClick, children, ...rest }) => {
  return (
    <Flex onClick={onClick} {...rest}>
      {children}
    </Flex>
  );
};

interface KbarContentProps {
  isOpen: boolean;
  onClose: () => void;
  items: KbarItem[];
}

export const KbarContent: React.FC<KbarContentProps> = ({ isOpen, onClose, items }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Add a small delay to allow animations to complete
    requestAnimationFrame(() => {
      onClose();
    });
  }, [onClose]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (!searchQuery) return true;
      
      const searchLower = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchLower) ||
        (item.keywords ? item.keywords.toLowerCase().includes(searchLower) : false) ||
        (item.section ? item.section.toLowerCase().includes(searchLower) : false)
      );
    });
  }, [items, searchQuery]);

  // Group items by section
  const groupedItems = useMemo(() => {
    const sections = new Set(filteredItems.map((item) => item.section));
    const result = [];

    for (const section of sections) {
      // Add section header
      result.push({
        value: `section-${section}`,
        label: <SectionHeader label={section} />,
        isCustom: true,
      });

      // Add items for this section
      const sectionItems = filteredItems.filter(
        (item) => item.section === section
      );

      for (const item of sectionItems) {
        result.push({
          value: item.id,
          label: item.name,
          hasPrefix: item.icon ? <Icon name={item.icon} size="xs" onBackground="neutral-weak" /> : undefined,
          hasSuffix: item.shortcut && item.shortcut.length > 0 ? (
            <Row gap="4">
              {item.shortcut.map((key, i) => (
                <Text key={i} variant="label-default-xs" onBackground="neutral-weak">
                  {key}
                </Text>
              ))}
            </Row>
          ) : undefined,
          description: item.description,
          href: item.href,
          onClick: item.perform ? () => {
            item.perform?.();
            onClose();
          } : undefined,
        });
      }
    }

    return result;
  }, [filteredItems, onClose]);

  // Get non-custom options for highlighting
  const nonCustomOptions = useMemo(() => {
    return groupedItems.filter(item => !item.isCustom);
  }, [groupedItems]);

  // Reset optionRefs when nonCustomOptions change
  useEffect(() => {
    optionRefs.current = Array(nonCustomOptions.length).fill(null);
  }, [nonCustomOptions.length]);

  // Reset highlighted index when search query changes
  useEffect(() => {
    setHighlightedIndex(nonCustomOptions.length > 0 ? 0 : null);
  }, [searchQuery, nonCustomOptions.length]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!nonCustomOptions.length) return;
    
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(prevIndex => {
          if (prevIndex === null) return 0;
          return (prevIndex + 1) % nonCustomOptions.length;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(prevIndex => {
          if (prevIndex === null) return nonCustomOptions.length - 1;
          return (prevIndex - 1 + nonCustomOptions.length) % nonCustomOptions.length;
        });
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex !== null && highlightedIndex < nonCustomOptions.length) {
          const selectedOption = nonCustomOptions[highlightedIndex];
          if (selectedOption) {
            // Find the original item to get the perform function or href
            const originalItem = items.find(item => item.id === selectedOption.value);
            if (originalItem) {
              if (originalItem.href) {
                router.push(originalItem.href);
                onClose();
              } else if (originalItem.perform) {
                originalItem.perform();
                onClose();
              }
            }
          }
        }
        break;
    }
  }, [nonCustomOptions, items, router, onClose, highlightedIndex]);

  // Scroll highlighted element into view
  useEffect(() => {
    if (isOpen && highlightedIndex !== null && nonCustomOptions.length > 0) {
      // Use requestAnimationFrame to ensure the DOM has updated
      requestAnimationFrame(() => {
        const highlightedElement = optionRefs.current[highlightedIndex];
        const scrollContainer = scrollContainerRef.current;
        
        if (highlightedElement && scrollContainer) {
          const elementRect = highlightedElement.getBoundingClientRect();
          const containerRect = scrollContainer.getBoundingClientRect();
          
          // Check if the element is not fully visible
          if (elementRect.bottom > containerRect.bottom) {
            // Element is below the visible area - scroll just enough to show it
            const scrollAmount = elementRect.bottom - containerRect.bottom + 8; // Add a small buffer
            scrollContainer.scrollTop += scrollAmount;
          } else if (elementRect.top < containerRect.top) {
            // Element is above the visible area - scroll just enough to show it
            const scrollAmount = containerRect.top - elementRect.top + 8; // Add a small buffer
            scrollContainer.scrollTop -= scrollAmount;
          }
        }
      });
    }
  }, [highlightedIndex, isOpen, nonCustomOptions.length]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, handleClose]);

  // Lock body scroll when kbar is open
  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when kbar is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scrolling when kbar is closed
      document.body.style.overflow = "unset";
    }
    
    return () => {
      // Cleanup function to ensure body scroll is restored
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Clear search query when kbar is closed
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setHighlightedIndex(null);
    } else {
      // Set the first item as highlighted when opened
      if (nonCustomOptions.length > 0) {
        setHighlightedIndex(0);
      }
    }
  }, [isOpen, nonCustomOptions]);

  // Focus search input when kbar is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Use a small timeout to ensure the component is fully rendered
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Render nothing if not open
  if (!isOpen) return null;

  // Create portal for the kbar
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex={10}
      center
      background="overlay"
      className={`${styles.overlay} ${isClosing ? styles.closing : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <Column
        ref={containerRef}
        maxHeight={32}
        fitHeight
        maxWidth="xs"
        background="surface"
        radius="l"
        border="neutral-alpha-medium"
        overflow="hidden"
        shadow="l"
        className={`${styles.content} ${isClosing ? styles.closing : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Flex fillWidth>
          <Input
            id="kbar-search"
            label="Search docs..."
            labelAsPlaceholder
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            hasPrefix={<Icon name="search" size="xs" />}
            radius="none"
            autoComplete="off"
            style={{
              marginTop: "-1px",
              marginLeft: "-1px",
              width: "calc(100% + 2px)",
            }}
          />
        </Flex>
        <Column 
          ref={scrollContainerRef}
          fillWidth 
          padding="4" 
          gap="2" 
          overflowY="auto"
        >
          {groupedItems.map((option, index) => {
            if (option.isCustom) {
              return (
                <React.Fragment key={option.value}>
                  {option.label}
                </React.Fragment>
              );
            }
            
            // Find the index in the non-custom options array
            const optionIndex = nonCustomOptions.findIndex(item => item.value === option.value);
            const isHighlighted = optionIndex === highlightedIndex;
            
            return (
              <Option
                ref={(el) => {
                  if (optionIndex >= 0 && optionIndex < optionRefs.current.length) {
                    optionRefs.current[optionIndex] = el;
                  }
                }}
                key={option.value}
                label={option.label}
                value={option.value}
                hasPrefix={option.hasPrefix}
                hasSuffix={option.hasSuffix}
                description={option.description}
                {...(option.href 
                  ? { href: option.href, onClick: undefined, onLinkClick: onClose } 
                  : { onClick: option.onClick }
                )}
                highlighted={isHighlighted}
              />
            );
          })}
          {searchQuery && filteredItems.length === 0 && (
            <Flex
              fillWidth
              center
              paddingX="16"
              paddingY="64"
            >
              <Text variant="body-default-m" onBackground="neutral-weak">
                No results found
              </Text>
            </Flex>
          )}
        </Column>
      </Column>
    </Flex>
  );
};

export interface KbarProps {
  items: KbarItem[];
  children: React.ReactNode;
  [key: string]: any; // Allow any additional props
}

export const Kbar: React.FC<KbarProps> = ({ items, children, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Close Kbar when pathname changes
  useEffect(() => {
    if (isOpen) {
      handleClose();
    }
  }, [pathname]);

  // Add keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Command+K (Mac) or Control+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); // Prevent default browser behavior
        setIsOpen(prev => !prev); // Toggle Kbar open/close
      }
    };

    // Add the event listener
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <KbarTrigger onClick={handleOpen} {...rest}>
        {children}
      </KbarTrigger>
      {isOpen && createPortal(
        <KbarContent 
          isOpen={isOpen} 
          onClose={handleClose} 
          items={items} 
        />,
        document.body
      )}
    </>
  );
};