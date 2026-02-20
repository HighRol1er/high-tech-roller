'use client';

import { Title } from './Title';
import { motion } from 'framer-motion';

export function DefaultPic() {
  return (
    <motion.div
      className='relative w-full h-full select-none cursor-pointer overflow-hidden flex items-center justify-center'
      style={{ background: 'linear-gradient(145deg, #0d1117 0%, #0f1318 60%, #0a0e15 100%)' }}
      initial='rest'
      whileHover='hover'
    >
      {/* 배경 그라데이션 빛줄기 */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse at 80% 20%, rgba(56,189,248,0.04) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(192,132,252,0.04) 0%, transparent 60%)',
        }}
      />

      {/* hover 글로우 */}
      <motion.div
        className='absolute inset-0 pointer-events-none z-10'
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(56,189,248,0.06) 0%, transparent 70%)',
        }}
      />

      {/* 타이틀
      <div className='absolute top-3 left-4 z-20 flex flex-col leading-none'>
        <span className='text-4xl font-black tracking-tighter text-white/90 font-mono'>Dev</span>
        <div
          className='h-0.5 mt-1 rounded-full'
          style={{ background: 'linear-gradient(90deg, #38bdf8, #c084fc)', width: '100%' }}
        />
      </div> */}
      <Title title='Dev' />

      {/* >_ 터미널 심볼 + 커서 */}
      <div className='relative z-20 flex items-center gap-2'>
        <motion.span
          className='font-mono font-bold select-none'
          style={{ fontSize: '3rem', color: '#38bdf8' }}
          variants={{
            rest: { opacity: 0.15 },
            hover: { opacity: 0.5, transition: { duration: 0.3 } },
          }}
        >
          &gt;_
        </motion.span>
        <motion.span
          className='inline-block w-4 h-9 rounded-sm'
          style={{ backgroundColor: '#38bdf8' }}
          variants={{
            rest: { opacity: 0 },
            hover: {
              opacity: [1, 0, 1],
              transition: { duration: 0.85, repeat: Infinity },
            },
          }}
        />
      </div>
    </motion.div>
  );
}
