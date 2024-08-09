"use client";

import { Avatar, Button, Flex, Heading, Icon, SmartImage, SmartLink, Tag, Text } from '@/once-ui/components';
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
            fillWidth
            direction="column">
            <Flex
                style={{ left: '0', top: '50%', transform: 'translateY(-50%)' }}
                position="fixed"
                paddingLeft="24"
                direction="column"
                gap="8"
                hide="s">
                {structure.map((section, sectionIndex) => (
                    <Flex key={sectionIndex} gap="8" direction="column">
                        <Flex gap="8" alignItems="center">
                            <Flex height="1" width="24" background="neutral-strong"></Flex>
                            <Text onClick={() => scrollTo(section.title, 80)}>
                                {section.title}
                            </Text>
                        </Flex>
                        {section.items.map((item, itemIndex) => (
                            <Flex key={itemIndex} gap="8" alignItems="center">
                                <Flex height="1" width="24" background="neutral-strong"></Flex>
                                <Text onClick={() => scrollTo(item, 80)}>
                                    {item}
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
                ))}
            </Flex>
            <Flex
                mobileDirection="column">
                { person.avatar && (
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
                                {person.languages.map((language) => (
                                    <Tag
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
                    flex={9} maxWidth={40} direction="column">
                    <Flex
                        id={about.intro.title}
                        fillWidth minHeight="160"
                        direction="column" justifyContent="center"
                        marginBottom="32">
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
                    { about.intro && (
                        <Text
                            variant="body-default-l"
                            marginBottom="xl">
                            {about.intro.description}
                        </Text>
                    )}

                    { about.work && (
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
                                        key={index}
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
                                            {experience.achievements.map((achievement, i) => (
                                                <Text
                                                    as="li"
                                                    variant="body-default-m"
                                                    key={i}>
                                                    {achievement}
                                                </Text>
                                            ))}
                                        </Flex>
                                        {experience.images.length > 0 && (
                                            <Flex
                                                fillWidth paddingTop="m" paddingLeft="40" gap="12"
                                                wrap>
                                                {experience.images.map((image, i) => (
                                                    <Flex
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

                    { about.technical && (
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
                                        key={index}
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
                                                {skill.images.map((image, i) => (
                                                    <Flex
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