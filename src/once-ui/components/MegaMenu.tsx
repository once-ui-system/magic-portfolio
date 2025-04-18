"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Flex, Row, Column, Text, Icon, ToggleButton } from ".";
import styles from "./MegaMenu.module.scss";


export interface MenuLink {
  label: string;
  href: string;
  icon?: string;
  description?: string;
  selected?: boolean;
}

export interface MenuSection {
  title?: string;
  links: MenuLink[];
}

export interface MenuGroup {
  label: string;
  suffixIcon?: string;
  href?: string;
  selected?: boolean;
  sections?: MenuSection[];
}

export interface MegaMenuProps extends React.ComponentProps<typeof Flex> {
  menuGroups: MenuGroup[];
  className?: string;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ menuGroups, className, ...rest }) => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, width: 0 });
  const [isFirstAppearance, setIsFirstAppearance] = useState(true);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (activeDropdown && buttonRefs.current[activeDropdown]) {
      const buttonElement = buttonRefs.current[activeDropdown];
      if (buttonElement) {
        const rect = buttonElement.getBoundingClientRect();
        const parentRect = buttonElement.parentElement?.getBoundingClientRect() || { left: 0 };
        
        // Set initial position
        setDropdownPosition({
          left: rect.left - parentRect.left,
          width: 300 // Default width that will be updated
        });
        
        // Measure content after render
        requestAnimationFrame(() => {
          const contentElement = contentRefs.current[activeDropdown];
          if (contentElement) {
            const contentWidth = contentElement.scrollWidth;
            setDropdownPosition(prev => ({
              ...prev,
              width: contentWidth + 40 // Add padding
            }));
          }
        });
      }
    } else {
      // Reset first appearance flag when dropdown is closed
      setIsFirstAppearance(true);
    }
  }, [activeDropdown]);

  // Reset animation flag after animation completes
  useEffect(() => {
    if (activeDropdown !== null) {
      const timer = setTimeout(() => {
        setIsFirstAppearance(false);
      }, 300); // Match animation duration
      
      return () => clearTimeout(timer);
    }
  }, [activeDropdown]);

  // Close dropdown when pathname changes (navigation occurs)
  useEffect(() => {
    setActiveDropdown(null);
  }, [pathname]);

  // Check if a menu item should be selected based on the current path
  const isSelected = (href?: string) => {
    if (!href || !pathname) return false;
    return pathname.startsWith(href);
  };

  // Filter groups to only show those with sections in the dropdown
  const dropdownGroups = menuGroups.filter(group => group.sections);

  // Add click handler to close dropdown when clicking on links
  const handleLinkClick = (href: string) => {
    setActiveDropdown(null);
    // Let the default navigation happen
  };

  return (
    <Flex gap="4" flex={1} className={className} {...rest}>
      {menuGroups.map((group, index) => (
        <Row 
          key={`menu-group-${index}`}
          ref={(el) => {
            buttonRefs.current[group.label] = el;
          }}
          onMouseEnter={() => group.sections && setActiveDropdown(group.label)}
          onMouseLeave={(e) => {
            // Check if we're not hovering over the dropdown
            const dropdownElement = dropdownRef.current;
            if (dropdownElement) {
              const rect = dropdownElement.getBoundingClientRect();
              if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
              ) {
                // We're hovering over the dropdown, don't hide it
                return;
              }
            }
            // Only hide if activeDropdown is this group
            if (activeDropdown === group.label) {
              setActiveDropdown(null);
            }
          }}
        >
          <ToggleButton
            selected={group.selected !== undefined ? group.selected : isSelected(group.href)}
            href={group.href}
          >
            {group.label}
            {(group.sections && group.suffixIcon) && <Icon marginLeft="8" name={group.suffixIcon} size="xs" />}
          </ToggleButton>
        </Row>
      ))}

      {activeDropdown && (
        <Row
          paddingTop="8"
          ref={dropdownRef}
          position="absolute"
          pointerEvents="auto"
          opacity={100}
          top="32"
          className={isFirstAppearance ? styles.dropdown : ''}
          style={{
            left: `${dropdownPosition.left}px`,
            width: `${dropdownPosition.width}px`,
            transition: 'left 0.3s ease, width 0.3s ease',
            visibility: 'visible',
          }}
          onMouseEnter={() => {
            // Keep the current active dropdown when hovering over it
          }}
          onMouseLeave={() => {
            // Hide dropdown when mouse leaves it
            setActiveDropdown(null);
          }}
        >
          <Row
            background="surface" 
            radius="l" 
            border="neutral-alpha-weak" 
            shadow="xl" 
            padding="12"
            gap="32"
          >
            {dropdownGroups.map((group, groupIndex) => (
              activeDropdown === group.label && group.sections && (
                <Row 
                  key={`dropdown-content-${groupIndex}`}
                  gap="16" 
                  ref={(el) => {
                    contentRefs.current[group.label] = el;
                  }}
                >
                  {group.sections.map((section, sectionIndex) => (
                    <Column key={`section-${sectionIndex}`} minWidth={10} gap="4">
                      {section.title && (
                        <Text marginLeft="16" marginBottom="12" marginTop="12" onBackground="neutral-weak" variant="label-default-s">
                          {section.title}
                        </Text>
                      )}
                      {section.links.map((link, linkIndex) => (
                        <ToggleButton 
                          key={`link-${linkIndex}`}
                          className="fit-height p-4 pr-12"
                          fillWidth 
                          justifyContent="start" 
                          href={link.href}
                          onClick={() => handleLinkClick(link.href)}
                        >
                          {link.description ? (
                            <Row gap="12">
                              {link.icon && (
                                <Icon name={link.icon} size="s" padding="8" radius="s" border="neutral-alpha-weak"/>
                              )}
                              <Column gap="4">
                                <Text onBackground="neutral-strong" variant="label-strong-s">{link.label}</Text>
                                <Text onBackground="neutral-weak">{link.description}</Text>
                              </Column>
                            </Row>
                          ) : (
                            link.label
                          )}
                        </ToggleButton>
                      ))}
                    </Column>
                  ))}
                </Row>
              )
            ))}
          </Row>
        </Row>
      )}
    </Flex>
  );
};

MegaMenu.displayName = "MegaMenu";