'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
export function DarkMode() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant='outline' size='icon' onClick={toggleTheme}>
      <motion.div className='relative h-[1.2rem] w-[1.2rem] overflow-hidden flex items-center justify-center'>
        {/* Sun Icon */}
        <motion.div
          initial={false}
          animate={{
            y: resolvedTheme === 'dark' ? -40 : 0,
            opacity: resolvedTheme === 'dark' ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Sun className='h-[1.2rem] w-[1.2rem]' />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          className='absolute'
          initial={false}
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
