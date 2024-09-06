'use client';

import React, { useEffect, useRef, forwardRef } from 'react';
import styles from './SparkleFx.module.scss';

interface SparkleFxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    speed?: 'slow' | 'medium' | 'fast';
    count?: number;
    trigger?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

const SparkleFx = forwardRef<HTMLDivElement, SparkleFxProps>(({
    children,
    speed = 'medium',
    count = 50,
    trigger = true,
    className,
    style,
    ...rest
}, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const activeParticlesRef = useRef<number>(0);
    const intervalIdRef = useRef<number | null>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const getSpeedRange = () => {
            switch (speed) {
                case 'slow':
                    return [8, 12];
                case 'medium':
                    return [5, 8];
                case 'fast':
                    return [3, 5];
                default:
                    return [5, 8];
            }
        };

        const speedRange = getSpeedRange();

        const createParticle = () => {
            if (activeParticlesRef.current >= count) return;

            const particle = document.createElement('div');
            particle.className = styles.sparkleParticle;

            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;

            const x = Math.random() * 100;
            const y = Math.random() * 100;
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;

            const duration = Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
            particle.style.animationDuration = `${duration}s`;

            container.appendChild(particle);
            activeParticlesRef.current++;

            setTimeout(() => {
                if (particle.parentNode === container) {
                    container.removeChild(particle);
                }
                activeParticlesRef.current--;
                if (trigger && activeParticlesRef.current < count) {
                    createParticle();
                }
            }, duration * 1000);
        };

        const startEmitting = () => {
            if (intervalIdRef.current === null) {
                intervalIdRef.current = window.setInterval(() => {
                    if (activeParticlesRef.current < count) {
                        createParticle();
                    }
                }, 100);
            }
        };

        const stopEmitting = () => {
            if (intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        };

        if (trigger) {
            startEmitting();
        } else {
            stopEmitting();
        }

        return () => {
            stopEmitting();
        };
    }, [count, speed, trigger]);

    return (
        <div
            ref={ref || containerRef}
            className={`${styles.sparkleContainer} ${className || ''}`}
            style={style}
            {...rest}>
            {children}
        </div>
    );
});

SparkleFx.displayName = 'SparkleFx';
export { SparkleFx };