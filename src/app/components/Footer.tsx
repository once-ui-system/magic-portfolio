import { Flex, IconButton, Text } from "@/once-ui/components"
import { content } from '@/app/resources'

export const Footer = () => {
    return (
        <Flex
            as="footer"
            fillWidth padding="8"
            justifyContent="center">
            <Flex
                fillWidth maxWidth="m" paddingY="8" paddingX="16"
                justifyContent="space-between" alignItems="center">
                <Text
                    variant="body-default-s"
                    onBackground="neutral-strong">
                    <Text onBackground="neutral-weak">
                        © 2024 /
                    </Text> {content.name}
                </Text>
                <Flex
                    gap="16">
                    { content.social.github && (
                        <IconButton
                            href={content.social.github}
                            icon="github"
                            tooltip="GitHub"
                            size="s"
                            variant="ghost"/>
                    )}
                    { content.social.linkedin && (
                        <IconButton
                            href={content.social.linkedin}
                            icon="linkedin"
                            tooltip="LinkedIn"
                            size="s"
                            variant="ghost"/>
                    )}
                    { content.social.x && (
                        <IconButton
                            href={content.social.x}
                            icon="x"
                            tooltip="X"
                            size="s"
                            variant="ghost"/>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}