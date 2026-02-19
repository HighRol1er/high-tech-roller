import type { ReactNode } from 'react';
import { type ReactElement, isValidElement } from 'react';

export const extractText = (children: ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  } else if (isValidElement(children)) {
    const element = children as ReactElement<{ children?: ReactNode }>;
    const content = element.props.children;
    return typeof content === 'string' ? content : '';
  }
  return '';
};

export const slugify = (text: string): string => {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\sㄱ-ㅎ가-힣-]/g, '') // 한글, 영문, 숫자, 공백, 하이픈 제외 모두 제거
    .replace(/\s+/g, '-') // 공백 -> '-'
    .replace(/-+/g, '-'); // 연속된 하이픈 제거
  return slug;
};

export function formatDate(dateString: Date): string {
  const date = new Date(dateString);

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const year = date.getFullYear();
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();

  return `Posted on ${month} ${day}, ${year}`;
}

export interface Heading {
  level: number;
  text: string;
  id: string;
}

export const extractHeadings = (markdown: string): Heading[] => {
  const lines = markdown.split('\n');
  const headings: Heading[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugify(text);

      headings.push({ level, text, id });
    }
  }

  return headings;
};
