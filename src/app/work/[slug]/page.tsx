import { notFound } from 'next/navigation'
import { CustomMDX } from '@/app/components/mdx'
import { formatDate, getPosts } from '@/app/utils'
import { Avatar, AvatarGroup, Button, Flex, Heading, SmartImage, Text } from '@/once-ui/components'

import { person } from '@/app/resources/content'

interface WorkParams {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
	let posts = getPosts(['src', 'app', 'work', 'projects']);

	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export function generateMetadata({ params }: WorkParams) {
	let post = getPosts(['src', 'app', 'work', 'projects']).find((post) => post.slug === params.slug)
	if (!post) {
		return
	}

	let {
		title,
		publishedAt: publishedTime,
		summary: description,
		image,
		team,
	} = post.metadata

	return {
		title,
		description,
		image,
		team,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
		},
	}
}

export default function Project({ params }: WorkParams) {
	let post = getPosts(['src', 'app', 'work', 'projects']).find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	const avatars = post.metadata.team?.map((person) => ({
        src: person.avatar,
    })) || [];

	return (
		<Flex as="section"
			fillWidth maxWidth={40}
			direction="column"
			gap="m">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post.metadata.title,
						datePublished: post.metadata.publishedAt,
						dateModified: post.metadata.publishedAt,
						description: post.metadata.summary,
						author: {
						'@type': 'Person',
						name: 'My Portfolio',
						},
					}),
				}}
			/>
			<Button
				href="/work"
				variant="tertiary"
				size="s"
				prefixIcon="chevronLeft">
				All works
			</Button>
			<Heading
				variant="display-strong-s">
				{post.metadata.title}
			</Heading>
			<SmartImage
				aspectRatio="16 / 9"
				radius="m"
				src={post.metadata.image}/>
			<Flex
				gap="12"
				alignItems="center">
				{ post.metadata.team && (
					<AvatarGroup
						avatars={avatars}
						size="m"
					/>
				)}
				<Text
					variant="body-default-s"
					onBackground="neutral-weak">
					{formatDate(post.metadata.publishedAt)}
				</Text>
			</Flex>
			<Flex
				as="article"
				direction="column"
				fillWidth>
				<CustomMDX source={post.content} />
			</Flex>
		</Flex>
	)
}