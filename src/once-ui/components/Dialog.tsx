'use client';

import React, { ReactNode, useEffect, useCallback, useRef, forwardRef, useState } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Flex, Heading, IconButton, Button, ButtonProps, Text } from '.';
import styles from './Dialog.module.scss';

interface DialogButtonProps extends Partial<ButtonProps> {
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: ReactNode;
    description?: ReactNode;
    children: ReactNode;
    primaryButtonProps?: DialogButtonProps;
    secondaryButtonProps?: DialogButtonProps;
    dangerButtonProps?: DialogButtonProps;
    style?: React.CSSProperties;
    className?: string;
}

const Dialog: React.FC<DialogProps> = forwardRef<HTMLDivElement, DialogProps>(({
    isOpen,
    onClose,
    title,
    description,
    children,
    primaryButtonProps,
    secondaryButtonProps,
    dangerButtonProps,
    style,
    className
}, ref) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(isOpen);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
            const timeout = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
        if (event.key === 'Tab' && dialogRef.current) {
            const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    event.preventDefault();
                }
            }
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    useEffect(() => {
        if (isOpen && dialogRef.current) {
            const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            firstElement.focus();
        }
    }, [isOpen]);

    if (!isVisible) return null;

    return ReactDOM.createPortal(
        <Flex
            ref={ref}
            className={classNames(styles.overlay, className, { [styles.open]: isAnimating })}
            style={style}
            justifyContent="center"
            alignItems="center"
            padding="l"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dialog-title">
            <Flex
                style={{ maxHeight: '100%' }}
                className={classNames(styles.dialog, { [styles.open]: isAnimating })}
                ref={dialogRef}
                fillWidth
                radius="xl"
                border="neutral-medium"
                borderStyle="solid-1"
                background="neutral-weak"
                direction="column">
                <Flex
                    as="header"
                    direction="column"
                    paddingX="24"
                    paddingTop="24"
                    paddingBottom="s"
                    gap="4">
                    <Flex
                        fillWidth
                        justifyContent="space-between"
                        gap="8">
                        <Heading
                            id="dialog-title"
                            variant="heading-strong-l">
                            {title}
                        </Heading>
                        <IconButton
                            icon="close"
                            size="m"
                            variant="tertiary"
                            tooltip="Close"
                            onClick={onClose} />
                    </Flex>
                    {description && (
                        <Text
                            variant="body-default-s"
                            onBackground="neutral-weak">
                            {description}
                        </Text>
                    )}
                </Flex>
                <Flex
                    as="section"
                    paddingX="24" paddingBottom="24"
                    overflowY="auto"
                    direction="column">
                    {children}
                </Flex>
                {(primaryButtonProps || secondaryButtonProps || dangerButtonProps) && (
                    <Flex
                        style={{
                            borderTop: '1px solid var(--neutral-border-medium)'
                        }}
                        as="footer"
                        justifyContent="space-between"
                        padding="12">
                            {dangerButtonProps ? (
                                <Button
                                    {...dangerButtonProps}/>
                            ) : <div/>
                        }
                        <Flex gap="8">
                            {secondaryButtonProps && (
                                <Button
                                    {...secondaryButtonProps}/>
                            )}
                            {primaryButtonProps && (
                                <Button
                                    {...primaryButtonProps}/>
                            )}
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Flex>,
        document.body
    );
});

Dialog.displayName = 'Dialog';

export { Dialog };