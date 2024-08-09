"use client";

import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import { Flex } from '@/once-ui/components';

import styles from './Slider.module.scss';

interface SliderProps {
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (value: number) => void;
    className?: string;
    style?: React.CSSProperties;
}

const Slider: React.FC<SliderProps> = ({
    min,
    max,
    step = 1,
    value,
    onChange,
    className,
    style,
}) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [internalValue, setInternalValue] = useState<number>(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleMouseMove = (event: MouseEvent) => {
        if (!dragging || !sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const percentage = offsetX / rect.width;
        let newValue = min + percentage * (max - min);

        if (step) {
            newValue = Math.round(newValue / step) * step;
        }

        newValue = Math.max(min, Math.min(max, newValue));
        setInternalValue(newValue);
        onChange(newValue);
    };

    const handleMouseUp = () => {
        if (step) {
            const nearestStep = Math.round(internalValue / step) * step;
            setInternalValue(nearestStep);
            onChange(nearestStep);
        }
        setDragging(false);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        handleMouseMove(event.nativeEvent as unknown as MouseEvent);
    };

    useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging, internalValue]);

    const percentage = ((internalValue - min) / (max - min)) * 100;

    return (
        <Flex
            ref={sliderRef}
            className={classNames(styles.wrapper, className)}
            style={style}
            onMouseDown={handleMouseDown}
        >
            <Flex
                className={styles.track}
                style={{ width: `${percentage}%` }}
            />
            <Flex
                className={styles.thumb}
                style={{ left: `${percentage}%` }}
            />
        </Flex>
    );
};

export { Slider };