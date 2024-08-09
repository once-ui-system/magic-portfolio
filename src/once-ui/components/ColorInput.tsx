"use client";

import React, {  useRef, forwardRef } from 'react';
import { Flex, Input, InputProps, IconButton, Icon } from '.';

interface ColorInputProps extends Omit<InputProps, 'onChange' | 'value'> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(({
    label,
    id,
    value,
    onChange,
    ...props
}, ref) => {
    const colorInputRef = useRef<HTMLInputElement>(null);

    const handleHexClick = () => {
        if (colorInputRef.current) {
            colorInputRef.current.click();
        }
    };

    const handleReset = () => {
        onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <Input
            style={{ cursor: 'pointer'}}
            id={id}
            ref={colorInputRef}
            label={label}
            type="color"
            value={value}
            {...props}
            hasPrefix={
                <Flex>
                    <Flex
                        style={{
                            width: value ? 'var(--static-space-0)' : 'var(--static-space-20)',
                            transform: value ? 'scale(0)' : 'scale(1)',
                            opacity: value ? '0' : '1',
                            transition: '0.2s ease-in-out all'
                        }}>
                        <Flex
                            padding="2">
                            <Icon
                                size="xs"
                                name="eyeDropper"
                                onBackground="neutral-medium"/>
                        </Flex>
                    </Flex>
                    <Flex
                        border="neutral-strong"
                        borderStyle="solid-1"
                        className={`prefix ${value ? '' : 'hidden'}`}
                        onClick={handleHexClick}
                        height="20"
                        radius="xs"
                        style={{
                            backgroundColor: value,
                            cursor: 'pointer',
                            width: value ? 'var(--static-space-20)' : 'var(--static-space-0)',
                            transform: value ? 'scale(1)' : 'scale(0)',
                            opacity: value ? '1' : '0',
                            transition: '0.2s ease-in-out all'
                        }}></Flex>
                </Flex>
            }
            hasSuffix={
                <Flex
                    className={`suffix ${value ? '' : 'hidden'}`}
                    position="absolute"
                    style={{
                        left: 'var(--static-space-48)',
                        cursor: 'pointer',
                        width: 'calc(100% - var(--static-space-48))'
                    }}>
                    <Flex onClick={handleHexClick}
                        fillWidth
                        style={{
                            opacity: value ? '1' : '0',
                            transition: 'opacity 0.2s ease-in-out'
                        }}>
                        {value}
                    </Flex>
                    { value && (
                        <IconButton
                            onClick={handleReset}
                            variant="secondary"
                            tooltip="Remove"
                            tooltipPosition="left"
                            icon="close"
                            style={{
                                position: 'absolute',
                                right: 'var(--static-space-12)',
                                transform: 'translateY(-50%)'
                            }}/>
                    )}
                </Flex>
            }
            onChange={onChange}
        />
    );
});

ColorInput.displayName = "ColorInput";

export { ColorInput };