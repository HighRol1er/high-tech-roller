import type { ComponentPropsWithoutRef } from 'react';

export const PreformattedText = ({ children, className, ...props }: ComponentPropsWithoutRef<'pre'>) => {
  return (
    <pre {...props} className={`bg-muted rounded-lg overflow-x-auto mb-4 ${className || ''}`}>
      {children}
    </pre>
  );
};
