import type { AdmonitionType } from './Admonition';
import type { ComponentPropsWithoutRef } from 'react';

import { Children, type ReactElement, type ReactNode, cloneElement, isValidElement } from 'react';
import { Admonition } from './Admonition';

const extractText = (node: ReactNode): string => {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return node.toString();

  if (Array.isArray(node)) {
    return node.map(extractText).join('');
  }

  if (isValidElement(node)) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    return extractText(element.props.children);
  }

  return '';
};

export const Blockquote = ({ children, className, ...props }: ComponentPropsWithoutRef<'blockquote'>) => {
  const allText = extractText(children);
  const match = /\[!(\w+)\]/.exec(allText);

  if (match) {
    const type = match[1].toLowerCase() as AdmonitionType;

    // props 에러 해결을 위한 타입 가드와 캐스팅
    const cleanChildren = Children.map(children, (child) => {
      if (isValidElement(child)) {
        // 1. child를 강제로 props가 있는 ReactElement 타입으로 정의
        const element = child as ReactElement<{ children?: ReactNode }>;

        return cloneElement(element, {
          // 2. element.props.children으로 안전하게 접근
          children: Children.map(element.props.children, (inner) => {
            if (typeof inner === 'string') {
              return inner.replace(/\[!\w+\]\s*/, '');
            }
            return inner; // 링크나 다른 태그는 그대로 보존
          }),
        });
      }
      return child;
    });
    return <Admonition type={type}>{cleanChildren}</Admonition>;
  }

  return (
    <blockquote
      {...props}
      className={`border-l-4 border-primary pl-4 italic my-4 text-muted-foreground ${className || ''}`}
    >
      {children}
    </blockquote>
  );
};
