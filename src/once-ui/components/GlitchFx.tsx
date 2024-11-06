'use client';

import React, { useEffect, useState, forwardRef } from 'react';
import styles from './GlitchFx.module.scss';

interface GlitchFxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    speed?: 'slow' | 'medium' | 'fast';
    interval?: number;
    trigger?: 'instant' | 'hover' | 'custom';
    continuous?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

const GlitchFx = forwardRef<HTMLDivElement, GlitchFxProps>(({
    children,
    speed = 'medium',
    interval = 2500,
    trigger = 'instant',
    continuous = true,
    style,
    className,
    ...rest
}, ref) => {
    const [isGlitching, setIsGlitching] = useState(continuous || trigger === 'instant');

    useEffect(() => {
        if (continuous || trigger === 'instant') {
            setIsGlitching(true);
        }
    }, [continuous, trigger]);

    const handleMouseEnter = () => {
        if (trigger === 'hover') {
            setIsGlitching(true);
        }
    };

    const handleMouseLeave = () => {
        if (trigger === 'hover') {
            setIsGlitching(false);
        }
    };

    const triggerGlitch = () => {
        if (trigger === 'custom') {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 500);
        }
    };

    useEffect(() => {
        if (trigger === 'custom') {
            const glitchInterval = setInterval(triggerGlitch, interval);
            return () => clearInterval(glitchInterval);
        }
    }, [trigger, interval]);

    const speedClass = styles[speed];

    const combinedClassName = `${styles.glitchFx} ${speedClass} ${isGlitching ? styles.active : ''} ${className || ''}`;

    return (
        <div
            ref={ref}
            style={style}
            className={combinedClassName}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...rest}>
            <div className={styles.original}>
                {children}
            </div>

            <div className={`${styles.glitchLayer} ${styles.blueShift}`}>
                {children}
            </div>

            <div className={`${styles.glitchLayer} ${styles.redShift}`}>
                {children}
            </div>
        </div>
    );
});

GlitchFx.displayName = 'GlitchFx';
export { GlitchFx };