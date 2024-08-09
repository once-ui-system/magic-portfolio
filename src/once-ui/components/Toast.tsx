"use client"

import React, { useEffect, useState, forwardRef } from 'react';
import { IconButton, Icon, Flex, Text } from '.';
import classNames from 'classnames';
import styles from './Toast.module.scss';

interface ToastProps {
    className?: string;
    variant: 'success' | 'danger';
    icon?: boolean;
    onClose?: () => void;
    action?: React.ReactNode;
    children: React.ReactNode;
}

const iconMap = {
    success: 'checkCircle',
    danger: 'errorCircle'
};

const Toast = forwardRef<HTMLDivElement, ToastProps>(({
    variant,
    className,
    icon = true,
    onClose,
    action, 
    children
}, ref) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 6000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!visible && onClose) {
            onClose();
        }
    }, [visible, onClose]);

    return (
        <Flex
            ref={ref}
            fillWidth
            background='surface'
            radius="l"
            paddingY="12"
            paddingX="20"
            border="neutral-medium"
            borderStyle="solid-1"
            role="alert"
            aria-live="assertive"
            className={classNames(className, styles.toast, styles[variant], {
                [styles.visible]: visible,
                [styles.hidden]: !visible,
            })}>
            <Flex
                fillWidth
                alignItems="center"
                gap="8">
                {icon && (
                    <Icon
                        size="l"
                        onBackground={`${variant}-medium`}
                        name={iconMap[variant]}/>
                )}
                <Text
                    variant="body-default-s"
                    style={{ width: '100%' }}
                    as="div">
                    {children}
                </Text>
                {action && (
                    <div>
                        {action}
                    </div>
                )}
                {onClose && (
                    <IconButton
                        variant="ghost"
                        icon="close"
                        size="m"
                        tooltip="Hide"
                        tooltipPosition="top"
                        onClick={() => setVisible(false)}/>
                )}
            </Flex>
        </Flex>
    );
});

Toast.displayName = "Toast";

export { Toast };