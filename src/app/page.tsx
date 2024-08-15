import React from 'react';

import { getPosts } from '@/app/utils'
import { Heading, Flex, Text, Button,  Avatar } from '@/once-ui/components';
import { ProjectCard } from './components/ProjectCard';

import { home } from '@/app/resources'

export default function Home() {
	let allProjects = getPosts(['src', 'app', 'work', 'projects'])

	return (
		<Flex
			maxWidth="m" fillWidth gap="24"
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
					{allProjects
						.sort((a, b) => {
							if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
								return -1;
							}
							return 1;
						})
						.map((post) => (
							<ProjectCard
								key={post.slug}
								href={`/work/${post.slug}`}
								images={post.metadata.images}
								title={post.metadata.title}
								content={post.content}
								description={post.metadata.summary}
								avatars={post.metadata.team?.map(member => ({ src: member.avatar })) || []}
							/>
						))
					}
			</Flex>
		</Flex>
	);
}
