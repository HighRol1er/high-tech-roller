import type { Post } from '@/db/schema/post';
// import Image from 'next/image';
import { Tags, Title } from '@/components/post-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className='w-full p-0 gap-0 group cursor-pointer h-75 sm:h-auto'>
      <div className='relative w-full aspect-video overflow-hidden rounded-t-md bg-muted'>
        {/* {post.thumbnail ? (
          <Image
            fill
            src={""}
            alt={post.title}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        ) : ( */}
        <div className='w-full h-full flex items-center justify-center text-muted-foreground text-sm'>No Image</div>
        {/* )} */}
      </div>

      <CardHeader className='p-2 pb-0'>
        <Title title={post.title} />
      </CardHeader>

      <CardContent className='space-y-2 p-2 pt-0'>
        <span className='text-sm text-muted-foreground'>{formatDate(post.createdAt)}</span>
        <Separator />
        <div className='flex flex-wrap gap-2'>
          {post.tags.map((tag: string, i: number) => (
            <Tags key={i}>{tag}</Tags>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
