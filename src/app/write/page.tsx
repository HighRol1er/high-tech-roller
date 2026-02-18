'use client';

import { useState, useRef, useCallback } from 'react';
import { ComponentConfig } from '@/components/postDetail/markdown';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { WriteTag, WriteTitle } from '@/components/write';
import useGetout from '@/hooks/useGetout';
import 'katex/dist/katex.min.css';
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

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dragPositionRef = useRef<number>(0);

  useGetout();

  // Enter 키 → 줄 끝에 \ 추가 후 개행
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return;

    // Shift+Enter는 일반 개행으로 유지 (단락 구분용)
    if (e.shiftKey) return;

    e.preventDefault();

    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;

    // 현재 줄의 시작 위치 탐색
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const currentLine = value.slice(lineStart, start);

    // 빈 줄이거나 이미 \로 끝나면 그냥 개행 (단락 구분 / 연속 입력 방지)
    const insert = currentLine.trim() === '' || currentLine.endsWith('\\') ? '\n' : '\\\n';

    const newValue = value.slice(0, start) + insert + value.slice(end);
    setMarkdown(newValue);

    requestAnimationFrame(() => {
      const newPos = start + insert.length;
      textarea.setSelectionRange(newPos, newPos);
    });
  }, []);

  const handleTextareaDragLeave = useCallback((e: React.DragEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
  }, []);

  //마우스 좌표를 텍스트 인덱스로 변환
  const handleTextareaDragOver = useCallback((e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const textarea = textareaRef.current;
    if (!textarea) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((document as any).caretPositionFromPoint) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pos = (document as any).caretPositionFromPoint(e.clientX, e.clientY);
      dragPositionRef.current = pos.offset;
    } else if (document.caretRangeFromPoint) {
      const range = document.caretRangeFromPoint(e.clientX, e.clientY);
      dragPositionRef.current = range?.startOffset || 0;
    }

    textarea.setSelectionRange(dragPositionRef.current, dragPositionRef.current);
    textarea.focus();
  }, []);

  const handleTextareaDrop = useCallback((e: React.DragEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) return;

    const position = dragPositionRef.current;

    let insertText = '';
    files.forEach((file) => {
      const objectUrl = URL.createObjectURL(file);
      const filename = file.name.replace(/\.[^.]+$/, '');
      insertText += `\n![${filename}|300](${objectUrl})\n`;
    });

    setMarkdown((prev) => prev.slice(0, position) + insertText + prev.slice(position));

    // 상태 업데이트 후 커서 위치 조정
    setTimeout(() => {
      const textarea = textareaRef.current;
      if (textarea) {
        const newPos = position + insertText.length;
        textarea.setSelectionRange(newPos, newPos);
        textarea.focus();
      }
    }, 0);
  }, []);
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className='h-screen w-full overflow-hidden flex flex-col'>
      <div className='relative p-6 space-y-4 border-b bg-card'>
        <WriteTitle title={title} setTitle={setTitle} />
        <WriteTag
          tagInput={tagInput}
          setTagInput={setTagInput}
          tags={tags}
          handleTagKeyDown={handleTagKeyDown}
          removeTag={removeTag}
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
              onKeyDown={handleKeyDown}
              onDragOver={handleTextareaDragOver}
              onDragLeave={handleTextareaDragLeave}
              onDrop={handleTextareaDrop}
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
