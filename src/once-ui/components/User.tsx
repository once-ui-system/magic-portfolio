'use client';

import React, { forwardRef } from 'react';
import classNames from 'classnames';

import { Flex, Text, Skeleton, Tag, TagProps, Avatar, AvatarProps } from '.';

interface UserProps {
    name?: string;
    children?: React.ReactNode;
    subline?: string;
    tag?: string;
    tagProps?: TagProps;
    loading?: boolean;
    avatarProps?: AvatarProps;
    className?: string;
}

const User = forwardRef<HTMLDivElement, UserProps>(({ 
    name, 
    children,
    subline, 
    tagProps = {}, 
    loading = false, 
    avatarProps = {},
    className
}, ref) => {
    const { src, value, empty, ...restAvatarProps } = avatarProps;
    const isEmpty = empty || (!src && !value);

    return (
        <Flex
            ref={ref}
            alignItems="center"
            gap="8"
            className={classNames(className)}>
            <Avatar 
                size="m"
                src={src} 
                value={value} 
                empty={isEmpty}
                loading={loading} 
                {...restAvatarProps}/>
            {children}
            {name && (
                <Flex
                    direction="column"
                    paddingLeft="4"
                    paddingRight="12">
                    {loading ? (
                        <Flex
                            minWidth={6}
                            paddingY="4">
                            <Skeleton
                                width="xl"
                                height="m"
                                shape="line"
                                aria-label="Loading name" />
                        </Flex>
                    ) : ( 
                        <Flex
                            gap="8"
                            alignItems="center">
                            <Text
                                variant="heading-strong-xs"
                                onBackground="neutral-strong">
                                {name}
                            </Text>
                            {tagProps.label && (
                                <Tag
                                    size="s"
                                    {...tagProps}>
                                    {tagProps.label}
                                </Tag>
                            )}
                        </Flex>
                    )}
                    {loading ? (
                        <Flex
                            paddingY="4">
                            <Skeleton
                                width="l"
                                height="xs"
                                shape="line"
                                aria-label="Loading subline" />
                        </Flex>
                    ) : (
                        <Text
                            wrap="nowrap"
                            variant="body-default-xs"
                            onBackground="neutral-weak">
                            {subline}
                        </Text>
                    )}
                </Flex>
            )}
        </Flex>
    );
});

User.displayName = 'User';

export { User };
export type { UserProps };