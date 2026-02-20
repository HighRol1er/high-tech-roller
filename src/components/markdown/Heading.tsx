import type { ComponentPropsWithoutRef } from 'react';

import { slugify, extractText } from '@/lib';

type HeadingProps<T extends 'h1' | 'h2' | 'h3' | 'h4'> = ComponentPropsWithoutRef<T>;

export const Heading1 = ({ children, className, ...props }: HeadingProps<'h1'>) => {
  const id = slugify(extractText(children));
  return (
    <h1 {...props} id={id} className={`text-3xl font-bold mt-6 mb-4 ${className || ''}`}>
      {children}
    </h1>
  );
};

export const Heading2 = ({ children, className, ...props }: HeadingProps<'h2'>) => {
  const id = slugify(extractText(children));
  return (
    <h2 {...props} id={id} className={`text-2xl font-bold mt-6 mb-3 ${className || ''}`}>
      {children}
    </h2>
  );
};

export const Heading3 = ({ children, className, ...props }: HeadingProps<'h3'>) => {
  const id = slugify(extractText(children));
  return (
    <h3 {...props} id={id} className={`text-xl font-semibold mt-4 mb-2 ${className || ''}`}>
      {children}
    </h3>
  );
};

export const Heading4 = ({ children, className, ...props }: HeadingProps<'h4'>) => {
  const id = slugify(extractText(children));
  return (
    <h4 {...props} id={id} className={`text-lg font-semibold mt-4 mb-2 ${className || ''}`}>
      {children}
    </h4>
  );
};
