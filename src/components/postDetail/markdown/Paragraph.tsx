import type { ComponentPropsWithoutRef } from 'react';

export const Paragraph = ({ children, className, ...props }: ComponentPropsWithoutRef<'p'>) => {
  return (
    <p {...props} className={`mb-3 leading-7 ${className || ''}`}>
      {children}
    </p>
  );
};
