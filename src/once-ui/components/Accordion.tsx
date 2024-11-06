'use client';

import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Flex, Icon, Heading } from '.';
import styles from './Accordion.module.scss';
import classNames from 'classnames';

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
    const [maxHeight, setMaxHeight] = useState('0px');
    const [isVisible, setIsVisible] = useState(open);
    const contentRef = useRef<HTMLDivElement>(null);
    const innerContentRef = useRef<HTMLDivElement>(null);

    const calculateMaxHeight = () => {
        if (innerContentRef.current) {
            const contentHeight = innerContentRef.current.scrollHeight;
            const paddingTop = parseFloat(window.getComputedStyle(innerContentRef.current).paddingTop);
            const paddingBottom = parseFloat(window.getComputedStyle(innerContentRef.current).paddingBottom);
            
            const totalHeight = contentHeight + paddingTop + paddingBottom;
            return `${totalHeight}px`;
        }
        return '0px';
    };

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(open ? calculateMaxHeight() : '0px');
            if (open) {
                setIsVisible(true);
            }
        }
    }, [open]);

    const toggleAccordion = () => {
        if (isOpen) {
            setMaxHeight(`${contentRef.current?.scrollHeight}px`);
            setTimeout(() => setMaxHeight('0px'), 10);
        } else {
            setMaxHeight('0px');
            setTimeout(() => {
                setMaxHeight(calculateMaxHeight());
                setIsVisible(true);
            }, 10);
        }
        setIsOpen(!isOpen);
    };

    useImperativeHandle(ref, () => ({
        toggle: toggleAccordion,
        open: () => {
            setIsOpen(true);
            setMaxHeight(calculateMaxHeight());
            setIsVisible(true);
        },
        close: () => {
            setIsOpen(false);
            setMaxHeight('0px');
        }
    }));

    useEffect(() => {
        const handleTransitionEnd = () => {
            if (!isOpen) {
                setIsVisible(false);
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
            className={classNames(styles.border, className)}>
            <Flex 
                tabIndex={0}
                className={styles.accordion}
                paddingY="16"
                paddingLeft="m" paddingRight="m"
                alignItems="center" justifyContent="space-between"
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
                    style={{ display: 'flex', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'var(--transition-micro-medium)' }} />
            </Flex>
            <Flex
                id="accordion-content"
                ref={contentRef}
                fillWidth
                style={{
                    maxHeight,
                    overflow: 'hidden',
                    transition: 'max-height var(--transition-duration-macro-long) var(--transition-eased)',
                    visibility: isVisible ? 'visible' : 'hidden',
                }}
                aria-hidden={!isOpen}>
                <Flex
                    ref={innerContentRef}
                    fillWidth
                    paddingX="16" paddingTop="8" paddingBottom="16"
                    direction="column">
                    {children}
                </Flex>
            </Flex>
        </Flex>
    );
});

Accordion.displayName = 'Accordion';

export { Accordion };