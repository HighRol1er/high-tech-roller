import type { ComponentPropsWithoutRef } from 'react';

export const Anchor = ({ children, className, href, ...props }: ComponentPropsWithoutRef<'a'>) => {
  // 1. 내부 링크 여부 확인 (/, #으로 시작하거나 현재 도메인인 경우)
  const isInternal = href?.startsWith('/') || href?.startsWith('#');

  return (
    <a
      {...props}
      href={href}
      className={`text-blue-500 font-medium hover:text-blue-600 hover:underline transition-colors underline-offset-4 ${className || ''}`}
      target={isInternal ? undefined : '_blank'}
      rel={isInternal ? undefined : 'noopener noreferrer'}
    >
      {children}
    </a>
  );
};
