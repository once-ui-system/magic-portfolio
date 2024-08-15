import { AvatarGroup, Flex, Heading, SmartImage, SmartLink, Text } from "@/once-ui/components";
import styles from '@/app/components/ProjectCard.module.scss';

interface ProjectCardProps {
    href: string;
    src: string;
    title: string;
    description: string;
    avatars: { src: string }[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    href,
    src,
    title,
    description,
    avatars
}) => {
    return (
        <Flex
            fillWidth gap="m"
            direction="column">
            <SmartImage
                radius="l"
                alt={title}
                aspectRatio="16 / 9"
                src={src} />
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