'use client';

import { Grid } from "@/once-ui/components";
import { useSearchParams } from "next/navigation";
import Post from "./Post";
import { useEffect, useState } from "react";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  tag?: string;
}

export function Posts({ range, columns = "1", thumbnail = false, tag }: PostsProps) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams?.get("tag");
  
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filteredBlogs = selectedTag
    ? posts.filter((post: any) => post.metadata.tag?.includes(selectedTag))
    : posts;

  const sortedBlogs = filteredBlogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  return (
    <>
      {displayedBlogs.length > 0 && (
        <Grid columns={columns} mobileColumns="1" fillWidth marginBottom="40" gap="m">
          {displayedBlogs.map((post: any) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} />
          ))}
        </Grid>
      )}
    </>
  );
}