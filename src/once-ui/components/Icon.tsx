'use client';

import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { IconType } from 'react-icons';
import { iconLibrary } from '../icons';
import { ColorScheme, ColorWeight } from '../types';

const sizeMap: Record<string, string> = {
    xs: 'var(--static-space-16)',
    s: 'var(--static-space-20)',
    m: 'var(--static-space-24)',
    l: 'var(--static-space-32)',
    xl: 'var(--static-space-40)',
};

type IconProps = {
    name: string;
    onBackground?: `${ColorScheme}-${ColorWeight}`;
    onSolid?: `${ColorScheme}-${ColorWeight}`;
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    decorative?: boolean;
    className?: string;
    style?: React.CSSProperties;
};

const Icon = forwardRef<HTMLDivElement, IconProps>(({
    name,
    onBackground,
    onSolid,
    size = 'm',
    decorative = true,
    className,
    style,
}, ref) => {
    const IconComponent: IconType | undefined = iconLibrary[name];

    if (!IconComponent) {
        console.warn(`Icon "${name}" does not exist in the library.`);
        return null;
    }

    if (onBackground && onSolid) {
        console.warn("You cannot use both 'onBackground' and 'onSolid' props simultaneously. Only one will be applied.");
    }

    let colorClass = 'color-inherit';

    if (onBackground) {
        const [scheme, weight] = onBackground.split('-') as [ColorScheme, ColorWeight];
        colorClass = `${scheme}-on-background-${weight}`;
    } else if (onSolid) {
        const [scheme, weight] = onSolid.split('-') as [ColorScheme, ColorWeight];
        colorClass = `${scheme}-on-solid-${weight}`;
    }

    return (
        <span
            ref={ref}
            className={classNames(colorClass, className)}
            style={{ display: 'contents', fontSize: sizeMap[size], ...style }}
            role={decorative ? "presentation" : undefined}
            aria-hidden={decorative ? "true" : undefined}
            aria-label={decorative ? undefined : name}>
            <IconComponent />
        </span>
    );
});

Icon.displayName = 'Icon';

export { Icon };