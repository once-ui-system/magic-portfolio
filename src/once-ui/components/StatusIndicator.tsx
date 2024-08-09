"use client";

import React, { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './StatusIndicator.module.scss';

interface StatusIndicatorProps {
    size: 's' | 'm' | 'l';
    color: 'green' | 'yellow' | 'red' | 'gray';
    ariaLabel?: string;
    className?: string;
    style?: React.CSSProperties;
}

const StatusIndicator = forwardRef<HTMLDivElement, StatusIndicatorProps>(({
    size,
    color,
    className,
    style,
    ariaLabel = `${color} status indicator`
}, ref) => {
    return (
        <div
            ref={ref}
            style={style}
            className={classNames(styles.statusIndicator, styles[size], styles[color], className)}
            aria-label={ariaLabel}/>
    );
});

StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator };