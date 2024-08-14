import { formatDate, getBlogPosts } from '@/app/blog/utils'
import { Flex, Heading, SmartLink, Text } from '@/once-ui/components'

export function BlogPosts() {
    let allBlogs = getBlogPosts()

    return (
        <Flex>
            {allBlogs
                .sort((a, b) => {
                    if (
                        new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
                    ) {
                        return -1
                    }
                    return 1
                })
            .map((post) => (
                <SmartLink
                    key={post.slug}
                    href={`/blog/${post.slug}`}>
                    <Flex
                        paddingX="16"
                        paddingY="12"
                        direction="column">
                        <Heading
                            as="h2">
                            {post.metadata.title}
                        </Heading>
                        <Text>
                            {formatDate(post.metadata.publishedAt, false)}
                        </Text>
                    </Flex>
                </SmartLink>
            ))}
        </Flex>
    )
}