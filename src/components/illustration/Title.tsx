import { cn } from '@/lib/utils';

interface TitleProps {
  title: string;
  underlnStyle?: string;
  titleStyle?: string;
}
export function Title({ title, underlnStyle = '', titleStyle = '' }: TitleProps) {
  return (
    <div
      className={cn('absolute top-3 left-4 z-20 flex flex-col leading-none font-eva-title', 'text-white', titleStyle)}
    >
      <span className='text-4xl'>{title}</span>
      <div className={`h-0.5 mt-1 rounded-full w-full ${underlnStyle}`} />
    </div>
  );
}
