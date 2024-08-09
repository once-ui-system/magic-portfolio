import { Avatar, Flex, Heading, Text } from '@/once-ui/components';
import { content } from '@/app/resources'

export default function About() {
    return (
        <Flex
            fillWidth
            direction="column">
            <Flex
                alignItems="center"
                gap="xl">
                <Avatar
                    src="/images/avatar.png"
                    size="xl"/>
                <Flex
                    direction="column"
                    gap="12">
                    <Heading
                        variant="display-strong-xl">
                        {content.name}
                    </Heading>
                    <Text
                        variant="display-default-xs"
                        onBackground="neutral-weak">
                        {content.role}
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
}