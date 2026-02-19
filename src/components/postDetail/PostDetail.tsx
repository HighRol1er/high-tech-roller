'use client';

import type { Post } from '@/db/schema/post';
import { useMemo } from 'react';
import { Tags } from '@/components/post-card';
import { Agenda } from '@/components/postDetail';
import { ComponentConfig } from '@/components/postDetail/markdown';
import { Separator } from '@/components/ui/separator';
import { extractHeadings, formatDate } from '@/lib';
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

interface PostDetailProps {
  post: Post;
}

export function PostDetail({ post }: PostDetailProps) {
  // useEffect와 useState 대신 useMemo를 사용합니다.
  const headings = useMemo(() => {
    return extractHeadings(post.content);
  }, [post.content]);

  return (
    <article className='max-w-7xl mx-auto py-10 px-4 flex'>
      {/* 헤더 영역 */}
      <div className='flex-1'>
        <header className='space-y-4 mb-8'>
          <h1 className='text-4xl font-bold tracking-tight'>{post.title}</h1>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <span className='text-sm text-muted-foreground font-lora'>{formatDate(post.createdAt)}</span>
          </div>
          <div className='flex flex-wrap gap-2'>
            {post.tags.map((tag, i) => (
              <Tags key={i}>{tag}</Tags>
            ))}
          </div>
        </header>

        <Separator className='my-8' />

        {/* 본문 마크다운 렌더링 영역 */}
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
    </article>
  );
}
