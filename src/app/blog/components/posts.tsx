import { formatDate, getPosts } from '@/app/utils';
import { Flex, Heading, SmartLink, Text } from '@/once-ui/components';
import styles from '@/app/blog/components/Posts.module.scss';

interface PostsProps {
    range?: [number] | [number, number];
    direction?: 'column' | 'row';
}

export function Posts({ range, direction = 'column' }: PostsProps) {
    let allBlogs = getPosts(['src', 'app', 'blog', 'posts']);

    const sortedBlogs = allBlogs.sort((a, b) => {
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
    });

    const displayedBlogs = range
        ? sortedBlogs.slice(
              range[0] - 1,
              range.length === 2 ? range[1] : sortedBlogs.length 
          )
        : sortedBlogs;

    return (
        <>
            { displayedBlogs.length > 1 && (
                <Flex
                    flex={1} direction={direction} justifyContent="flex-start"
                    fillWidth marginBottom="40" gap="m" paddingX="l">
                    {displayedBlogs.map((post) => (
                        <SmartLink
                            style={{
                                textDecoration: 'none',
                                margin: '0',
                                height: 'fit-content',
                            }}
                            className={styles.hover}
                            key={post.slug}
                            href={`/blog/${post.slug}`}>
                            <Flex
                                position="relative"
                                paddingX="16"
                                paddingY="12"
                                gap="8"
                                direction="column"
                                justifyContent="center">
                                <Flex
                                    position="absolute"
                                    className={styles.indicator}
                                    width="20"
                                    height="2"
                                    background="neutral-strong"
                                />
                                <Heading as="h2">{post.metadata.title}</Heading>
                                <Text variant="body-default-s" onBackground="neutral-weak">
                                    {formatDate(post.metadata.publishedAt, false)}
                                </Text>
                            </Flex>
                        </SmartLink>
                    ))}
                </Flex>
            )}
        </>
    );
}