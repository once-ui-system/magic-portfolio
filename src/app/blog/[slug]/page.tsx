import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { getPosts } from '@/app/utils/utils'
import { AvatarGroup, Button, Flex, Heading, SmartImage, Text } from '@/once-ui/components'
import { baseURL } from '@/app/resources';
import { person } from '@/app/resources/content';
import { formatDate } from '@/app/utils/formatDate';
import ScrollToHash from '@/components/ScrollToHash';

interface BlogParams {
    params: {
        slug: string;
    };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const posts = getPosts(['src', 'app', 'blog', 'posts']);
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export function generateMetadata({ params: { slug } }: BlogParams) {
	let post = getPosts(['src', 'app', 'blog', 'posts']).find((post) => post.slug === slug)
	
	if (!post) {
		return
	}

	let {
		title,
		publishedAt: publishedTime,
		summary: description,
		images,
		image,
		team,
	} = post.metadata
	let ogImage = image
		? `https://${baseURL}${image}`
		: `https://${baseURL}/og?title=${title}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url: `https://${baseURL}/blog/${post.slug}`,
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

export default function Blog({ params }: BlogParams) {
	let post = getPosts(['src', 'app', 'blog', 'posts']).find((post) => post.slug === params.slug)

	if (!post) {
		notFound()
	}

	const avatars = post.metadata.team?.map((person) => ({
        src: person.avatar,
    })) || [];

	return (
		<Flex as="section"
			fillWidth maxWidth="xs"
			direction="column"
			gap="l">
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
						image: post.metadata.image
							? `https://${baseURL}${post.metadata.image}`
							: `https://${baseURL}/og?title=${post.metadata.title}`,
							url: `https://${baseURL}/blog/${post.slug}`,
						author: {
							'@type': 'Person',
							name: person.name,
						},
					}),
				}}
			/>
			<Button
				href="/blog"
				weight="default"
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
				{avatars.length > 0 && (
					<AvatarGroup
						size="s"
						avatars={avatars}
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
			<ScrollToHash />
		</Flex>
	)
}