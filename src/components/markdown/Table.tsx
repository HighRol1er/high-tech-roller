import type { ComponentPropsWithoutRef } from 'react';

export const MarkdownTable = ({ children, ...props }: ComponentPropsWithoutRef<'table'>) => (
  <div className='overflow-x-auto my-8 rounded-lg border border-border shadow-sm'>
    <table {...props} className='min-w-full border-collapse text-left'>
      {children}
    </table>
  </div>
);

export const MarkdownThead = ({ children, ...props }: ComponentPropsWithoutRef<'thead'>) => (
  <thead {...props} className='bg-muted/50 border-b border-border'>
    {children}
  </thead>
);

export const MarkdownTbody = ({ children, ...props }: ComponentPropsWithoutRef<'tbody'>) => (
  <tbody {...props} className='divide-y divide-border [&>tr]:transition-colors [&>tr]:hover:bg-muted/30'>
    {children}
  </tbody>
);

export const MarkdownTr = ({ children, ...props }: ComponentPropsWithoutRef<'tr'>) => <tr {...props}>{children}</tr>;

export const MarkdownTh = ({ children, ...props }: ComponentPropsWithoutRef<'th'>) => (
  <th {...props} className='px-6 py-4 text-sm font-bold text-foreground'>
    {children}
  </th>
);

export const MarkdownTd = ({ children, ...props }: ComponentPropsWithoutRef<'td'>) => (
  <td {...props} className='px-6 py-4 text-sm text-foreground/80 leading-relaxed'>
    {children}
  </td>
);
