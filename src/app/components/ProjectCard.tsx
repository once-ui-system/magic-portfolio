import { Flex, Heading, IconButton, SmartImage, Text } from "@/once-ui/components";

import styles from '@/app/components/ProjectCard.module.scss'
import Link from "next/link";

export function ProjectCard() {
    return (
        <Link
            style={{
                borderRadius: 'var(--radius-l)',
                textDecoration: 'none'
            }}
            href="/projects/project-1">
            <Flex
                padding="xs"
                className={styles.card}
                fillWidth gap="m"
                direction="column">
                <Flex
                    position="relative"
                    fillWidth>
                    <SmartImage
                        style={{cursor: 'pointer'}}
                        radius="l"
                        alt="Project 1"
                        aspectRatio="16 / 9"
                        src="/images/projects/project-01/cover.jpg"/>
                    <Flex
                        hide="m"
                        className={styles.icon}
                        zIndex={1}
                        position="absolute">
                        <IconButton
                            tabIndex={-1}
                            data-border="rounded"
                            icon="chevronRight"
                            variant="tertiary"
                            size="l"/>
                    </Flex>
                </Flex>
                <Flex
                    className={styles.details}
                    direction="column"
                    fillWidth paddingX="l" gap="8">
                    <Heading
                        as="h2">
                        Creating a customizable UI library for Next.js and Figma
                    </Heading>
                    <Text
                        onBackground="neutral-weak">
                        A challenging task to build & ship a full-fetched product with documentation in under 2 months.
                    </Text>
                </Flex>
            </Flex>
        </Link>
    )
}