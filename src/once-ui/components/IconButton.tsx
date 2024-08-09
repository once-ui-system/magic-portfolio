"use client";

import React, { forwardRef, useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';

import { Icon, Tooltip } from '.';
import buttonStyles from './Button.module.scss';
import iconStyles from './IconButton.module.scss';

interface CommonProps {
    icon?: string;
    size?: 's' | 'm' | 'l';
    tooltip?: string;
    tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
    className?: string;
    style?: React.CSSProperties;
    href?: string;
    children?: ReactNode;
}

export type IconButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
export type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const isExternalLink = (url: string) => /^https?:\/\//.test(url);

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps | AnchorProps>(({
    icon = 'refresh',
    size = 'm',
    tooltip,
    tooltipPosition = 'top',
    variant = 'primary',
    className,
    style,
    href,
    children,
    ...props
}, ref) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isHover) {
            timer = setTimeout(() => {
                setTooltipVisible(true);
            }, 400);
        } else {
            setTooltipVisible(false);
        }

        return () => clearTimeout(timer);
    }, [isHover]);

    const iconSize = size === 's' ? 's' : 'm';

    const content = (
        <>
            {children ? (
                children
            ) : (
                <Icon name={icon} size={iconSize} />
            )}
            {tooltip && isTooltipVisible && (
                <div style={{ position: "absolute" }} className={iconStyles[tooltipPosition]}>
                    <Tooltip label={tooltip} />
                </div>
            )}
        </>
    );

    const commonProps = {
        className: `${buttonStyles.button} ${buttonStyles[variant]} ${iconStyles[size]} ${className || ''}`,
        style: { ...style },
        onMouseEnter: () => setIsHover(true),
        onMouseLeave: () => setIsHover(false),
        'aria-label': tooltip || icon,
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

IconButton.displayName = "IconButton";

export { IconButton };
