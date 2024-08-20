import React from 'react';

import { Heading, Flex, Text, Button,  Avatar } from '@/once-ui/components';
import { Projects } from '@/app/work/components/Projects';

import { about, baseURL, home, person, routes } from '@/app/resources'
import { Mailchimp } from '@/app/components';
import { Posts } from '@/app/blog/components/Posts';

export function generateMetadata() {
	const title = home.title;
	const description = home.description;
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/blog`,
			images: [
				{
					url: ogImage,
					alt: title,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}

export default function Home() {
	return (
		<Flex
			maxWidth="m" fillWidth gap="24"
			direction="column" alignItems="center">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'WebPage',
						name: home.title,
						description: home.description,
						url: `https://${baseURL}`,
						image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
						publisher: {
							'@type': 'Person',
							name: person.name,
							image: {
								'@type': 'ImageObject',
								url: `${baseURL}/images/avatar.png`,
							},
						},
					}),
				}}
			/>
			<Flex
				fillWidth
				direction="column"
				marginBottom="l"
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
						{about.avatar.display && (
							<Avatar
								style={{marginLeft: '-0.25rem'}}
								src="/images/avatar.png"
								size="xs"/>
							)}
							About me
					</Flex>
				</Button>
			</Flex>
			<Projects range={[1,1]}/>
			{routes['/blog'] && (
				<Flex fillWidth paddingX="20">
					<Posts range={[1,2]} columns="2"/>
				</Flex>
			)}
			<Projects range={[2]}/>
			<Mailchimp/>
		</Flex>
	);
}
