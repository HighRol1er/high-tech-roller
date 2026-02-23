import type { Post } from '@/db/schema/post';
import { notFound } from 'next/navigation';
import { PostDetail } from '@/components/post-detail';
import { supabase } from '@/lib/supabase';

export async function generateStaticParams() {
  const { data: posts, error } = await supabase.from('posts').select('slug');

  if (error || !posts) {
    console.error('fetching Error');
    return [];
  }
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const getPost = async (decodedSlug: string): Promise<Post | null> => {
  try {
    const { data, error } = await supabase.from('posts').select('*').eq('slug', decodedSlug).single();

    if (error) throw error;
    return data as Post;
  } catch (error) {
    console.error('Database Fetch Error:', error);
    return null;
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
