import { Column, Heading, Meta, Schema, Grid } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, newsletter } from "@/resources";

import { getDictionary } from "@/resources/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const { blog } = getDictionary(locale);

  return Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
}

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary(locale);
  const { blog, person } = dict;
  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail aspectRatio="original" locale={locale} />
        <Grid columns={2} s={{ columns: 1 }} gap="16" fillWidth>
            <Posts range={[2, 2]} thumbnail marginBottom="0" imageHeight="140px" locale={locale} />
            <Column gap="16">
                <Posts range={[3, 3]} marginBottom="0" locale={locale} />
                <Posts range={[4, 4]} marginBottom="0" locale={locale} />
            </Column>
        </Grid>
        <Mailchimp marginBottom="l" />
        <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
          Earlier posts
        </Heading>
        <Posts range={[5]} columns="1" direction="row" locale={locale} />
      </Column>
    </Column>
  );
}
