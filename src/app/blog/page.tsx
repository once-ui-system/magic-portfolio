import { Flex, Heading } from '@/once-ui/components';
import { BlogPosts } from '@/app/blog/components/Posts';
import { blog } from '@/app/resources/content'
import { mailchimp } from '@/app/resources/config'
import { Mailchimp } from './components/Mailchimp';

export default function Blog() {


    return (
        <Flex
			fillWidth maxWidth="s"
			direction="column">
            <Heading
                marginBottom="l"
                variant="display-strong-s">
                {blog.title}
            </Heading>
            <BlogPosts/>
            {mailchimp && (
                <Mailchimp/>
            )}
        </Flex>
    );
}