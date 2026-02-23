'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function DarkMode() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <Button variant='outline' size='icon' aria-label='테마 변경' />;

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={toggleTheme}
      aria-label={resolvedTheme === 'dark' ? '라이트 모드로 변경' : '다크 모드로 변경'}
    >
      <motion.div className='relative h-[1.2rem] w-[1.2rem] overflow-hidden flex items-start justify-center'>
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{
            y: resolvedTheme === 'dark' ? -40 : 0,
            opacity: resolvedTheme === 'dark' ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Sun className='h-[1.2rem] w-[1.2rem]' />
        </motion.div>

        <motion.div
          className='absolute'
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: resolvedTheme === 'dark' ? 0 : 40,
            opacity: resolvedTheme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Moon className='h-[1.2rem] w-[1.2rem]' />
        </motion.div>
      </motion.div>
    </Button>
  );
}
