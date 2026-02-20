import type { ComponentPropsWithoutRef } from 'react';

interface ParagraphProps extends ComponentPropsWithoutRef<'p'> {
  node?: {
    children?: { type: string; tagName?: string }[];
  };
}

export const Paragraph = ({ children, className, node, ...props }: ParagraphProps) => {
  const hasImage = node?.children?.some(
    (child) => child.tagName === 'img', // ← type: 'image' 가 아니라 tagName: 'img'
  );

  if (hasImage) {
    return <>{children}</>;
  }

  return (
    <p {...props} className={`mb-3 leading-7 ${className || ''}`}>
      {children}
    </p>
  );
};
