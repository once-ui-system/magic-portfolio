"use client";

import { AvatarGroup, Flex, Heading, SmartImage, SmartLink, Text } from "@/once-ui/components";
import { useState } from "react";

interface ProjectCardProps {
    href: string;
    images: string[];
    title: string;
    content: string;
    description: string;
    avatars: { src: string }[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    href,
    images = [],
    title,
    content,
    description,
    avatars
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleImageClick = () => {
        setIsTransitioning(true);
        const nextIndex = (activeIndex + 1) % images.length;
        setTimeout(() => {
            setActiveIndex(nextIndex);
            setIsTransitioning(false);
        }, 200);
    };

    const handleControlClick = (index: number) => {
        if (index !== activeIndex) {
            setIsTransitioning(true);
            setTimeout(() => {
                setActiveIndex(index);
                setIsTransitioning(false);
            }, 200);
        }
    };

    return (
        <Flex
            fillWidth gap="m"
            direction="column">
            <SmartImage
                tabIndex={0}
                radius="l"
                alt={title}
                aspectRatio="16 / 9"
                src={images[activeIndex]}
                onClick={handleImageClick}
                style={{
                    ...(images.length > 1 && {
                        cursor: 'pointer',
                        opacity: isTransitioning ? 0.2 : 1,
                        transition: 'opacity 0.2s ease',
                    }),
                }}/>
            {images.length > 1 && (
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
                            height="2">
                        </Flex>
                    ))}
                </Flex>
            )}
            <Flex
                mobileDirection="column"
                fillWidth paddingX="l" paddingY="m" gap="l">
                {title && (
                    <Flex
                        flex={5}>
                        <Heading
                            as="h2"
                            variant="display-strong-xs">
                            {title}
                        </Heading>
                    </Flex>
                )}
                {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
                    <Flex
                        flex={7} direction="column"
                        gap="s">
                        {avatars?.length > 0 && (
                            <AvatarGroup
                                avatars={avatars}
                                size="m"
                                reverseOrder/>
                        )}
                        {description?.trim() && (
                            <Text
                                variant="body-default-s"
                                onBackground="neutral-weak">
                                {description}
                            </Text>
                        )}
                        {content?.trim() && (
                            <SmartLink
                                suffixIcon="chevronRight"
                                style={{margin: '0', width: 'fit-content'}}
                                href={href}>
                                    <Text
                                        variant="body-default-s">
                                        Read case study
                                    </Text>
                            </SmartLink>
                        )}
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};