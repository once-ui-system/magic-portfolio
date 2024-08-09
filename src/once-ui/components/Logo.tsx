"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import styles from './Logo.module.scss';
import { SpacingToken } from '../types';

const sizeMap: Record<string, SpacingToken> = {
    xs: '20',
    s: '24',
    m: '32',
    l: '40',
    xl: '48',
};

interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    className?: string;
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    style?: React.CSSProperties;
    wordmark?: boolean;
    icon?: boolean;
    href?: string;
}

const Logo: React.FC<LogoProps> = ({
    size = 'm',
    wordmark = true,
    icon = true,
    href = '/',
    className,
    style,
    ...props
}) => {
    useEffect(() => {
        if (!icon && !wordmark) {
            console.warn("Both 'icon' and 'showType' props are set to false. The logo will not render any content.");
        }
    }, [icon, wordmark]);

    return (
        <Link
            className={classNames('radius-l', 'flex', className)}
            style={{height: 'fit-content', ...style}}
            href={href}
            aria-label="Trademark"
            {...props}>
            {icon && (
                <div
                    style={{ height: `var(--static-space-${sizeMap[size]})` }}
                    className={styles.icon}/>
            )}
            {wordmark && (
                <div
                    style={{ height: `var(--static-space-${sizeMap[size]})` }}
                    className={styles.type}/>
            )}
        </Link>
    );
};

Logo.displayName = "Logo";

export { Logo };
