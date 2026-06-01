"use client";

import React, { useEffect, useState } from "react";
import { Flex, Column, Row, Heading, Text, Button, Icon } from "@once-ui-system/core";
import { social } from "@/resources";

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    language: string;
    updated_at: string;
    stargazers_count: number;
    forks_count: number;
}

export function LiveGithub() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch("https://api.github.com/users/mindsend-datatech/repos?sort=updated&per_page=4");
                if (response.ok) {
                    const data = await response.json();
                    setRepos(data);
                }
            } catch (error) {
                console.error("Failed to fetch repos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const githubLink = social.find((s) => s.name === "GitHub")?.link || "https://github.com/mindsend-datatech";

    return (
        <Column fillWidth gap="32" paddingY="32" paddingX="l">
            <Row fillWidth horizontal="between" vertical="end" paddingX="l">
                <Column gap="8">
                    <Heading as="h2" variant="display-strong-s">
                        Live Status
                    </Heading>
                    <Row vertical="center" gap="8">
                        <div
                            style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: "var(--brand-solid-strong)",
                                boxShadow: "0 0 8px var(--brand-solid-strong)",
                                animation: "pulse 2s infinite"
                            }}
                        />
                        <Text variant="body-default-s" onBackground="neutral-weak">
                            Pulling live data from GitHub
                        </Text>
                    </Row>
                </Column>
                <Button
                    href={githubLink}
                    variant="secondary"
                    size="s"
                    suffixIcon="arrowUpRight"
                >
                    View all
                </Button>
            </Row>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
        .github-card {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .github-card:hover {
          border-color: var(--brand-alpha-strong) !important;
          transform: translateY(-2px);
        }
      `}} />

            <Flex fillWidth gap="24" wrap paddingX="l" s={{ direction: "column" }}>
                {loading ? (
                    <Text variant="body-default-m" onBackground="neutral-weak">Loading repositories...</Text>
                ) : (
                    repos.map((repo) => (
                        <Flex
                            key={repo.id}
                            direction="column"
                            gap="16"
                            padding="24"
                            radius="l"
                            background="surface"
                            border="neutral-alpha-weak"
                            style={{ flex: "1 1 calc(50% - 24px)", minWidth: "280px" }}
                            className="github-card"
                            onClick={() => window.open(repo.html_url, '_blank')}
                        >
                            <Column gap="8" fillWidth>
                                <Row horizontal="between" vertical="center" fillWidth>
                                    <Text variant="heading-strong-m" onBackground="neutral-strong">
                                        {repo.name}
                                    </Text>
                                    <Icon name="github" size="s" onBackground="neutral-weak" />
                                </Row>
                                <Text variant="body-default-s" onBackground="neutral-weak" style={{ minHeight: "40px" }}>
                                    {repo.description || "No description provided."}
                                </Text>
                            </Column>
                            <Row gap="16" vertical="center" fillWidth>
                                {repo.language && (
                                    <Row gap="8" vertical="center">
                                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--brand-solid-strong)" }} />
                                        <Text variant="body-default-xs" onBackground="neutral-medium">{repo.language}</Text>
                                    </Row>
                                )}
                                <Row gap="4" vertical="center">
                                    <Text variant="body-default-xs" onBackground="neutral-medium">Updated {new Date(repo.updated_at).toLocaleDateString()}</Text>
                                </Row>
                            </Row>
                        </Flex>
                    ))
                )}
            </Flex>
        </Column>
    );
}
