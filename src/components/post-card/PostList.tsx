'use client';

import type { PostSummary } from '@/types';

import { useSearchParams } from 'next/navigation';
import { PostCard } from '@/components/post-card/PostCard';
import { slugify } from '@/lib';

export const PostList = ({ allPosts }: { allPosts: PostSummary[] }) => {
  const searchParams = useSearchParams();
  const tagParam = searchParams.get('tag');

  const filteredByTag = tagParam
    ? allPosts.filter((p) => p.tags.some((tag) => slugify(tag) === tagParam.toLowerCase()))
    : allPosts;

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {filteredByTag.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
