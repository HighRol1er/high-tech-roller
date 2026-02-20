'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ErrToast, SuccessToast } from '@/components/common';

export function useGetout() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ErrToast('Sry owenr only');
      router.push('/');
    }
    SuccessToast('Welcome');
  }, [router]);
}
