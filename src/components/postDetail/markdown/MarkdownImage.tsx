import type { ComponentPropsWithoutRef } from 'react';

interface MarkdownImgProps extends ComponentPropsWithoutRef<'img'> {
  node?: unknown;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export const MarkdownImage = ({ src, alt, className, node, ...props }: MarkdownImgProps) => {
  if (!src) return null;

  // alt 텍스트에서 이름과 높이 값을 분리합니다. (예: "스크린샷|300")
  const [altText, height] = (alt || '').split('|');

  const customStyle = {
    height: height ? `${height}px` : 'auto',
    width: 'auto', // 가로비율은 자동 유지
    maxWidth: '100%',
  };

  return (
    <div className='relative w-full my-8 flex justify-center'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        src={src}
        alt={altText}
        style={customStyle}
        className='rounded-lg object-contain'
        loading='lazy'
      />
    </div>
  );
};
