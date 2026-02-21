'use client';

import type { PostSummary } from '@/types';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Tags, Title, Thumbnail, DateStat } from '@/components/post-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib';
import { useDesktop } from '@/hooks';

export const PostCard = ({ post }: { post: PostSummary }) => {
  const router = useRouter();
  const { isDesktop } = useDesktop();

  return (
    <motion.div
      layoutId={isDesktop ? `card-${post.slug}` : undefined}
      onClick={() => router.push(`post/${post.slug}`)}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className='cursor-pointer'
    >
      <Card className='w-full p-0 gap-0 group h-75 sm:h-auto border-2 overflow-hidden'>
        <div className='relative w-full aspect-video overflow-hidden rounded-t-md bg-muted'>
          <Thumbnail tags={post.tags} />
        </div>

        <CardHeader className='p-2 pb-0'>
          <Title title={post.title} />
        </CardHeader>
        <CardContent className='space-y-2 p-2 pt-0'>
          <DateStat date={formatDate(post.created_at)} />
          <Separator />
          <div className='flex items-center gap-2 overflow-hidden whitespace-nowrap'>
            {post.tags.map((tag: string, i: number) => (
              <Tags key={i} className='shrink-0'>
                {tag}
              </Tags>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
