import { notFound } from 'next/navigation'
import { CustomMDX } from '@/app/blog/components/mdx'
import { formatDate, getBlogPosts } from '@/app/blog/utils'
import { Flex, Heading, Text } from '@/once-ui/components'

export async function generateStaticParams() {
	let posts = getBlogPosts()

	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export function generateMetadata({ params }) {
	let post = getBlogPosts().find((post) => post.slug === params.slug)
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

export default function Blog({ params }) {
	let post = getBlogPosts().find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

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
			<Heading
				variant="display-strong-s">
				{post.metadata.title}
			</Heading>
			<Flex>
				<Text>
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