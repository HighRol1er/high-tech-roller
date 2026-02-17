import { PostCard } from '@/components/post-card/PostCard';

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

export const PostList = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
      {MOCK_POSTS.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};
