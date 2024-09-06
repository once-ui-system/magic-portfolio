"use client";

import React, { forwardRef} from 'react';
import classNames from 'classnames';

import styles from './Skeleton.module.scss';

interface SkeletonProps {
    shape: 'line' | 'circle' | 'block';
    width?: 'xl' | 'l' | 'm' | 's' | 'xs';
    height?: 'xl' | 'l' | 'm' | 's' | 'xs';
    delay? : '1' | '2' | '3' | '4' | '5' | '6';
    style?: React.CSSProperties;
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = forwardRef<HTMLDivElement, SkeletonProps>(({
    shape = 'line',
    width,
    height,
    delay,
    style,
    className
}, ref) => {
    return (
        <div
            ref={ref}
            style={style}
            className={classNames(
                styles.skeleton,
                styles[shape],
                width && styles['w-' + width],
                height && styles['h-' + height],
                delay && styles['delay-' + delay],
                className
            )}/>
    );
});

Skeleton.displayName = "Skeleton";

export { Skeleton };