import { getPosts } from '@/utils/utils';
import { Grid } from '@once-ui-system/core';
import Post from './Post';

export function PlaybooksList() {
  const all = getPosts(['src','app','blog','posts']);
  const playbooks = all.filter(p => (p.metadata as any).tag === 'playbook')
    .sort((a,b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, 4);
  if (playbooks.length === 0) return null as any;
  return (
    <Grid columns="2" mobileColumns="1" fillWidth marginBottom="40" gap="12">
      {playbooks.map((post) => (
        <Post key={post.slug} post={post} thumbnail={false} />
      ))}
    </Grid>
  );
}

