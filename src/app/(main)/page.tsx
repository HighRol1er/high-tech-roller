import { PostList } from '@/components/post-card';
import { db } from '@/db';
import { posts } from '@/db/schema/post';
import { desc } from 'drizzle-orm';

export default async function Main() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return (
    <div className='max-w-7xl mx-auto'>
      <PostList allPosts={allPosts} />
    </div>
  );
}
