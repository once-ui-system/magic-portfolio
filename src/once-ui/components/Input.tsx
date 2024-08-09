"use client";

import React, { useState, useEffect, forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Flex, Text } from '.';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    height?: 's' | 'm';
    error?: string;
    radius?: string;
    className?: string;
    hasPrefix?: React.ReactNode;
    hasSuffix?: React.ReactNode;
    labelAsPlaceholder?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    id,
    label,
    height = 'm',
    error,
    radius,
    className,
    hasPrefix,
    hasSuffix,
    labelAsPlaceholder = false,
    children,
    onFocus,
    onBlur,
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(!!props.value);

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (event.target.value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
        if (onBlur) onBlur(event);
    };

    useEffect(() => {
        setIsFilled(!!props.value);
    }, [props.value]);

    const inputClassNames = classNames(styles.input, 'font-body', 'font-default', 'font-m', {
        [styles.filled]: isFilled,
        [styles.focused]: isFocused,
        [styles.withPrefix]: hasPrefix,
        [styles.withSuffix]: hasSuffix,
        [styles.labelAsPlaceholder]: labelAsPlaceholder,
        [styles.hasChildren]: children,
    });

    return (
        <div className={classNames(styles.wrapper, className, { [styles.error]: error })}>
            <div className={classNames(styles.base, { [styles.s]: height === 's'}, { [styles.m]: height === 'm'})}
                style={{borderRadius: radius}}>
                { hasPrefix && (
                    <Flex
                        paddingLeft="12"
                        className={styles.prefix}>
                        {hasPrefix}
                    </Flex>
                )}
                <div className={styles.content}>
                    <input
                        {...props}
                        ref={ref}
                        id={id}
                        placeholder={labelAsPlaceholder ? label : props.placeholder}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={inputClassNames}
                        aria-describedby={error ? `${id}-error` : undefined}
                        aria-invalid={!!error}
                    />
                    { !labelAsPlaceholder && (
                        <Text
                            as="label"
                            variant="label-default-m"
                            htmlFor={id}
                            className={classNames(styles.label, {
                                [styles.floating]: isFocused || isFilled,
                            })}>
                            {label}
                        </Text>
                    )}
                    { children && (
                        <div className={styles.children}>
                            {children}
                        </div>
                    )}
                </div>
                { hasSuffix && (
                    <Flex
                        paddingRight="12"
                        className={styles.suffix}>
                        {hasSuffix}
                    </Flex>
                )}
            </div>
            { error && (
                <Flex paddingX="16">
                    <Text
                        as="span"
                        id={`${id}-error`}
                        variant="body-default-s"
                        onBackground="danger-weak">
                        {error}
                    </Text>
                </Flex>
            )}
        </div>
    );
});

Input.displayName = "Input";

export { Input };
export type { InputProps };