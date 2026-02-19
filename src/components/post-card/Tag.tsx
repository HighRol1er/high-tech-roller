import { cn } from '@/lib/utils'; // shadcn 설정 경로에 따라 확인 필요

interface TagsProps {
  children: string;
  className?: string;
}
export const Tags = ({ children, className }: TagsProps) => {
  return (
    <span className={cn('text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground', className)}>
      {children}
    </span>
  );
};
