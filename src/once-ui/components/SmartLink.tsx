"use client";

import React, { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { Icon } from '.';

interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    prefixIcon?: string;
    suffixIcon?: string;
    iconSize?: 'xs' | 's' | 'm' | 'l' | 'xl';
    style?: React.CSSProperties;
    className?: string;
    selected? : boolean;
    children: ReactNode;
}

const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(({ 
        href,
        prefixIcon,
        suffixIcon,
        iconSize='xs',
        style,
        className,
        selected,
        children,
        ...props
    }, ref) => {
        const isExternal = href.startsWith('http') || href.startsWith('//');

        const content = (
            <>
                {prefixIcon && <Icon name={prefixIcon} size={iconSize}/>}
                {children}
                {suffixIcon && <Icon name={suffixIcon} size={iconSize}/>}
            </>
        );

        const commonProps = {
            ref,
            className: classNames(className || '', 'px-4', 'mx-4'),
            style: {
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--static-space-8)',
                borderRadius: 'var(--radius-s)',
                ...(selected && {textDecoration: 'underline'}),
                ...style
            },
            ...props
        };

        if (isExternal) {
            return (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    {...commonProps}>
                    {content}
                </a>
            );
        }

        return (
            <Link
                href={href}
                {...commonProps}
                {...props}>
                {content}
            </Link>
        );
    }
);

SmartLink.displayName = "SmartLink";

export { SmartLink };