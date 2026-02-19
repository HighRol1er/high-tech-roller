import { notFound } from 'next/navigation';
import { PostDetail } from '@/components/postDetail';
import { createClient } from '@/lib/supabase/server';
// import { db } from '@/db';
// import { posts } from '@/db/schema/post';
// import { eq } from 'drizzle-orm';

const getPost = async (decodedSlug: string) => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('posts').select('*').eq('slug', decodedSlug).single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Database Fetch Error:', error);
    throw new Error('데이터베이스에서 포스트를 가져오는 데 실패했습니다.');
  }
};
interface Slug {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Slug) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const post = await getPost(decodedSlug);

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} />;
}
