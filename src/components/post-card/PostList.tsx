import type { Post } from '@/db/schema/post';
import { PostCard } from '@/components/post-card/PostCard';

interface PostListProps {
  allPosts: Post[];
}

export const PostList = ({ allPosts }: PostListProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
