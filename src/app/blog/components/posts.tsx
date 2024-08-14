import { formatDate, getBlogPosts } from '@/app/blog/utils'
import { Flex, Heading, SmartLink, Text } from '@/once-ui/components'

import styles from '@/app/blog/components/Posts.module.scss'

export function BlogPosts() {
    let allBlogs = getBlogPosts()

    return (
        <Flex
            fillWidth flex={1} justifyContent="flex-start"
            marginBottom="40"
            paddingX="l">
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
                <SmartLink style={{textDecoration: 'none', margin: '0', height: 'fit-content'}}
                    className={styles.hover}
                    key={post.slug}
                    href={`/blog/${post.slug}`}>
                    <Flex
                        position="relative"
                        paddingX="16" paddingY="12" gap="8"
                        direction="column" justifyContent="center">
                        <Flex
                            position="absolute"
                            className={styles.indicator}
                            width="20" height="2"
                            background="neutral-strong">
                        </Flex>
                        <Heading
                            as="h2">
                            {post.metadata.title}
                        </Heading>
                        <Text
                            variant="body-default-s"
                            onBackground="neutral-weak">
                            {formatDate(post.metadata.publishedAt, false)}
                        </Text>
                    </Flex>
                </SmartLink>
            ))}
        </Flex>
    )
}