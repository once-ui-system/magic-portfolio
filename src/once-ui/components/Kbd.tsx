'use client';

import React, { ReactNode, forwardRef, HTMLAttributes } from 'react';

import { Text } from '.';
import classNames from 'classnames';
import styles from './Kbd.module.scss';

interface KbdProps extends HTMLAttributes<HTMLElement> {
    label?: string;
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const Kbd = forwardRef<HTMLElement, KbdProps>(({
    label,
    children,
    className,
    style,
    ...props
}, ref) => (
    <kbd
        ref={ref}
        className={classNames(styles.kbd, className)}
        style={style}
        {...props}>
        <Text
            as="span"
            variant="label-default-s">
            {label || children}
        </Text>
    </kbd>
));

Kbd.displayName = 'Kbd';

export { Kbd };
export type { KbdProps };