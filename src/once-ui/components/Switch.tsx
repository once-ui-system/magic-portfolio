"use client";

import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { Flex, InteractiveDetails, InteractiveDetailsProps } from '.';
import styles from './Switch.module.scss';

interface SwitchProps extends Omit<InteractiveDetailsProps, 'onClick'> {
    className?: string;
    isChecked: boolean;
    reverse?: boolean;
    onToggle: () => void;
    ariaLabel?: string;
}

const Switch = forwardRef<HTMLDivElement, SwitchProps>(({
    className,
    isChecked,
    reverse = false,
    onToggle,
    ariaLabel = 'Toggle switch',
    ...interactiveDetailsProps
}, ref) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
            onToggle();
        }
    };

    return (
        <Flex
            ref={ref}
            gap="16"
            alignItems="center"
            justifyContent={reverse ? 'space-between' : 'auto'}
            fillWidth={reverse}
            className={classNames(styles.container, className, {
                [styles.reverse]: reverse,
            })}
            onClick={onToggle}
            role="switch"
            aria-checked={isChecked}
            aria-label={ariaLabel}
            tabIndex={-1}>
            <div
                className={classNames(styles.switch, {
                    [styles.checked]: isChecked,
                })}>
                <div
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    className={classNames(styles.toggle, {
                        [styles.checked]: isChecked,
                    })}/>
            </div>
            { interactiveDetailsProps.label && (
            <InteractiveDetails
                {...interactiveDetailsProps}
                onClick={() => {}}/>
            )}
        </Flex>
    );
});

Switch.displayName = "Switch";

export { Switch };