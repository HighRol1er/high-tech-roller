'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  const pathname = usePathname().slice(1);
  const formatPath = pathname.charAt(0).toUpperCase() + pathname.slice(1).toLowerCase();

  return (
    <header className='flex w-full items-center h-16 pl-2 sticky top-0 bg-background/50 backdrop-blur-sm z-10'>
      <SidebarTrigger />
      {/* TODO: 해당 pathname 개별 title 컴포넌트로 빼버리기  */}
      <h1 className='text-lg font-semibold'>{pathname === '' ? 'Home' : formatPath}</h1>
    </header>
  );
}
