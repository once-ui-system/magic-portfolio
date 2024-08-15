import { getPosts } from '@/app/utils'
import { Flex } from '@/once-ui/components'

import { ProjectCard } from '@/app/components'

export function Projects() {
    let allProjects = getPosts(['src', 'app', 'work', 'projects'])

    return (
        <Flex
            fillWidth
            marginBottom="40" paddingX="l">
            {allProjects
                .sort((a, b) => {
                    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
                        return -1;
                    }
                    return 1;
                })
                .map((post) => (
                    <ProjectCard
                        key={post.slug}
                        href={`/work/${post.slug}`}
                        src={post.metadata.image}
                        title={post.metadata.title}
                        description={post.metadata.summary}
                        avatars={post.metadata.team?.map(member => ({ src: member.avatar })) || []}
                    />
                ))
            }
        </Flex>
    )
}