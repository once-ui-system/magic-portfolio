import {
    Avatar,
    Button,
    Column,
    Heading,
    Icon,
    IconButton,
    Media,
    Tag,
    Text,
    Meta,
    Schema,
    Row,
    RevealFx,
    Flex,
} from "@once-ui-system/core";
import { getDictionary } from "@/resources/content";
import { baseURL, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const { about } = getDictionary(locale);
    
    return Meta.generate({
        title: about.title,
        description: about.description,
        baseURL: baseURL,
        image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
        path: about.path,
    });
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const dict = getDictionary(locale);
    const { about, person } = dict;

    const structure = [
        {
            title: about.intro.title,
            display: about.intro.display,
            items: [],
        },
        {
            title: about.work.title,
            display: about.work.display,
            items: about.work.experiences.map((experience) => experience.company),
        },
        {
            title: about.studies.title,
            display: about.studies.display,
            items: about.studies.institutions.map((institution) => institution.name),
        },
        {
            title: about.technical.title,
            display: about.technical.display,
            items: about.technical.skills.map((skill) => skill.title),
        },
    ];
    return (
        <Column maxWidth="m" fillWidth style={{ padding: 0 }} s={{ paddingTop: '0' }}>
            <Schema
                as="webPage"
                baseURL={baseURL}
                title={about.title}
                description={about.description}
                path={about.path}
                image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
                author={{
                    name: person.name,
                    url: `${baseURL}${about.path}`,
                    image: `${baseURL}${person.avatar}`,
                }}
            />
            {about.tableOfContent.display && (
                <Column
                    left="0"
                    style={{ top: "50%", transform: "translateY(-50%)" }}
                    position="fixed"
                    paddingLeft="24"
                    gap="32"
                    s={{ hide: true }}
                    m={{ hide: true }}
                    l={{ hide: true }}
                >
                    <TableOfContents structure={structure} about={about} />
                </Column>
            )}

            <Row
                className="about-main-row"
                fillWidth
                gap="xl"
                s={{ direction: "column", horizontal: 'start', gap: '0', padding: '1rem' }}
                horizontal="center"
                vertical="start"
                background="surface"
                style={{
                    backdropFilter: 'blur(2.5px)',
                    padding: '2.5rem',
                    borderRadius: '1.5rem',
                    border: '1px solid var(--neutral-alpha-weak)'
                }}
            >
                {/* Left Column: Logo, Name, Tagline, Call Button (Sticky) */}
                <Column className="sticky-profile" flex={4} gap="16" vertical="start" s={{ horizontal: 'center' }}>
                    <RevealFx translateY="12" speed="slow" fillWidth horizontal="start" s={{ horizontal: 'center' }}>
                        <Column gap="16" fillWidth horizontal="start" s={{ horizontal: 'center' }} className="sticky-profile">
                            <div className="avatar-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content' }}>
                                <Avatar
                                    src={person.avatar}
                                    size="xl"
                                    className="dark-only"
                                    style={{ margin: 0, padding: 0, border: 'none' }}
                                />
                                <Avatar
                                    src="/images/logo_light.png"
                                    size="xl"
                                    className="light-only"
                                    style={{ margin: 0, padding: 0, border: 'none' }}
                                />
                            </div>

                            {person.languages && person.languages.length > 0 && (
                                <Row wrap gap="8" horizontal="start" s={{ horizontal: 'center' }} className="pill-tag-row">
                                    {person.languages.map((language, index) => (
                                        <span
                                            key={index}
                                            className="pill-tag"
                                            style={{
                                                padding: '4px 12px',
                                                borderRadius: '999px',
                                                fontSize: '0.85rem',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {language}
                                        </span>
                                    ))}
                                </Row>
                            )}

                            <Column gap="4" vertical="start" horizontal="start" s={{ horizontal: 'center' }}>
                                <Heading
                                    variant="display-strong-m"
                                    align="start"
                                    style={{
                                        fontSize: '2.5rem',
                                        lineHeight: '1.1',
                                        margin: 0,
                                        padding: 0,
                                        color: 'var(--neutral-on-background-strong)'
                                    }}
                                >
                                    {person.name}
                                </Heading>
                                <Text
                                    variant="body-default-l"
                                    align="start"
                                    onBackground="neutral-strong"
                                    style={{ margin: 0, padding: 0 }}
                                >
                                    {person.role}
                                </Text>
                            </Column>

                            {about.calendar.display && (
                                <Flex fillWidth horizontal="start" s={{ marginBottom: '0', horizontal: 'center' }}>
                                    <Button
                                        href={about.calendar.link}
                                        prefixIcon="calendar"
                                        variant="secondary"
                                        size="m"
                                        data-border="rounded"
                                        className="brand-outline-btn"
                                        style={{ width: 'fit-content' }}
                                    >
                                        Schedule a call
                                    </Button>
                                </Flex>
                            )}

                            {social.length > 0 && (
                                <Row
                                    paddingTop="8"
                                    gap="8"
                                    wrap
                                    fitWidth
                                    s={{ horizontal: 'center' }}
                                    data-border="rounded"
                                >
                                    {social
                                        .filter((item) => item.essential)
                                        .map(
                                            (item) =>
                                                item.link && (
                                                    <IconButton
                                                        size="l"
                                                        key={`${item.name}-icon`}
                                                        href={item.link}
                                                        icon={item.icon}
                                                        variant="secondary"
                                                    />
                                                ),
                                        )}
                                </Row>
                            )}
                        </Column>
                    </RevealFx>
                </Column>

                {/* Right Column: All scrolling content */}
                <Column flex={8} gap="80" className="about-intro-text-column">
                    {/* Intro Description */}
                    <RevealFx translateY="12" speed="slow">
                        <Column id={about.intro.title} vertical="start" style={{ marginTop: '-4px' }}>
                            {about.intro.display && about.intro.description}
                        </Column>
                    </RevealFx>

                    {/* Work Experience */}
                    {about.work.display && (
                        <RevealFx translateY="12" speed="slow" delay={0.2} fillWidth>
                            <Column fillWidth gap="40">
                                <Heading as="h2" id={about.work.title} variant="display-strong-s">
                                    {about.work.title}
                                </Heading>
                                <Column fillWidth gap="l">
                                    {about.work.experiences.map((experience, index) => (
                                        <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth gap="16" marginBottom="32">
                                            <Row fillWidth horizontal="between" vertical="center" marginBottom="4">
                                                <Row vertical="center" gap="8">
                                                    <Text id={experience.company} variant="heading-strong-l">
                                                        {experience.company}
                                                    </Text>
                                                    <Row vertical="center" gap="12">
                                                        {experience.linkedin && (
                                                            <a
                                                                href={experience.linkedin}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    textDecoration: "none",
                                                                    color: 'inherit'
                                                                }}
                                                            >
                                                                <Icon name="linkedin" size="s" onBackground="neutral-medium" />
                                                            </a>
                                                        )}
                                                        {experience.github && (
                                                            <a
                                                                href={experience.github}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    display: "inline-flex",
                                                                    alignItems: "center",
                                                                    textDecoration: "none",
                                                                    color: 'inherit'
                                                                }}
                                                            >
                                                                <Icon name="github" size="s" onBackground="neutral-medium" />
                                                            </a>
                                                        )}
                                                    </Row>
                                                </Row>
                                                <Text variant="heading-default-xs" onBackground="neutral-medium">
                                                    {experience.timeframe}
                                                </Text>
                                            </Row>
                                            <Text variant="body-default-s" onBackground="brand-strong">
                                                {experience.role}
                                            </Text>

                                            <Row fillWidth gap="xl" vertical="start" s={{ direction: "column", horizontal: "center" }}>
                                                {experience.images && experience.images.length > 0 && (
                                                    <Avatar
                                                        src={experience.images[0].src}
                                                        size="xl"
                                                        radius="full"
                                                        style={{
                                                            width: 240,
                                                            height: 240,
                                                            flexShrink: 0,
                                                            border: 'none',
                                                            borderRadius: '999px',
                                                            overflow: 'hidden'
                                                        }}
                                                    />
                                                )}
                                                <Column gap="16" flex={1}>
                                                    {experience.achievements.map((achievement: React.ReactNode, index: number) => (
                                                        <Text
                                                            as="p"
                                                            variant="body-default-m"
                                                            key={`${experience.company}-${index}`}
                                                        >
                                                            {achievement}
                                                        </Text>
                                                    ))}
                                                </Column>
                                            </Row>
                                        </Column>
                                    ))}
                                </Column>
                            </Column>
                        </RevealFx>
                    )}

                    {about.studies.display && (
                        <RevealFx translateY="12" speed="slow" delay={0.3} fillWidth>
                            <Column fillWidth gap="40">
                                <Heading as="h2" id={about.studies.title} variant="display-strong-s">
                                    {about.studies.title}
                                </Heading>
                                <Column fillWidth gap="l">
                                    {about.studies.institutions.map((institution, index) => (
                                        <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                                            <Text id={institution.name} variant="heading-strong-l">
                                                {institution.name}
                                            </Text>
                                            <Text variant="heading-default-xs" onBackground="neutral-medium">
                                                {institution.description}
                                            </Text>
                                        </Column>
                                    ))}
                                </Column>
                            </Column>
                        </RevealFx>
                    )}

                    {about.technical.display && (
                        <RevealFx translateY="12" speed="slow" delay={0.4} fillWidth>
                            <Column fillWidth gap="40">
                                <Heading
                                    as="h2"
                                    id={about.technical.title}
                                    variant="display-strong-s"
                                >
                                    {about.technical.title}
                                </Heading>
                                <Flex fillWidth direction="column" gap="40">
                                    {[
                                        { name: "AI & Data Science", items: ["Python", "R"] },
                                        { name: "Frontend", items: ["TypeScript", "Next.js", "TailwindCSS"] },
                                        { name: "Backend & Cloud", items: ["C#", "PostgreSQL", "MongoDB", "Vercel", "Linux", "Docker"] },
                                        { name: "Blockchain & Web3", items: ["Pact", "Solidity", "WalletConnect"] },
                                        { name: "Tools", items: ["Github", "Git"] }
                                    ].map((category) => {
                                        const categorySkills = about.technical.skills.filter(skill => category.items.includes(skill.title));
                                        if (categorySkills.length === 0) return null;
                                        return (
                                            <Column key={category.name} gap="24" fillWidth>
                                                <Text variant="heading-strong-m" onBackground="neutral-weak" style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                                    {category.name}
                                                </Text>
                                                <Flex gap="24" wrap horizontal="start" s={{ horizontal: 'center' }}>
                                                    {categorySkills.map((skill, index) => (
                                                        <a
                                                            key={`${skill.title}-${index}`}
                                                            href={skill.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{ textDecoration: 'none' }}
                                                        >
                                                            <Flex
                                                                padding="12"
                                                                radius="m"
                                                                background="neutral-alpha-weak"
                                                                border="neutral-alpha-weak"
                                                                center
                                                                className="stack-icon-container"
                                                                style={{
                                                                    width: '80px',
                                                                    height: '80px',
                                                                    transition: 'all 0.3s ease'
                                                                }}
                                                            >
                                                                {skill.images && skill.images.length > 0 && (
                                                                    <Media
                                                                        src={skill.images[0].src}
                                                                        alt={skill.images[0].alt}
                                                                        width={48}
                                                                        height={48}
                                                                        className="stack-icon"
                                                                    />
                                                                )}
                                                            </Flex>
                                                        </a>
                                                    ))}
                                                </Flex>
                                            </Column>
                                        );
                                    })}
                                </Flex>
                            </Column>
                        </RevealFx>
                    )}
                </Column>
            </Row>
        </Column>
    );
}
