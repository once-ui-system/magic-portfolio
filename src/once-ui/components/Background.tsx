"use client";

import React from 'react';

import { effects } from '@/app/resources/config'

const Background = ({
}) => {
    return (
        <>
            {effects.gradient && (
                <div style={{
                    position: 'fixed',
                    zIndex: '0',
                    width: '100%',
                    height: '100%',
                    filter: 'contrast(1.5)',
                    background: 'radial-gradient(100% 100% at 49.99% 0%, var(--static-transparent) 0%, var(--page-background) 100%), radial-gradient(87.4% 84.04% at 6.82% 16.24%, var(--brand-background-medium) 0%, var(--static-transparent) 100%), radial-gradient(217.89% 126.62% at 48.04% 0%, var(--accent-solid-medium) 0%, var(--static-transparent) 100%)',
                }}></div>
            )}
            {effects.dots && (
                <div style={{
                    position: 'fixed',
                    zIndex: '0',
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'radial-gradient(var(--brand-on-background-weak) 0.5px, var(--static-transparent) 0.5px)',
                    opacity: '0.25',
                    backgroundSize: 'var(--static-space-16) var(--static-space-16)'
                }}></div>
            )}
        </>
    )
}

Background.displayName = 'Background';

export { Background };