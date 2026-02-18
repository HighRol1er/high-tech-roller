import type { Components } from 'react-markdown';
import { Anchor } from './Anchor';
import { Blockquote } from './Blockquote';
import { Code } from './Code';
import { Heading1, Heading2, Heading3, Heading4 } from './Heading';
import { ListItem, OrderedList, UnorderedList } from './List';
import { MarkdownImage } from './MarkdownImage';
import { Paragraph } from './Paragraph';
import { PreformattedText } from './PreformattedText';
import { MarkdownTable, MarkdownTbody, MarkdownTd, MarkdownTh, MarkdownThead, MarkdownTr } from './Table';

export const ComponentConfig: Components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  p: Paragraph,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  code: Code,
  pre: PreformattedText,
  blockquote: Blockquote,
  a: Anchor,
  img: MarkdownImage,
  table: MarkdownTable,
  thead: MarkdownThead,
  tbody: MarkdownTbody,
  tr: MarkdownTr,
  th: MarkdownTh,
  td: MarkdownTd,
};
