"use client"

import React from 'react';
import { createPortal } from 'react-dom';

import { Flex, Toast } from '.';
import styles from './Toaster.module.scss';

interface ToasterProps {
    toasts: { 
        id: string; 
        variant: 'success' | 'danger'; 
        message: string; 
        action?: React.ReactNode 
    }[];
    removeToast: (id: string) => void;
}

const Toaster: React.FC<ToasterProps> = ({
    toasts,
    removeToast }) => {
    return createPortal(
        <Flex
            zIndex={11}
            fillWidth
            direction="column"
            maxWidth={32}
            className={styles.toastContainer}>
            {toasts.map((toast, index, array) => (
                <Flex
                    padding="4"
                    fillWidth
                    position="absolute"
                    key={toast.id}
                    className={styles.toastWrapper}
                    style={{
                        transformOrigin: 'bottom center',
                        transform: `scale(${1 - (array.length - 1 - index) * 0.05}) translateY(${1 - (array.length - 1 - index) * 10}%)`,
                        opacity: array.length - 1 - index === 0 ? 1 : 0.9
                    }}>
                    <Toast
                        className={styles.toastAnimation}
                        variant={toast.variant}
                        onClose={() => removeToast(toast.id)}
                        action={toast.action}>
                        {toast.message}
                    </Toast>
                </Flex>
            ))}
        </Flex>,
        document.body
    );
};

Toaster.displayName = 'Toaster';

export { Toaster };