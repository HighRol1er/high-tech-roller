import Image from 'next/image';
import { Tags, Title } from '@/components/post-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const MOCK_POSTS = [
  {
    id: 1,
    title:
      'Next.js 15 새로운 기능 살펴ㄹㄴㅇㄹㅇㄴㄹㄴㅇ보기fsdfsdfsdfsdfsdfsdslfjsdlfkjsdljfs 룬이러ㅣㄴ어리ㅏㄴ어런이러ㅣㄴㅇ러ㅣㄴ어ㅣ런이러ㅣㄴㅇ러ㅣfdsㄹㄴ워런아ㅣ런이라ㅓㄴ이',
    date: '2026-02-01',
    tags: ['Next.js', 'React', 'Web'],
    thumbnail: 'https://picsum.photos/seed/1/600/340',
  },
  {
    id: 2,
    title: 'Tailwind CSS v4 마이그레이션 가이드',
    date: '2026-02-05',
    tags: ['Tailwind', 'CSS'],
    thumbnail: 'https://picsum.photos/seed/2/600/340',
  },
  {
    id: 3,
    title: 'TypeScript 5.0 유틸리티 타입 정리',
    date: '2026-02-10',
    tags: ['TypeScript'],
    thumbnail: null,
  },
  {
    id: 4,
    title: 'shadcn/ui로 디자인 시스템 구축하기',
    date: '2026-02-15',
    tags: ['Design System'],
    thumbnail: null,
  },
];

export const PostCard = ({ post, index }: { post: (typeof MOCK_POSTS)[number]; index: number }) => {
  return (
    <Card className='w-full p-0 gap-0 group cursor-pointer h-75 sm:h-auto'>
      <div className='relative w-full aspect-video overflow-hidden rounded-t-md bg-muted'>
        {post.thumbnail ? (
          <Image
            fill
            src={post.thumbnail}
            alt={post.title}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-muted-foreground text-sm'>No Image</div>
        )}
      </div>

      <CardHeader className='p-2 pb-0'>
        <Title title={post.title} />
      </CardHeader>

      <CardContent className='space-y-2 p-2 pt-0'>
        <span className='text-sm text-muted-foreground'>{post.date}</span>
        <Separator className='' />
        <div className='flex flex-wrap gap-2'>
          {post.tags.map((tag, i) => (
            <Tags key={i}>{tag}</Tags>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
