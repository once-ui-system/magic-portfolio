"use client";

import { AvatarGroup, Flex, Heading, SmartImage, SmartLink, Text } from "@/once-ui/components";
import styles from '@/app/components/ProjectCard.module.scss';
import { useState } from "react";

interface ProjectCardProps {
    href: string;
    images: string[];
    title: string;
    description: string;
    avatars: { src: string }[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    href,
    images = [],
    title,
    description,
    avatars
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleImageClick = () => {
        const nextIndex = (activeIndex + 1) % images.length;
        setActiveIndex(nextIndex);
    };

    const handleControlClick = (index: number) => {
        setActiveIndex(index);
    };

    const shouldShowControls = images.length > 1;

    return (
        <Flex
            fillWidth gap="m"
            direction="column">
            <SmartImage
                radius="l"
                alt={title}
                aspectRatio="16 / 9"
                src={images[activeIndex]}
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}
            />
            {shouldShowControls && (
                <Flex
                    gap="4" paddingX="s"
                    fillWidth maxWidth={32}
                    justifyContent="center">
                    {images.map((_, index) => (
                        <Flex
                            key={index}
                            onClick={() => handleControlClick(index)}
                            style={{
                                background: activeIndex === index 
                                    ? 'var(--neutral-on-solid-strong)' 
                                    : 'var(--neutral-alpha-medium)',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease',
                            }}
                            fillWidth
                            height="2"
                        ></Flex>
                    ))}
                </Flex>
            )}
            <Flex
                mobileDirection="column"
                fillWidth paddingX="l" paddingY="m" gap="l">
                <Flex
                    flex={5}>
                    <Heading
                        as="h2"
                        variant="display-strong-xs">
                        {title}
                    </Heading>
                </Flex>
                <Flex
                    flex={7} direction="column"
                    gap="s">
                    <AvatarGroup avatars={avatars} size="m" />
                    <Text variant="body-default-s" onBackground="neutral-weak">
                        {description}
                    </Text>
                    <SmartLink
                        style={{margin: '0'}}
                        href={href}>
                        <Text
                            variant="body-default-s">
                            Read case study
                        </Text>
                    </SmartLink>
                </Flex>
            </Flex>
        </Flex>
    );
};