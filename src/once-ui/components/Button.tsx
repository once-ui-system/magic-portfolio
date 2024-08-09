"use client";

import React, { ReactNode, forwardRef } from 'react';
import Link from 'next/link';

import { Spinner, Icon } from '.';
import styles from './Button.module.scss';

interface CommonProps {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
    size?: 's' | 'm' | 'l';
    label?: string;
    prefixIcon?: string;
    suffixIcon?: string;
    loading?: boolean;
    fillWidth?: boolean;
    children?: ReactNode;
    href?: string;
    className?: string;
    style?: React.CSSProperties;
}

export type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const isExternalLink = (url: string) => /^https?:\/\//.test(url);

const Button = forwardRef<HTMLButtonElement, ButtonProps | AnchorProps>(({
    variant = 'primary',
    size = 'm',
    label,
    children,
    prefixIcon,
    suffixIcon,
    loading = false,
    fillWidth = false,
    href,
    className,
    style,
    ...props
}, ref) => {
    const labelSize = size === 'l' ? 'font-l' : size === 'm' ? 'font-m' : 'font-s';
    const iconSize = size === 'l' ? 'm' : size === 'm' ? 's' : 'xs';

    const content = (
        <>
            {prefixIcon && !loading && <Icon name={prefixIcon} size={iconSize} />}
            {loading && <Spinner size={size} />}
            <div className={`font-label font-strong ${styles.label} ${labelSize}`}>{label || children}</div>
            {suffixIcon && <Icon name={suffixIcon} size={iconSize} />}
        </>
    );

    const commonProps = {
        className: `${styles.button} ${styles[variant]} ${styles[size]} ${fillWidth ? styles.fillWidth : styles.fitContent} ${className || ''}`,
        style: { ...style, textDecoration: 'none' },
    };

    if (href) {
        const isExternal = isExternalLink(href);

        if (isExternal) {
            return (
                <a
                    href={href}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    target="_blank"
                    rel="noreferrer"
                    {...commonProps}
                    {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                    {content}
                </a>
            );
        }

        return (
            <Link
                href={href}
                ref={ref as React.Ref<HTMLAnchorElement>}
                {...commonProps}
                {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
                {content}
            </Link>
        );
    }

    return (
        <button
            ref={ref as React.Ref<HTMLButtonElement>}
            {...commonProps}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
            {content}
        </button>
    );
});

Button.displayName = 'Button';

export { Button };