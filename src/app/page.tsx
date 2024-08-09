"use client";

import React from 'react';

import { Heading, Flex, Text, Button, SmartImage, Avatar } from '@/once-ui/components';
import { home } from '@/app/resources'

export default function Home() {
	return (
		<Flex
			fillWidth gap="24"
			direction="column">
			<Flex
				fillWidth
				maxWidth={64}
				direction="column"
				gap="m">
				<Heading
					wrap="balance"
					variant="display-strong-l">
					{home.headline}
				</Heading>
				<Text
					wrap="balance" 
					onBackground="neutral-weak"
					variant="body-default-l">
					{home.subline}
				</Text>
				<Button
					data-border="rounded"
					href="/about"
					variant="tertiary"
					suffixIcon="chevronRight"
					size="m">
					<Flex
						gap="8"
						alignItems="center">
						<Avatar
							style={{marginLeft: '-0.25rem'}}
							src="/images/avatar.png"
							size="xs"/>
						About me
					</Flex>
				</Button>
			</Flex>
			<Flex
				fillWidth paddingTop="l" gap="m">
				<SmartImage
					radius="l"
					alt="Project 1"
					aspectRatio="1 / 1"
					src="/images/projects/project-01/cover.jpg"/>
				<SmartImage
					radius="l"
					alt="Project 1"
					aspectRatio="1 / 1"
					src="/images/projects/project-01/cover.jpg"/>
			</Flex>
		</Flex>
	);
}
