import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] px-4 text-center'>
      <div className='bg-muted p-4 rounded-full mb-6'>
        <FileQuestion className='w-12 h-12 text-muted-foreground' />
      </div>

      <h2 className='text-3xl font-bold tracking-tight mb-2'>페이지를 찾을 수 없습니다</h2>
      <p className='text-muted-foreground mb-8'>존재하지 않거나 삭제된 페이지입니다. 주소를 다시 확인해 주세요.</p>

      <Button asChild variant='default' className='gap-2'>
        <Link href='/'>
          <Home className='w-4 h-4' />
          메인으로 돌아가기
        </Link>
      </Button>
    </div>
  );
}
