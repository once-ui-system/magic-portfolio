'use client';

import React, { useState, useRef, useEffect, ReactNode, forwardRef, useImperativeHandle } from 'react';
import { useFloating, shift, offset, flip, size, autoUpdate } from '@floating-ui/react-dom';
import { Flex, Dropdown, DropdownProps, DropdownOptions } from '.';
import styles from './Select.module.scss';
import classNames from 'classnames';

interface DropdownWrapperProps {
    children: ReactNode;
    dropdownOptions: DropdownOptions[];
    dropdownProps?: Omit<DropdownProps, 'options'> & { onOptionSelect?: (option: DropdownOptions) => void };
    selectedOption?: string;
    style?: React.CSSProperties;
    className?: string;
    renderCustomDropdownContent?: () => ReactNode;
}

const DropdownWrapper = forwardRef<HTMLDivElement, DropdownWrapperProps>(({
    children,
    dropdownOptions,
    dropdownProps = {},
    selectedOption,
    style,
    className,
    renderCustomDropdownContent,
}, ref) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const {
        x,
        y,
        strategy,
        refs,
        update,
    } = useFloating({
        placement: 'bottom-start',
        middleware: [
            offset(4),
            flip(),
            shift(),
            size({
                apply({ availableWidth, availableHeight, elements }) {
                    Object.assign(elements.floating.style, {
                        maxWidth: `${availableWidth}px`,
                        maxHeight: `${availableHeight}px`,
                    });
                },
            }),
        ],
        whileElementsMounted: autoUpdate,
    });

    useImperativeHandle(ref, () => wrapperRef.current as HTMLDivElement);

    useEffect(() => {
        if (wrapperRef.current) {
            refs.setReference(wrapperRef.current);
        }
    }, [refs]);

    useEffect(() => {
        if (isDropdownOpen) {
            update();
            
            if (dropdownRef.current && selectedOption) {
                const selectedElement = dropdownRef.current.querySelector(`[data-value="${selectedOption}"]`);
                if (selectedElement) {
                    selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
            }
        }
    }, [isDropdownOpen, update, selectedOption]);

    const setDropdownRef = (node: HTMLDivElement | null) => {
        dropdownRef.current = node;
        refs.setFloating(node);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            setDropdownOpen(false);
        }
    };

    const stopPropagation = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
    };

    const {
        onOptionSelect = () => {},
        ...restDropdownProps
    } = dropdownProps;

    return (
        <Flex
            style={{
                WebkitTapHighlightColor: 'transparent',
                ...style
            }}
            className={className}
            position="relative"
            ref={wrapperRef}
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}>
            {children}
            {isDropdownOpen && (
                <Flex
                    zIndex={1}
                    className={classNames(styles.dropdown, styles.fadeIn)}
                    ref={setDropdownRef}
                    style={{
                        minWidth: '100%',
                        position: strategy,
                        top: Math.round(y) + 'px',
                        left: Math.round(x) + 'px',
                    }}>
                    <Dropdown
                        options={dropdownOptions}
                        onOptionSelect={(option) => {
                            onOptionSelect(option);
                            setDropdownOpen(false);
                        }}
                        {...restDropdownProps}
                        selectedOption={selectedOption}>
                        {renderCustomDropdownContent && (
                            <div
                                onClick={stopPropagation}
                                onKeyDown={stopPropagation}>
                                {renderCustomDropdownContent()}
                            </div>
                        )}
                    </Dropdown>
                </Flex>
            )}
        </Flex>
    );
});

DropdownWrapper.displayName = 'DropdownWrapper';

export { DropdownWrapper };