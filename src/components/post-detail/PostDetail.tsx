'use client';

import type { Post } from '@/db/schema/post';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Tags } from '@/components/post-card';
import { Agenda } from '@/components/post-detail';
import { ComponentConfig } from '@/components/markdown';
import { Separator } from '@/components/ui/separator';
import { extractHeadings, formatDate } from '@/lib';
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { useDesktop } from '@/hooks';

interface PostDetailProps {
  post: Post;
}

export function PostDetail({ post }: PostDetailProps) {
  const { isDesktop } = useDesktop();

  const headings = useMemo(() => {
    return extractHeadings(post.content);
  }, [post.content]);

  return (
    <motion.article
      layoutId={isDesktop ? `card-${post.slug}` : undefined}
      className='max-w-7xl mx-auto py-10 px-4 flex'
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className='flex-1'>
        <header className='space-y-4 mb-8'>
          <h1 className='text-4xl font-bold tracking-tight'>{post.title}</h1>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <span className='text-sm text-muted-foreground font-lora'>{formatDate(post.created_at)}</span>
          </div>
          <div className='flex flex-wrap gap-2'>
            {post.tags.map((tag, i) => (
              <Tags key={i}>{tag}</Tags>
            ))}
          </div>
        </header>

        <Separator className='my-8' />

        <div className='prose prose-slate dark:prose-invert max-w-none'>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={ComponentConfig}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
      <aside className='hidden lg:block w-64 shrink-0'>
        <Agenda headings={headings} />
      </aside>
    </motion.article>
  );
}
