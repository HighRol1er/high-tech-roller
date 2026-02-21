'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // SENTRY를 사용한 로깅 가능
    console.error('🚨 App Runtime Error:', error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] px-4 text-center'>
      <div className='bg-destructive/10 p-4 rounded-full mb-6'>
        <AlertCircle className='w-12 h-12 text-destructive' />
      </div>

      <h2 className='text-3xl font-bold tracking-tight mb-2'>문제가 발생했습니다!</h2>
      <p className='text-muted-foreground mb-8 max-w-md'>
        요청을 처리하는 동안 예기치 못한 에러가 발생했습니다. <br />
        잠시 후 다시 시도해 주세요.
      </p>

      <div className='flex gap-4'>
        <Button onClick={() => reset()} variant='default' className='gap-2'>
          <RefreshCcw className='w-4 h-4' />
          다시 시도
        </Button>
        <Button asChild variant='outline' className='gap-2'>
          <Link href='/'>
            <Home className='w-4 h-4' />
            홈으로 이동
          </Link>
        </Button>
      </div>

      {error.digest && <p className='mt-8 text-xs text-muted-foreground font-mono'>Error ID: {error.digest}</p>}
    </div>
  );
}
