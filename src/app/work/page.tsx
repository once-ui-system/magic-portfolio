import { Flex, Heading } from '@/once-ui/components';
import { work } from '@/app/resources/content'
import { Projects } from '@/app/work/components/Projects';

export default function Work() {
    return (
        <Flex
			fillWidth maxWidth="s"
			direction="column">
            <Projects/>
        </Flex>
    );
}