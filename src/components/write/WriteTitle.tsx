import type { SetState } from '@/types';

interface WriteTitleProps {
  title: string;
  setTitle: SetState<string>;
}

export function WriteTitle({ title, setTitle }: WriteTitleProps) {
  return (
    <input
      type='text'
      placeholder='제목을 입력하세요'
      className='w-full text-2xl font-bold bg-transparent outline-none placeholder:text-muted-foreground'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
