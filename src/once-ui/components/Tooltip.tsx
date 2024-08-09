"use client";

import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { Flex, Text, Icon } from '.';

type TooltipProps = {
    label: string;
    prefixIcon?: string;
    suffixIcon?: string;
    className?: string;
};

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({
    label,
    prefixIcon,
    suffixIcon,
    className,
}, ref) => {
    return (
        <Flex
            ref={ref}
            style={{ whiteSpace: 'nowrap', userSelect: 'none' }}
            gap="4"
            zIndex={1}
            background="surface"
            paddingY="4"
            paddingX="8"
            radius="s"
            border="neutral-medium"
            borderStyle="solid-1"
            alignItems="center"
            role="tooltip"
            className={classNames(className)}>
            {prefixIcon && <Icon name={prefixIcon} size="xs" />}
            <Flex paddingX="2">
                <Text
                    as="span"
                    variant="body-default-xs"
                    onBackground="neutral-strong">
                    {label}
                </Text>
            </Flex>
            {suffixIcon && <Icon name={suffixIcon} size="xs" />}
        </Flex>
    );
});

Tooltip.displayName = "Tooltip";

export { Tooltip };
