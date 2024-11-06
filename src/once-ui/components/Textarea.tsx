'use client';

import React, { useState, useEffect, forwardRef, TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';
import { Flex, Text } from '.';
import styles from './Input.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    label: string;
    lines?: number;
    error?: React.ReactNode;
    description?: React.ReactNode;
    radius?: string;
    className?: string;
    hasPrefix?: React.ReactNode;
    hasSuffix?: React.ReactNode;
    labelAsPlaceholder?: boolean;
    resize?: 'horizontal' | 'vertical' | 'both';
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
    id,
    label,
    lines = 3,
    error,
    description,
    radius,
    className,
    hasPrefix,
    hasSuffix,
    labelAsPlaceholder = false,
    resize = 'vertical',
    children,
    onFocus,
    onBlur,
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(!!props.value);

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        if (onFocus) onFocus(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
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

    const textareaClassNames = classNames(styles.input, 'font-body', 'font-default', 'font-m', {
        [styles.filled]: isFilled,
        [styles.focused]: isFocused,
        [styles.withPrefix]: hasPrefix,
        [styles.withSuffix]: hasSuffix,
        [styles.labelAsPlaceholder]: labelAsPlaceholder,
        [styles.hasChildren]: children,
        [styles.textarea]: true,
    });

    return (
        <div className={classNames(styles.wrapper, className, { [styles.error]: error })}>
            <div className={classNames(styles.base, styles.textareaBase)} 
                style={{borderRadius: radius}}>
                { hasPrefix && (
                    <Flex
                        paddingLeft="12"
                        className={styles.prefix}>
                        {hasPrefix}
                    </Flex>
                )}
                <div className={styles.content}>
                    <textarea
                        {...props}
                        ref={ref}
                        id={id}
                        rows={lines}
                        placeholder={labelAsPlaceholder ? label : props.placeholder}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={textareaClassNames}
                        aria-describedby={error ? `${id}-error` : undefined}
                        aria-invalid={!!error}
                        style={{
                            resize,
                            paddingTop: 'var(--static-space-24)',
                            minHeight: 'var(--static-space-56)'
                        }}
                    />
                    { !labelAsPlaceholder && (
                        <Text
                            as="label"
                            variant="label-default-m"
                            htmlFor={id}
                            className={classNames(styles.label, styles.textareaLabel, {
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
            { description && (
                <Flex paddingX="16">
                    <Text
                        as="span"
                        id={`${id}-description`}
                        variant="body-default-s"
                        onBackground="neutral-weak">
                        {description}
                    </Text>
                </Flex>
            )}
        </div>
    );
});

Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };