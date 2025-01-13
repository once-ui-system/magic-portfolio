import { Metadata } from 'next'
import { Flex } from "@/once-ui/components"
import MasonryGrid from "@/components/gallery/MasonryGrid"
import { baseURL } from "@/app/resources"
import { gallery, person } from "@/app/resources/content"

interface GalleryImage {
	src: string
	alt: string
}

interface GalleryContent {
	title: string
	description: string
	images: GalleryImage[]
}

// Type assertion for gallery content
const typedGallery = gallery as GalleryContent

export async function generateMetadata(): Promise<Metadata> {
	const title = typedGallery.title
	const description = typedGallery.description
	const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'website',
			url: `https://${baseURL}/gallery`,
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
	}
}

export default function Gallery() {
	return (
		<Flex fillWidth>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'ImageGallery',
						name: typedGallery.title,
						description: typedGallery.description,
						url: `https://${baseURL}/gallery`,
						image: typedGallery.images.map((image) => ({
							'@type': 'ImageObject',
							url: `${baseURL}${image.src}`,
							description: image.alt,
						})),
						author: {
							'@type': 'Person',
							name: person.name,
							image: {
								'@type': 'ImageObject',
								url: `${baseURL}${person.avatar}`,
							},
						},
					}),
				}}
			/>
			<MasonryGrid />
		</Flex>
	)
}