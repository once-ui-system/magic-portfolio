import { Flex, Heading } from '@/once-ui/components';
import { Mailchimp } from '@/app/components';
import { BlogPosts } from '@/app/blog/components/Posts';

import { blog } from '@/app/resources/content'
import { mailchimp } from '@/app/resources/config'

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