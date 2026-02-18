'use client';

import { useState } from 'react';
import { ComponentConfig } from '@/components/postDetail/markdown';
import { Badge } from '@/components/ui/badge';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import useGetout from '@/hooks/useGetout';
import 'katex/dist/katex.min.css';
import { X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export default function WritePage() {
  const [title, setTitle] = useState<string>('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [markdown, setMarkdown] = useState<string>('');

  useGetout();

  // 태그 입력 핸들러 (Enter 입력 시 추가)
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  // 태그 삭제 핸들러
  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className='h-screen w-full overflow-hidden flex flex-col'>
      <div className='p-6 space-y-4 border-b bg-card'>
        <input
          type='text'
          placeholder='제목을 입력하세요'
          className='w-full text-2xl font-bold bg-transparent outline-none placeholder:text-muted-foreground'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className='flex flex-wrap items-center gap-2'>
          {tags.map((tag, index) => (
            <Badge key={index} variant='secondary' className='px-3 py-1 text-sm gap-1 flex items-center'>
              {tag}
              <X className='w-3 h-3 cursor-pointer hover:text-destructive' onClick={() => removeTag(index)} />
            </Badge>
          ))}
          <input
            type='text'
            placeholder='태그를 입력하세요 (Enter)'
            className='flex-1 min-w-50 bg-transparent outline-none text-lg text-muted-foreground'
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
        </div>
      </div>

      <ResizablePanelGroup orientation='horizontal' className='flex-1'>
        {/* 왼쪽: 마크다운 편집기 영역 */}
        <ResizablePanel defaultSize={50} minSize={20}>
          <div className='h-full w-full bg-card'>
            <textarea
              className='w-full h-full p-6 resize-none focus:outline-none font-mono text-base leading-normal text-sm'
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder='마크다운으로 내용을 작성하세요...'
            />
          </div>
        </ResizablePanel>

        {/* 조절 핸들 (가운데 바) */}
        <ResizableHandle withHandle />

        {/* 오른쪽: 실시간 미리보기 영역 */}
        <ResizablePanel defaultSize={50} minSize={20}>
          <div className='h-full p-8 overflow-y-auto bg-white dark:bg-zinc-950'>
            <div className='prose prose-slate max-w-none dark:prose-invert'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                components={ComponentConfig}
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
