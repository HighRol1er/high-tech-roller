'use client';

import { useRef, useState } from 'react';
import { ErrToast, SuccessToast } from '@/components/common';
import { ComponentConfig } from '@/components/markdown';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { WriteTag, WriteTitle } from '@/components/write';
import { useGetout, useMarkdownEditor, useTagEditor } from '@/hooks';
import { slugify } from '@/lib';
import { postSchema } from '@/types';
import 'katex/dist/katex.min.css';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export default function WritePage() {
  const [title, setTitle] = useState<string>('');
  const [markdown, setMarkdown] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useGetout();
  const editor = useMarkdownEditor(textareaRef, setMarkdown);
  const tagEditor = useTagEditor();

  const createPost = async () => {
    const postPayload = {
      title: title.trim(),
      content: markdown,
      tags: tagEditor.tags,
      slug: slugify(title),
    };

    const result = postSchema.safeParse(postPayload);

    if (!result.success) {
      ErrToast('모든 필드가 작성되어있지 않아요');
      return;
    }
    const validatedData = result.data;

    try {
      const response = await fetch('/api/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) throw new Error('저장에 실패했습니다.');

      SuccessToast('포스트가 등록되었습니다.');
      //TODO: REDRIECT 필요
    } catch (error) {
      console.error(error);
      ErrToast('포스트 등록에 실패했습니다.');
    }
  };

  return (
    <div className='h-screen w-full overflow-hidden flex flex-col'>
      <div className='relative p-6 space-y-4 border-b bg-card'>
        <WriteTitle title={title} setTitle={setTitle} />
        <WriteTag
          tagInput={tagEditor.tagInput}
          setTagInput={tagEditor.setTagInput}
          tags={tagEditor.tags}
          handleTagKeyDown={tagEditor.handleTagKeyDown}
          removeTag={tagEditor.removeTag}
        />
        <Button onClick={createPost} className='absolute top-4 right-4'>
          POST
        </Button>
      </div>

      <ResizablePanelGroup orientation='horizontal' className='flex-1'>
        <ResizablePanel defaultSize={50} minSize={20}>
          <div className='h-full w-full bg-card'>
            <textarea
              ref={textareaRef}
              className='w-full h-full p-6 resize-none focus:outline-none font-mono leading-normal text-sm'
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              onKeyDown={editor.handleKeyDown}
              onDragOver={editor.handleDragOver}
              onDragLeave={editor.handleDragLeave}
              onDrop={editor.handleDrop}
            />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50} minSize={20}>
          <div className='h-full p-8 overflow-y-auto bg-white dark:bg-zinc-950'>
            <div className='max-w-none'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                components={ComponentConfig}
                urlTransform={(url) => url}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
