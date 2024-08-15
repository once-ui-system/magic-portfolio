import { Flex } from '@/once-ui/components';
import { Projects } from '@/app/work/components/Projects';

export default function Work() {
    return (
        <Flex
			fillWidth maxWidth="m"
			direction="column">
            <Projects/>
        </Flex>
    );
}