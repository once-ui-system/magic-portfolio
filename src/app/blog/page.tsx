import { Flex, Heading } from '@/once-ui/components';
import { blog } from '@/app/resources/content'
import { BlogPosts } from '@/app/blog/components/posts';

export default function Blog() {
    return (
        <Flex
			fillWidth maxWidth="s"
			direction="column">
            <Heading
                variant="display-strong-s">
                {blog.title}
            </Heading>
            <BlogPosts/>
        </Flex>
    );
}