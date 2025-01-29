import { NextApiRequest, NextApiResponse } from 'next';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const getPosts = () => {
  const postsDir = path.join(process.cwd(), 'src', 'app', 'blog', 'posts');
  if (!fs.existsSync(postsDir)) {
    notFound();
  }

  const mdxFiles = fs.readdirSync(postsDir).filter((file) => path.extname(file) === '.mdx');
  
  return mdxFiles.map((file) => {
    const rawContent = fs.readFileSync(path.join(postsDir, file), 'utf-8');
    const { data, content } = matter(rawContent);

    return {
      metadata: {
        ...data,
      },
      slug: path.basename(file, path.extname(file)),
      content,
    };
  });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getPosts();
  res.status(200).json(posts);
}