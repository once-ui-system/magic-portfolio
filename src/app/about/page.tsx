"use client";

import { Avatar, Button, Flex, Heading, Icon, IconButton, SmartImage, SmartLink, Tag, Text } from '@/once-ui/components';
import { person, about, social } from '@/app/resources'
import styles from '@/app/about/about.module.scss'

function scrollTo(id: string, offset: number) {
    const element = document.getElementById(id);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

const structure = [
    { 
        title: about.intro.title, 
        items: []
    },
    { 
        title: about.work.title, 
        items: about.work.experiences.map(experience => experience.company)
    },
    { 
        title: about.technical.title, 
        items: about.technical.skills.map(skill => skill.title)
    },
]

export default function About() {
    return (
        <Flex
            fillWidth maxWidth="m"
            direction="column">
            { about.tableOfContent.display && (
                <Flex
                    style={{ left: '0', top: '50%', transform: 'translateY(-50%)' }}
                    position="fixed"
                    paddingLeft="24" gap="32"
                    direction="column" hide="s">
                    {structure.map((section, sectionIndex) => (
                        <Flex key={sectionIndex}
                            gap="12" direction="column">
                            <Flex
                                style={{cursor: 'pointer'}}
                                className={styles.hover}
                                gap="8" alignItems="center"
                                onClick={() => scrollTo(section.title, 80)}>
                                <Flex
                                    height="1" width="16"
                                    background="neutral-strong">
                                </Flex>
                                <Text>
                                    {section.title}
                                </Text>
                            </Flex>
                            { about.tableOfContent.subItems && (
                                <>
                                    {section.items.map((item, itemIndex) => (
                                        <Flex
                                            style={{cursor: 'pointer'}}
                                            className={styles.hover}
                                            key={itemIndex}
                                            gap="12" paddingLeft="24" alignItems="center"
                                            onClick={() => scrollTo(item, 80)}>
                                            <Flex
                                                height="1" width="8"
                                                background="neutral-strong">
                                            </Flex>
                                            <Text>
                                                {item}
                                            </Text>
                                        </Flex>
                                    ))}
                                </>
                            )}
                        </Flex>
                    ))}
                </Flex>
            )}
            <Flex
                fillWidth
                mobileDirection="column">
                { about.avatar.display && (
                    <Flex
                        minWidth="160" paddingX="l" paddingBottom="xl" gap="m"
                        flex={3} direction="column" alignItems="center">
                        <Avatar
                            src={person.avatar}
                            size="xl"/>
                        <Flex
                            gap="8"
                            alignItems="center">
                            <Icon
                                onBackground="accent-weak"
                                name="globe"/>
                            {person.location}
                        </Flex>
                        { person.languages.length > 0 && (
                            <Flex
                                wrap
                                gap="8">
                                {person.languages.map((language, index) => (
                                    <Tag
                                        key={index}
                                        size="l">
                                        {language}
                                    </Tag>
                                ))}
                            </Flex>
                        )}
                    </Flex>
                )}
                <Flex
                    className={styles.blockAlign}
                    fillWidth flex={9} maxWidth={40} direction="column">
                    <Flex
                        id={about.intro.title}
                        fillWidth minHeight="160"
                        direction="column" justifyContent="center"
                        marginBottom="32">
                        {about.calendar.display && (
                            <Flex
                                className={styles.blockAlign}
                                style={{
                                    border: '1px solid var(--brand-alpha-medium)',
                                    width: 'fit-content'
                                }}
                                alpha="brand-weak" radius="full"
                                fillWidth padding="4" gap="8" marginBottom="m"
                                alignItems="center">
                                <Flex paddingLeft="12">
                                    <Icon
                                        name="calendar"
                                        onBackground="brand-weak"/>
                                </Flex>
                                <Flex
                                    paddingX="8">
                                    Schedule a call
                                </Flex>
                                <IconButton
                                    href={about.calendar.link}
                                    data-border="rounded"
                                    variant="tertiary"
                                    icon="chevronRight"/>
                            </Flex>
                        )}
                        <Heading
                            className={styles.textAlign}
                            variant="display-strong-xl">
                            {person.name}
                        </Heading>
                        <Text
                            className={styles.textAlign}
                            variant="display-default-xs"
                            onBackground="neutral-weak">
                            {person.role}
                        </Text>
                        {social.length > 0 && (
                            <Flex
                                className={styles.blockAlign}
                                paddingTop="20" paddingBottom="8" gap="8">
                                {social.map((item) => (
                                    item.link && (
                                        <Button
                                            key={item.name}
                                            href={item.link}
                                            prefixIcon={item.icon}
                                            label={item.name}
                                            size="s"
                                            variant="tertiary"/>
                                    )
                                ))}
                            </Flex>
                        )}
                    </Flex>
                    { about.intro.display && (
                        <Text
                            variant="body-default-l"
                            marginBottom="xl">
                            {about.intro.description}
                        </Text>
                    )}

                    { about.work.display && (
                        <>
                            <Heading
                                as="h2"
                                id={about.work.title}
                                variant="display-strong-s"
                                marginBottom="m">
                                Work experience
                            </Heading>
                            <Flex
                                direction="column"
                                fillWidth gap="l"
                                marginBottom="l">
                                {about.work.experiences.map((experience, index) => (
                                    <Flex
                                        key={`${experience.company}-${experience.role}-${index}`}
                                        fillWidth
                                        direction="column">
                                        <Flex
                                            fillWidth
                                            justifyContent="space-between"
                                            alignItems="flex-end"
                                            marginBottom="4">
                                            <Text
                                                id={experience.company}
                                                variant="heading-strong-l">
                                                {experience.company}
                                            </Text>
                                            <Text
                                                variant="heading-default-xs"
                                                onBackground="neutral-weak">
                                                {experience.timeframe}
                                            </Text>
                                        </Flex>
                                        <Text
                                            variant="body-default-s"
                                            onBackground="brand-weak"
                                            marginBottom="m">
                                            {experience.role}
                                        </Text>
                                        <Flex
                                            as="ul"
                                            direction="column" gap="16">
                                            {experience.achievements.map((achievement, index) => (
                                                <Text
                                                    as="li"
                                                    variant="body-default-m"
                                                    key={`${experience.company}-${index}`}>
                                                    {achievement}
                                                </Text>
                                            ))}
                                        </Flex>
                                        {experience.images.length > 0 && (
                                            <Flex
                                                fillWidth paddingTop="m" paddingLeft="40" gap="12"
                                                wrap>
                                                {experience.images.map((image, index) => (
                                                    <Flex
                                                        key={index}
                                                        border="neutral-medium"
                                                        borderStyle="solid-1"
                                                        radius="m"
                                                        minWidth={image.width} height={image.height}>
                                                        <SmartImage
                                                            enlarge
                                                            radius="m"
                                                            sizes={image.width.toString()}
                                                            alt={image.alt}
                                                            src={image.src}/>
                                                    </Flex>
                                                ))}
                                            </Flex>
                                        )}
                                    </Flex>
                                ))}
                            </Flex>
                        </>
                    )}

                    { about.technical.display && (
                        <>
                            <Heading
                                as="h2"
                                id={about.technical.title}
                                variant="display-strong-s"
                                marginBottom="m">
                                Technical skills
                            </Heading>
                            <Flex
                                direction="column"
                                fillWidth gap="l">
                                {about.technical.skills.map((skill, index) => (
                                    <Flex
                                        key={`${skill}-${index}`}
                                        fillWidth
                                        direction="column">
                                        <Flex
                                            fillWidth
                                            justifyContent="space-between"
                                            alignItems="flex-end"
                                            marginBottom="4">
                                            <Text variant="heading-strong-l">
                                                {skill.title}
                                            </Text>
                                        </Flex>
                                        <Text
                                            variant="body-default-m">
                                            {skill.description}
                                        </Text>
                                        {skill.images.length > 0 && (
                                            <Flex
                                                fillWidth paddingY="m" gap="12"
                                                wrap>
                                                {skill.images.map((image, index) => (
                                                    <Flex
                                                        key={index}
                                                        border="neutral-medium"
                                                        borderStyle="solid-1"
                                                        radius="m"
                                                        minWidth={image.width} height={image.height}>
                                                        <SmartImage
                                                            enlarge
                                                            radius="m"
                                                            sizes={image.width.toString()}
                                                            alt={image.alt}
                                                            src={image.src}/>
                                                    </Flex>
                                                ))}
                                            </Flex>
                                        )}
                                    </Flex>
                                ))}
                            </Flex>
                        </>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
}