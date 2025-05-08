import { baseURL } from "@/app/resources"
import { about, home, newsletter, person } from "@/app/resources/content"
import { Mailchimp } from "@/components"
import { Projects } from "@/components/work/Projects"
import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  RevealFx,
  Text,
} from "@/once-ui/components"
import { Meta, Schema } from "@/once-ui/modules"

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
  })
}

export default function Home() {
  return (
    <Column maxWidth='m' gap='xl' horizontal='center'>
      <Schema
        as='webPage'
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}/og?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth paddingY='24' gap='m'>
        <Column maxWidth='s'>
          <RevealFx
            translateY='4'
            fillWidth
            horizontal='start'
            paddingBottom='16'
          >
            <Heading wrap='balance' variant='display-strong-l'>
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx
            translateY='8'
            delay={0.2}
            fillWidth
            horizontal='start'
            paddingBottom='32'
          >
            <Text
              wrap='balance'
              onBackground='neutral-weak'
              variant='heading-default-xl'
            >
              {home.subline}
            </Text>
          </RevealFx>
          <RevealFx
            paddingTop='12'
            delay={0.4}
            horizontal='start'
            paddingLeft='12'
          >
            <Button
              id='about'
              data-border='rounded'
              href={about.path}
              variant='secondary'
              size='m'
              arrowIcon
            >
              <Flex gap='8' vertical='center'>
                {about.avatar.display && (
                  <Avatar
                    style={{ marginLeft: "-0.75rem", marginRight: "0.25rem" }}
                    src={person.avatar}
                    size='m'
                  />
                )}
                {about.title}
              </Flex>
            </Button>
          </RevealFx>
        </Column>
      </Column>
      <RevealFx translateY='16' delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>
      <Projects range={[2]} />
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  )
}
