"use client";

import React, { forwardRef } from 'react';

import { Avatar, AvatarProps, Flex } from '.';
import styles from './AvatarGroup.module.scss';

interface AvatarGroupProps {
    avatars: AvatarProps[];
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    reverseOrder?: boolean;
    limit?: number;
    className?: string;
    style?: React.CSSProperties;
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(({
    avatars,
    size = 'm',
    reverseOrder = false,
    limit,
    className,
    style
}, ref) => {
    const displayedAvatars = limit ? avatars.slice(0, limit) : avatars;
    const remainingCount = limit && avatars.length > limit ? avatars.length - limit : 0;

    return (
        <Flex
            position="relative"
            alignItems="center"
            ref={ref}
            className={`${styles.avatarGroup} ${className || ''}`}
            style={style}
            zIndex={0}>
            {displayedAvatars.map((avatarProps, index) => (
                <Avatar
                    key={index}
                    size={size}
                    {...avatarProps}
                    className={styles.avatar}
                    style={{
                        ...avatarProps.style,
                        zIndex: reverseOrder ? displayedAvatars.length - index : index + 1
                    }}/>
            ))}
            {remainingCount > 0 && (
                <Avatar
                    value={`+${remainingCount}`}
                    className={styles.avatar}
                    size={size}
                    style={{
                        ...style,
                        zIndex: reverseOrder ?  -1 : displayedAvatars.length + 1
                    }}/>
            )}
        </Flex>
    );
});

AvatarGroup.displayName = "AvatarGroup";

export { AvatarGroup };
export type { AvatarGroupProps };