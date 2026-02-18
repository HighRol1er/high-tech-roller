'use client';

import { useState, useRef, useCallback } from 'react';
import { ComponentConfig } from '@/components/postDetail/markdown';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { WriteTag, WriteTitle } from '@/components/write';
import useGetout from '@/hooks/useGetout';
import 'katex/dist/katex.min.css';
import { useDropzone } from 'react-dropzone';
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

  useGetout();

  // 커서 위치에 텍스트 삽입
  const insertAtCursor = useCallback(
    (text: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newMarkdown = markdown.slice(0, start) + text + markdown.slice(end);

      setMarkdown(newMarkdown);

      // 삽입 후 커서 위치 조정
      requestAnimationFrame(() => {
        textarea.selectionStart = start + text.length;
        textarea.selectionEnd = start + text.length;
        textarea.focus();
      });
    },
    [markdown],
  );

  // 이미지 드롭 처리
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        if (!file.type.startsWith('image/')) return;

        const objectUrl = URL.createObjectURL(file);
        const filename = file.name.replace(/\.[^.]+$/, ''); // 확장자 제거

        // const markdownImage = `![${filename}](${objectUrl})\n`;
        const markdownImage = `\n![${filename}|300](${objectUrl})\n`;

        insertAtCursor(markdownImage);
      });
    },
    [insertAtCursor],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,

    accept: { 'image/*': [] },
    noClick: true, // 클릭으로 파일 선택은 막기 (textarea 클릭과 충돌)
  });

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
      {/* 제목, 태그 */}
      <div className='p-6 space-y-4 border-b bg-card'>
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
        {/* 왼쪽: 마크다운 편집기 영역 */}
        <ResizablePanel defaultSize={50} minSize={20}>
          <div
            {...getRootProps()}
            className={`h-full w-full bg-card relative transition-colors ${
              isDragActive ? 'ring-2 ring-inset ring-blue-400 bg-blue-50 dark:bg-blue-950/20' : ''
            }`}
          >
            <input {...getInputProps()} style={{ display: 'none' }} /> {/* 드래그 오버레이 */}
            <textarea
              ref={textareaRef}
              className='w-full h-full p-6 resize-none focus:outline-none font-mono leading-normal text-sm'
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
            <div className='max-w-none'>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, rehypeKatex]}
                components={ComponentConfig}
                urlTransform={(url) => url} // ← URL 필터링 비활성화
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
