export const dynamic = 'force-static';
export const revalidate = false; // 빌드 타임에만 생성

import { Loader } from '@/components/common';
import { PostList } from '@/components/post-card';
// import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';

// const getAllPosts = async () => {
//   try {
//     const { data, error } = await supabase
//       .from('posts')
//       .select('id, title, tags, slug, created_at')
//       .order('created_at', { ascending: false });

//     if (error) throw error;

//     return data;
//   } catch (error) {
//     console.error('error', error);
//     return [];
//   }
// };

const getAllPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/posts?select=id,title,tags,slug,created_at&order=created_at.desc`,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
      cache: 'force-cache',
    },
  );

  if (!res.ok) {
    throw new Error('Get Post Error');
  }

  return res.json();
};

export default async function Main() {
  console.log('RENDERED AT:', new Date().toISOString());
  const allPosts = await getAllPosts();

  return (
    <div className='max-w-7xl mx-auto'>
      <Suspense fallback={<Loader />}>
        <PostList allPosts={allPosts} />
      </Suspense>
    </div>
  );
}
