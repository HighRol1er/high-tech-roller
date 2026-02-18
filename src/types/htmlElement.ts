import type { ComponentPropsWithoutRef } from 'react';
export type HeadingProps<T extends 'h1' | 'h2' | 'h3' | 'h4'> = ComponentPropsWithoutRef<T>;
export type ParagraphProps<T extends 'p'> = ComponentPropsWithoutRef<T>;
