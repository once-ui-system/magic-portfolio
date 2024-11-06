'use client';

import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Flex, IconButton } from '.';
import styles from './Scroller.module.scss';

interface ScrollerProps {
    children: React.ReactNode;
    direction?: 'row' | 'column';
    contained?: boolean;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: any;
}

const Scroller: React.FC<ScrollerProps> = ({
    children,
    direction = 'row',
    contained = false,
    className,
    style,
    ...props
}) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [showPrevButton, setShowPrevButton] = useState<boolean>(false);
    const [showNextButton, setShowNextButton] = useState<boolean>(false);

    useEffect(() => {
        const scroller = scrollerRef.current;
        const handleScroll = () => {
            if (scroller) {
                const scrollPosition = direction === 'row' ? scroller.scrollLeft : scroller.scrollTop;
                const maxScrollPosition = direction === 'row'
                    ? scroller.scrollWidth - scroller.clientWidth
                    : scroller.scrollHeight - scroller.clientHeight;
                setShowPrevButton(scrollPosition > 0);
                setShowNextButton(scrollPosition < maxScrollPosition - 1);
            }
        };

        if (scroller && (direction === 'row' ? scroller.scrollWidth > scroller.clientWidth : scroller.scrollHeight > scroller.clientHeight)) {
            handleScroll();
            scroller.addEventListener('scroll', handleScroll);
            return () => scroller.removeEventListener('scroll', handleScroll);
        }
    }, [direction]);

    const handleScrollNext = () => {
        const scroller = scrollerRef.current;
        if (scroller) {
            const scrollAmount = direction === 'row' ? scroller.clientWidth / 2 : scroller.clientHeight / 2;
            scroller.scrollBy({ [direction === 'row' ? 'left' : 'top']: scrollAmount, behavior: 'smooth' });
        }
    };

    const handleScrollPrev = () => {
        const scroller = scrollerRef.current;
        if (scroller) {
            const scrollAmount = direction === 'row' ? scroller.clientWidth / 2 : scroller.clientHeight / 2;
            scroller.scrollBy({ [direction === 'row' ? 'left' : 'top']: -scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <Flex
            fillWidth
            minWidth={0}
            position="relative"
            className={className}
            {...(contained && {
                padding: "2",
                radius: "m-4",
                border: "neutral-medium",
                borderStyle: "solid-1",
                overflowX: "hidden",
                overflowY: "hidden",
            })}
            style={style}>
            {showPrevButton && (
                <div className={classNames(styles.scrollMaskContainer, styles.scrollMaskPrev)}>
                    <div className={styles.scrollMask}></div>
                    <IconButton
                        icon={direction === 'row' ? 'chevronLeft' : 'chevronUp'}
                        onClick={handleScrollPrev}
                        size="s"
                        variant="secondary"
                        className={classNames(styles.scrollButton, styles.scrollButtonPrev)}
                        aria-label="Scroll Previous"/>
                </div>
            )}
            <Flex
                fillWidth
                ref={scrollerRef}
                className={classNames(styles.scroller, {
                    [styles.row]: direction === 'row',
                    [styles.column]: direction === 'column',
                })}
                {...props}>
                {children}
            </Flex>
            {showNextButton && (
                <div className={classNames(styles.scrollMaskContainer, styles.scrollMaskNext)}>
                    <div className={styles.scrollMask}></div>
                    <IconButton
                        icon={direction === 'row' ? 'chevronRight' : 'chevronDown'}
                        onClick={handleScrollNext}
                        size="s"
                        variant="secondary"
                        className={classNames(styles.scrollButton, styles.scrollButtonNext)}
                        aria-label="Scroll Next"/>
                </div>
            )}
        </Flex>
    );
};

Scroller.displayName = 'Scroller';

export { Scroller };
export type { ScrollerProps };