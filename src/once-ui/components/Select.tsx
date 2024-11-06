'use client';

import React, { useState, useRef, useEffect, forwardRef } from 'react';
import classNames from 'classnames';
import { DropdownWrapper, Input, InputProps } from '.';
import { DropdownOptions } from '.';
import inputStyles from './Input.module.scss';

interface SelectProps extends Omit<InputProps, 'onSelect' | 'value'> {
    options: DropdownOptions[];
    value: string;
    style?: React.CSSProperties;
    onSelect: (option: DropdownOptions) => void;
    renderDropdownOptions?: (option: DropdownOptions) => React.ReactNode;
    renderCustomDropdownContent?: () => React.ReactNode;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(({
    options,
    value,
    style,
    onSelect,
    renderDropdownOptions,
    renderCustomDropdownContent,
    ...inputProps
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(!!value);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        setIsDropdownOpen(true);
        if (inputProps.onFocus) inputProps.onFocus(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        if (!selectRef.current?.contains(event.relatedTarget as Node)) {
            setIsDropdownOpen(false);
        }
        if (value || event.target.value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
        if (inputProps.onBlur) inputProps.onBlur(event);
    };

    const handleSelect = (option: DropdownOptions) => {
        onSelect(option);
        setIsDropdownOpen(false);
        setIsFilled(true);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <DropdownWrapper
            ref={selectRef}
            dropdownOptions={options}
            dropdownProps={{
                onOptionSelect: handleSelect
            }}
            renderCustomDropdownContent={renderCustomDropdownContent}>
            <Input
                {...inputProps}
                style={{ cursor: 'pointer', textOverflow: 'ellipsis', ...style }}
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
                readOnly
                className={classNames({
                    [inputStyles.filled]: isFilled,
                    [inputStyles.focused]: isFocused,
                })}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
            />
        </DropdownWrapper>
    );
});

Select.displayName = 'Select';

export { Select };
export type { SelectProps };