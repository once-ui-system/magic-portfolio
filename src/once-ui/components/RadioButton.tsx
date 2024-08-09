"use client";

import React, { useState, useEffect, forwardRef } from 'react';
import classNames from 'classnames';
import { Flex, InteractiveDetails, InteractiveDetailsProps } from '.';
import styles from './RadioButton.module.scss';

interface RadioButtonProps extends Omit<InteractiveDetailsProps, 'onClick'> {
    style?: React.CSSProperties;
    className?: string;
    isChecked?: boolean;
    onToggle?: () => void;
}

const generateId = () => `radio-${Math.random().toString(36).substring(2, 9)}`;

const RadioButton: React.FC<RadioButtonProps> = forwardRef<HTMLDivElement, RadioButtonProps>(({
    style,
    className,
    isChecked: controlledIsChecked,
    onToggle,
    ...interactiveDetailsProps
}, ref) => {
    const [isChecked, setIsChecked] = useState(controlledIsChecked || false);
    const [radioId] = useState(generateId());

    useEffect(() => {
        if (controlledIsChecked !== undefined) {
            setIsChecked(controlledIsChecked);
        }
    }, [controlledIsChecked]);

    const toggleItem = () => {
        if (onToggle) {
            onToggle();
        } else {
            setIsChecked(!isChecked);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleItem();
        }
    };

    return (
        <Flex
            ref={ref}
            alignItems="center"
            gap="16"
            style={style}
            className={classNames(styles.container, className)}
            onClick={onToggle}>
            <Flex
                role="radio"
                aria-checked={controlledIsChecked !== undefined ? controlledIsChecked : isChecked}
                aria-labelledby={radioId}
                position="relative"
                justifyContent="center"
                alignItems="center"
                radius="full"
                background="surface"
                onKeyDown={handleKeyDown}
                tabIndex={0}
                className={classNames(styles.radioButton, {
                    [styles.checked]: controlledIsChecked !== undefined ? controlledIsChecked : isChecked,
                })}>
                {(controlledIsChecked !== undefined ? controlledIsChecked : isChecked) && (
                    <Flex
                        radius="full"
                        className={styles.icon}/>
                )}
            </Flex>
            <InteractiveDetails
                id={radioId}
                {...interactiveDetailsProps}
                onClick={toggleItem}/>
        </Flex>
    );
});

RadioButton.displayName = "RadioButton";

export { RadioButton };
export type { RadioButtonProps };