import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), '_posts');

export interface PostData {
  id?: string
  content?: string
  excerpt?: string
  [key: string]: any
}

export const getPostSlugs = () => {
  return fs.readdirSync(postsDirectory);
}

export const getPostData = (id: string) => {
  // Read markdown file as string
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    content: matterResult.content,
    excerpt: matterResult.excerpt,
    ...matterResult.data,
  } as PostData;
}

export const getAllPosts = (): PostData[] => {
  const allPostsData = getPostSlugs().map((slug) => slug.replace(/\.md$/, '')).map((slug) => getPostData(slug));
  // Sort posts by date
  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
}
