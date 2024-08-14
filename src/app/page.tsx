"use client";

import React from 'react';

import { Heading, Flex, Text, Button, SmartImage, Avatar, IconButton } from '@/once-ui/components';
import { home } from '@/app/resources'
import { ProjectCard } from './components/ProjectCard';

export default function Home() {
	return (
		<Flex
			maxWidth={56}
			fillWidth gap="24"
			direction="column" alignItems="center">
			<Flex
				fillWidth
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
				position="relative"
				direction="column"
				fillWidth paddingTop="l" gap="m">
				<ProjectCard/>
				<ProjectCard/>
			</Flex>
		</Flex>
	);
}
