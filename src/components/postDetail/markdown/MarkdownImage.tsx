import type { ComponentPropsWithoutRef } from 'react';

interface MarkdownImgProps extends ComponentPropsWithoutRef<'img'> {
  node?: unknown;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export const MarkdownImage = ({ src, alt, className, node, ...props }: MarkdownImgProps) => {
  if (!src) return null;

  return (
    <div className='relative w-full my-8 flex justify-center'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props} // node가 구조 분해로 빠졌기 때문에 콘솔 경고가 뜨지 않습니다.
        src={src}
        alt={alt || ''}
        // 원본 비율 유지를 위해 h-auto와 max-w-full을 사용합니다.
        className={`rounded-lg h-auto max-w-full border border-border shadow-sm ${className || ''}`}
        loading='lazy' // 브라우저 네이티브 지연 로딩 활성화
      />
    </div>
  );
};
