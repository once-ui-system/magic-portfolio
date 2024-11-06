'use client';

import React, { forwardRef } from 'react';
import { Arrow, Flex, Icon, SmartLink, Text } from '.';

import styles from './Badge.module.scss'
import classNames from 'classnames';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    icon?: string;
    arrow?: boolean;
    children?: React.ReactNode;
    href?: string;
    style?: React.CSSProperties;
    className?: string;
    effect?: boolean;
}

const Badge = forwardRef<HTMLDivElement | HTMLAnchorElement, BadgeProps>(({
    title,
    icon,
    arrow = true,
    children,
    href,
    effect = true,
    style,
    className,
    ...props
}, ref) => {
    const commonProps = {
        style,
        className,
        children: (
            <Flex
                id="badge"
                paddingX="20" paddingY="12"
                className={classNames(styles.badge, effect && styles.animation)}
                alignItems="center"
                radius="full" background="neutral-weak" shadow="l">
                { icon && (
                    <Icon className="mr-8"
                        size="s"
                        name={icon}
                        onBackground="brand-medium"/>
                )}
                {title && (
                    <Text
                        onBackground="brand-strong"
                        variant="label-strong-s">
                        {title}
                    </Text>
                )}
                {children}
                { arrow && (
                    <Arrow trigger="#badge"/>
                )}
            </Flex>
        ),
    };

    if (href) {
        return (
            <SmartLink
                unstyled
                style={{borderRadius: 'var(--radius-full)'}}
                href={href}
                ref={ref as React.Ref<HTMLAnchorElement>}
                {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}>
                <Flex {...commonProps}/>
            </SmartLink>
        );
    }

    return (
        <Flex
            ref={ref as React.Ref<HTMLDivElement>}
            {...commonProps}
            {...props as React.HTMLAttributes<HTMLDivElement>}
        />
    );
});

Badge.displayName = 'Badge';
export { Badge };