'use client';

import React, { ReactNode, HTMLAttributes, MouseEventHandler, forwardRef } from 'react';
import classNames from 'classnames';
import { Text, Icon, IconButton, IconButtonProps, Flex } from '.';
import styles from './Chip.module.scss';

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    selected?: boolean;
    prefixIcon?: string;
    onRemove?: () => void;
    onClick?: MouseEventHandler<HTMLDivElement>;
    children?: ReactNode;
    iconButtonProps?: Partial<IconButtonProps>;
    style?: React.CSSProperties;
    className?: string;
}

const Chip: React.FC<ChipProps> = forwardRef<HTMLDivElement, ChipProps>(({
    label,
    selected = true,
    prefixIcon,
    onRemove,
    onClick,
    children,
    iconButtonProps = {},
    style,
    className,
    ...props
}, ref) => {
    const defaultIconButtonProps: IconButtonProps = {
        icon: "close",
        variant: "ghost",
        size: "s",
        tooltip: "Remove",
        onClick: (e) => {
            e.stopPropagation();
            if (onRemove) onRemove();
        }
    };

    const combinedIconButtonProps = {
        ...defaultIconButtonProps,
        ...iconButtonProps,
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
            defaultIconButtonProps.onClick?.(e);
            iconButtonProps.onClick?.(e);
        }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onClick) onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
        }
    };

    return (
        <Flex
            ref={ref}
            alignItems="center"
            radius="full"
            paddingX="8"
            paddingY="4"
            role="button"
            tabIndex={0}
            aria-pressed={selected}
            className={classNames(styles.chip, className, {
                [styles.selected]: selected,
                [styles.unselected]: !selected,
            })}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            style={style}
            {...props}>
            {prefixIcon && 
                <Icon name={prefixIcon} size="s" />
            }
            <Flex
                paddingX="8"
                paddingY="2">
                <Text
                    variant="body-default-s">
                    {label || children}
                </Text>
            </Flex>
            {onRemove && (
                <IconButton style={{color: 'inherit'}}
                    {...combinedIconButtonProps}/>
            )}
        </Flex>
    );
});

Chip.displayName = 'Chip';

export { Chip };