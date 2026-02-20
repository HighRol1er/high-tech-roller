import type { ComponentPropsWithoutRef } from 'react';

export const UnorderedList = ({ children, className, ...props }: ComponentPropsWithoutRef<'ul'>) => {
  return (
    <ul {...props} className={`list-disc list-outside mb-4 space-y-2 ml-6 ${className || ''}`}>
      {children}
    </ul>
  );
};

export const OrderedList = ({ children, className, ...props }: ComponentPropsWithoutRef<'ol'>) => {
  return (
    <ol {...props} className={`list-decimal list-outside mb-4 space-y-2 ml-6' ${className || ''}`}>
      {children}
    </ol>
  );
};

export const ListItem = ({ children, className, ...props }: ComponentPropsWithoutRef<'li'>) => {
  return (
    <li {...props} className={`leading-7 ${className || ''}`}>
      {children}
    </li>
  );
};
