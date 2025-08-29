"use client";
import { useMemo, useState } from "react";
import { getPosts } from "@/utils/utils";
import { Card, Column, Grid, Heading, Input, Row, Select, SmartLink, Media, Text } from "@once-ui-system/core";

export function ProjectsGrid() {
  const all = getPosts(["src","app","work","projects"]);
  const [q, setQ] = useState("");
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const items = useMemo(() => {
    return all
      .filter(p => !onlyFeatured || (p.metadata as any).featured)
      .filter(p => !q || p.metadata.title.toLowerCase().includes(q.toLowerCase()))
      .sort((a,b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime());
  }, [all, q, onlyFeatured]);
  return (
    <Column gap="16">
      <Row gap="8" wrap>
        <Input label="Search" value={q} onChange={(e:any)=>setQ(e.target.value)} placeholder="Search projects..." />
        <Select label="Filter" value={onlyFeatured? 'featured':'all'} onChange={(v:any)=>setOnlyFeatured(v==='featured')} options={[{label:'All', value:'all'},{label:'Featured', value:'featured'}]} />
      </Row>
      <Grid columns="2" mobileColumns="1" gap="12">
        {items.map(p => (
          <Card key={p.slug} padding="12" radius="l">
            <Column gap="8">
              {p.metadata.images?.[0] && (
                <Media radius="m" aspectRatio="16 / 9" alt={p.metadata.title} src={p.metadata.images[0]} />
              )}
              <Heading as="h3" variant="heading-strong-m">{p.metadata.title}</Heading>
              <Text onBackground="neutral-weak">{p.metadata.summary}</Text>
              <SmartLink href={`/work/${p.slug}`}>View project</SmartLink>
            </Column>
          </Card>
        ))}
      </Grid>
    </Column>
  );
}

