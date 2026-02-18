'use client';

import { useRef, useState } from 'react';
import { ComponentConfig } from '@/components/postDetail/markdown';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { WriteTag, WriteTitle } from '@/components/write';
import { useGetout, useMarkdownEditor, useTagEditor } from '@/hooks';
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
        <Button className='absolute top-4 right-4'>POST</Button>
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
