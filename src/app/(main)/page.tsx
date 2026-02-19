import type { Post } from '@/db/schema/post';
import { AsciiArt } from '@/components/common';
import { PostList } from '@/components/post-card/PostList';

const domain = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

const fetchPosts = async () => {
  const response = await fetch(`${domain}/api/post`);
  if (!response.ok) throw new Error('불러오기 실패');

  const data: Post[] = await response.json();
  console.log(data);
  return data;
};

export default function Main() {
  const response = fetchPosts();
  return (
    <div className='max-w-7xl mx-auto'>
      <PostList />
      <PostList />
      <PostList />
    </div>
  );
}
