import { notFound } from 'next/navigation';
import { PostDetail } from '@/components/postDetail';
import { db } from '@/db';
import { posts } from '@/db/schema/post';
import { eq } from 'drizzle-orm';
import 'katex/dist/katex.min.css';

interface Slug {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Slug) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  // 데이터 페칭
  const post = await db.query.posts.findFirst({
    where: eq(posts.slug, decodedSlug),
  });

  // 데이터가 없으면 즉시 404 처리
  if (!post) {
    notFound();
  }

  // 렌더링 컴포넌트로 데이터 전달
  return <PostDetail post={post} />;
}
