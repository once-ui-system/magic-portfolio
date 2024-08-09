"use client";

import React, { useState, forwardRef } from 'react';
import styles from './NavIcon.module.scss';
import { Flex } from '.';

interface NavIconProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const NavIcon = forwardRef<HTMLDivElement, NavIconProps>(({ className, style, onClick }, ref) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
        if (onClick) {
            onClick();
        }
    };

    return (
        <Flex
            ref={ref}
            tabIndex={0}
            radius="m"
            position="relative"
            className={`${styles.button} ${className || ''}`}
            style={{ ...style }}
            onClick={handleClick}>
            <div className={`${styles.line} ${isActive ? `${styles.active}` : ''}`} />
            <div className={`${styles.line} ${isActive ? `${styles.active}` : ''}`} />
        </Flex>
    );
});

NavIcon.displayName = 'NavIcon';

export { NavIcon };