import type { ComponentPropsWithoutRef } from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check, FileCode } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Code = ({ children, className }: ComponentPropsWithoutRef<'code'>) => {
  const [copied, setCopied] = useState(false);

  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const fileName = className?.includes(':') ? className.split(':')[1] : '';
  const isInline = !className || !match;

  // 2. 텍스트 추출 (복사 및 하이라이트용)
  const codeString = String(children).replace(/\n$/, '');

  if (isInline) {
    return (
      <code className='bg-muted px-1.5 py-0.5 rounded font-jetbrains-mono text-[13px] leading-[1.2] font-semibold'>
        {children}
      </code>
    );
  }

  // 복사 핸들러
  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const myCustomTheme = {
    ...oneDark,
    comment: {
      ...oneDark['comment'],
      fontStyle: 'italic',
    },
    keyword: {
      ...oneDark['keyword'],
      fontStyle: 'italic',
    },
    string: {
      ...oneDark['string'],
      // 문자열은 똑바로 세우고 싶다면 normal
      fontStyle: 'normal',
    },
  };

  // full code block >>> ``` { ...} ```
  return (
    <div className='relative'>
      {/* --- 코드 헤더 영역 --- */}
      {fileName && (
        <div className='flex items-center justify-between px-4 py-2 bg-[#21252b] border-b border-[#181a1f]'>
          <div className='flex items-center gap-2'>
            <FileCode size={14} className='text-blue-400' />
            <span className='text-xs font-mono text-gray-400 select-none'>{fileName}</span>
          </div>

          {/* 복사 버튼을 헤더 우측으로 이동 (공간 효율성) */}
          <Button
            size='sm'
            variant='ghost'
            onClick={handleCopy}
            className='h-7 px-2 text-gray-400 hover:text-white hover:bg-[#3a3f4a] transition-colors'
          >
            {copied ? (
              <div className='flex items-center gap-1.5 text-green-500'>
                <Check size={14} />
                <span className='text-[10px]'>Copied!</span>
              </div>
            ) : (
              <div className='flex items-center gap-1.5'>
                <Copy size={14} />
                <span className='text-[10px]'>Copy</span>
              </div>
            )}
          </Button>
        </div>
      )}

      {/* 헤더가 없을 때만 복사 버튼을 코드 우측 상단에 띄움 */}
      {!fileName && (
        <Button
          size='icon'
          variant='outline'
          onClick={handleCopy}
          className='absolute top-2 right-2 z-10 p-2 rounded-md bg-[#2d3139] border-none hover:bg-[#3a3f4a] text-gray-300 transition-colors'
        >
          {copied ? <Check size={16} className='text-green-500' /> : <Copy size={16} />}
        </Button>
      )}

      <SyntaxHighlighter
        language={language}
        style={myCustomTheme}
        PreTag='div'
        showLineNumbers
        lineNumberStyle={{
          borderRight: '1px solid',
          marginRight: '1em',
          display: 'inline-block',
        }}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '13px',
          lineHeight: '1.2',
        }}
        codeTagProps={{
          style: {
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: '13px',
            lineHeight: '1.3',
          },
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};
