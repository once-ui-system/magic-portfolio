import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { CustomMDX } from '@/components/mdx'
import { getPosts } from '@/app/utils/utils'
import { AvatarGroup, Button, Flex, Heading, SmartImage, Text } from '@/once-ui/components'
import { baseURL } from '@/app/resources'
import { person } from '@/app/resources/content'
import { formatDate } from '@/app/utils/formatDate'
import ScrollToHash from '@/components/ScrollToHash'

interface WorkParams {
	params: {
		slug: string
	}
}

interface PostMetadata {
	title: string
	publishedAt: string
	summary: string
	images: string[]
	image?: string
	team?: Array<{
		avatar: string
		name: string
	}>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	const posts = getPosts(['src', 'app', 'work', 'projects'])
	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export function generateMetadata({ params: { slug } }: WorkParams): Metadata {
	let post = getPosts(['src', 'app', 'work', 'projects']).find((post) => post.slug === slug)

	if (!post) {
		return {}
	}

	let { title, publishedAt: publishedTime, summary: description, image } = post.metadata as PostMetadata
	let ogImage = image ? `https://${baseURL}${image}` : `https://${baseURL}/og?title=${title}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://${baseURL}/work/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	}
}

export default function Project({ params }: WorkParams) {
	let post = getPosts(['src', 'app', 'work', 'projects']).find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	const metadata = post.metadata as PostMetadata
	const avatars = metadata.team?.map((person) => ({
		src: person.avatar,
	})) || []

	return (
		<Flex as="section" fillWidth maxWidth="m" direction="column" alignItems="center" gap="l">
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: metadata.title,
						datePublished: metadata.publishedAt,
						dateModified: metadata.publishedAt,
						description: metadata.summary,
						image: metadata.image
							? `https://${baseURL}${metadata.image}`
							: `https://${baseURL}/og?title=${metadata.title}`,
						url: `https://${baseURL}/work/${post.slug}`,
						author: {
							'@type': 'Person',
							name: person.name,
						},
					}),
				}}
			/>
			<Flex fillWidth maxWidth="xs" gap="16" direction="column">
				<Button href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
					Projects
				</Button>
				<Heading variant="display-strong-s">{metadata.title}</Heading>
			</Flex>
			{metadata.images.length > 0 && (
				<SmartImage
					priority
					aspectRatio="16 / 9"
					radius="m"
					alt="image"
					src={metadata.images[0]}
				/>
			)}
			<Flex style={{ margin: 'auto' }} as="article" maxWidth="xs" fillWidth direction="column">
				<Flex gap="12" marginBottom="24" alignItems="center">
					{metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
					<Text variant="body-default-s" onBackground="neutral-weak">
						{formatDate(metadata.publishedAt)}
					</Text>
				</Flex>
				<CustomMDX source={post.content} />
			</Flex>
			<ScrollToHash />
		</Flex>
	)
}