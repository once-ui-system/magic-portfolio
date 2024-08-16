import { Flex, Heading } from '@/once-ui/components';
import { Mailchimp } from '@/app/components';
import { Posts } from '@/app/blog/components/Posts';

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
            <Posts range={[1,3]}/>
            <Posts range={[4]} direction="row"/>
            {mailchimp && (
                <Mailchimp/>
            )}
        </Flex>
    );
}