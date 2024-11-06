'use client';

import React, { forwardRef } from 'react';
import { Text, Flex, IconButton, IconButtonProps } from '.';

interface InteractiveDetailsProps {
    label?: string;
    description?: string;
    iconButtonProps?: IconButtonProps;
    onClick: () => void;
    className?: string;
    id?: string;
}

const InteractiveDetails: React.FC<InteractiveDetailsProps> = forwardRef<HTMLDivElement, InteractiveDetailsProps>(({
    label,
    description,
    iconButtonProps,
    onClick,
    className,
    id,
}, ref) => {
    return (
        <Flex
            ref={ref}
            direction="column"
            className={className}
            onClick={onClick}
            id={id}>
            <Flex
                gap="4"
                alignItems="center">
                <Text
                    as="span"
                    variant="label-strong-m"
                    onBackground="neutral-strong">
                    {label}
                </Text>
                {iconButtonProps?.tooltip && (
                    <div onClick={(e) => e.stopPropagation()}>
                        <IconButton
                            size='s'
                            variant='ghost'
                            icon='helpCircle'
                            {...iconButtonProps}/>
                    </div>
                )}
            </Flex>
            {description && (
                <Text
                    as="span"
                    variant="body-default-s"
                    onBackground="neutral-medium">
                    {description}
                </Text>
            )}
        </Flex>
    );
});

InteractiveDetails.displayName = 'InteractiveDetails';

export { InteractiveDetails };
export type { InteractiveDetailsProps };