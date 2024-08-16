import React from 'react';

import { getPosts } from '@/app/utils'
import { Heading, Flex, Text, Button,  Avatar } from '@/once-ui/components';
import { Projects } from '@/app/work/components/Projects';

import { home } from '@/app/resources'
import { Mailchimp } from './components';
import { Posts } from './blog/components/Posts';

export default function Home() {
	return (
		<Flex
			maxWidth="m" fillWidth gap="24"
			direction="column" alignItems="center">
			<Flex
				fillWidth
				direction="column"
				marginBottom="l"
				gap="m">
				<Heading
					wrap="balance"
					variant="display-strong-l">
					{home.headline}
				</Heading>
				<Text
					wrap="balance" 
					onBackground="neutral-weak"
					variant="body-default-l">
					{home.subline}
				</Text>
				<Button
					data-border="rounded"
					href="/about"
					variant="tertiary"
					suffixIcon="chevronRight"
					size="m">
					<Flex
						gap="8"
						alignItems="center">
						<Avatar
							style={{marginLeft: '-0.25rem'}}
							src="/images/avatar.png"
							size="xs"/>
						About me
					</Flex>
				</Button>
			</Flex>
			<Projects range={[1,1]}/>
			<Posts range={[1,2]} direction="row"/>
			<Projects range={[2]}/>
			<Mailchimp/>
		</Flex>
	);
}
