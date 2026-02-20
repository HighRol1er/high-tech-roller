import { Suspense } from 'react';
import { PostList } from '@/components/post-card';
import { supabase } from '@/lib/supabase';

const getAllPosts = async () => {
  try {
    const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });

    if (error) throw error;
    return data ?? [];
  } catch (error) {
    console.error('데이터베이스 조회 에러 (getAllPosts):', error);
    throw new Error('포스트 목록을 불러오는 중 문제가 발생했습니다.');
  }
};

export default async function Main() {
  const allPosts = await getAllPosts();

  return (
    <div className='max-w-7xl mx-auto'>
      <Suspense fallback={<div>포스트 목록을 불러오는 중...</div>}>
        <PostList allPosts={allPosts} />
      </Suspense>
    </div>
  );
}
