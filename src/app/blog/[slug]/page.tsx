import { notFound } from 'next/navigation'
import { CustomMDX } from '@/app/components/mdx'
import { formatDate, getPosts } from '@/app/utils'
import { Avatar, Button, Flex, Heading, Text } from '@/once-ui/components'

import { person } from '@/app/resources/content'

interface BlogParams {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
	let posts = getPosts(['src', 'app', 'blog', 'posts'])

	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export function generateMetadata({ params }: BlogParams) {
	let post = getPosts().find((post) => post.slug === params.slug)
	if (!post) {
		return
	}

	let {
		title,
		publishedAt: publishedTime,
		summary: description,
	} = post.metadata

	return {
		title,
		description,
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

export default function Blog({ params }: BlogParams) {
	let post = getPosts(['src', 'app', 'blog', 'posts']).find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	return (
		<Flex as="section"
			fillWidth maxWidth="xs"
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
				href="/blog"
				variant="tertiary"
				size="s"
				prefixIcon="chevronLeft">
				Posts
			</Button>
			<Heading
				variant="display-strong-s">
				{post.metadata.title}
			</Heading>
			<Flex
				gap="12"
				alignItems="center">
				{ person.avatar && (
					<Avatar
						size="s"
						src={person.avatar}/>
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