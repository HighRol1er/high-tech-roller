'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // redirect 대신 useRouter
import { toast } from 'sonner';

export function useGetout() {
  const router = useRouter();

  useEffect(() => {
    // 테스트를 위해 development일 때 쫓아내는 로직 유지
    if (process.env.NODE_ENV === 'production') {
      toast.error('Sry, Owner Only', {
        style: {
          border: '1px solid #ef4444',
          color: '#ef4444',
        },
      });

      // 클라이언트 사이드 이동
      router.push('/');
    }
  }, [router]);
}
