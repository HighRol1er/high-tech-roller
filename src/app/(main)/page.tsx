import { Loader } from '@/components/common';
import { PostList } from '@/components/post-card';
import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';

const getAllPosts = async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, tags, slug, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('error', error);
    return [];
  }
};

export default async function Main() {
  const allPosts = await getAllPosts();
  console.log(allPosts);

  return (
    <div className='max-w-7xl mx-auto'>
      <Suspense fallback={<Loader />}>
        <PostList allPosts={allPosts} />
      </Suspense>
    </div>
  );
}
