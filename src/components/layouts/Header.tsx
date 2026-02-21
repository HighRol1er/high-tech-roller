'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Me } from '@/components/layouts';

export function Header() {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter(Boolean);

  let displayTitle = 'Home';

  if (pathParts.length > 0) {
    if (pathParts[0] === 'post' && pathParts[1]) {
      displayTitle = decodeURIComponent(pathParts[1]);
    } else {
      const firstPart = pathParts[0];
      displayTitle = firstPart.charAt(0).toUpperCase() + firstPart.slice(1).toLowerCase();
    }
  }

  return (
    <header className='flex w-full items-center justify-between h-16 pl-2 sticky top-0 bg-background/50 backdrop-blur-sm z-10'>
      <div className='flex'>
        <SidebarTrigger />
        <h1 className='text-lg font-semibold truncate pr-4'>{displayTitle}</h1>
      </div>
      <div className='pr-2 sm:pr-4 md:pr-6 lg:pr-10'>
        <Me />
      </div>
    </header>
  );
}
