'use client';

import React, { forwardRef, ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './InlineCode.module.scss';

interface InlineCodeProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const InlineCode = forwardRef<HTMLSpanElement, InlineCodeProps>(({ children, className, style, ...props }, ref) => {
    return (
        <span
            ref={ref}
            className={classNames(styles.inlineCode, className)}
            style={style}
            {...props}>
            {children}
        </span>
    );
});

InlineCode.displayName = 'InlineCode';

export { InlineCode };