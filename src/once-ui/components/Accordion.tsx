"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Flex, Icon, Heading } from '.';

interface AccordionProps {
    title: React.ReactNode;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    open?: boolean;
}

const Accordion: React.FC<AccordionProps> = forwardRef(({
    title,
    children,
    style,
    className,
    open = false
}, ref) => {
    const [isOpen, setIsOpen] = useState(open);
    const [maxHeight, setMaxHeight] = useState(open ? 'none' : '0px');
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            setIsOpen(true);
            setMaxHeight(`${contentRef.current?.scrollHeight}px`);
        } else {
            setIsOpen(false);
            setMaxHeight('0px');
        }
    }, [open]);

    const toggleAccordion = () => {
        if (isOpen) {
            setMaxHeight('0px');
        } else {
            setMaxHeight(`${contentRef.current?.scrollHeight}px`);
        }
        setIsOpen(!isOpen);
    };

    useImperativeHandle(ref, () => ({
        toggle: toggleAccordion,
        open: () => {
            setIsOpen(true);
            setMaxHeight(`${contentRef.current?.scrollHeight}px`);
        },
        close: () => {
            setIsOpen(false);
            setMaxHeight('0px');
        }
    }));

    useEffect(() => {
        const handleTransitionEnd = () => {
            if (isOpen) {
                setMaxHeight('none');
            }
        };

        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.addEventListener('transitionend', handleTransitionEnd);
        }

        return () => {
            if (contentElement) {
                contentElement.removeEventListener('transitionend', handleTransitionEnd);
            }
        };
    }, [isOpen]);

    return (
        <Flex
            fillWidth
            direction="column"
            style={style}
            className={className}>
            <Flex 
                style={{ borderTop: "1px solid var(--neutral-border-medium)", cursor: 'pointer' }}
                paddingY="16"
                paddingLeft="m"
                paddingRight="m"
                alignItems="center"
                justifyContent="space-between"
                tabIndex={0}
                onClick={toggleAccordion}
                aria-expanded={isOpen}
                aria-controls="accordion-content">
                <Heading
                    as="h3"
                    variant="heading-strong-s">
                    {title}
                </Heading>
                <Icon
                    name="chevronDown"
                    size="m"
                    style={{ display: 'flex', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform var(--transition-duration-micro-medium)' }} />
            </Flex>
            <div
                id="accordion-content"
                ref={contentRef}
                style={{
                    maxHeight,
                    overflow: 'hidden',
                    transition: 'max-height var(--transition-duration-macro-long) var(--transition-timing-function)',
                    visibility: isOpen ? 'visible' : 'hidden'
                }}
                aria-hidden={!isOpen}>
                <Flex
                    paddingX="m"
                    paddingBottom="32"
                    direction="column">
                    {children}
                </Flex>
            </div>
        </Flex>
    );
});

Accordion.displayName = "Accordion";

export { Accordion };