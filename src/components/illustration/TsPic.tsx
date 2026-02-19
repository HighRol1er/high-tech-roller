'use client';

import { motion } from 'framer-motion';

export function TsPic() {
  return (
    <motion.div
      className='relative w-full h-full select-none cursor-pointer overflow-hidden flex items-end justify-end'
      style={{ background: '#3178c6' }}
      initial='rest'
      whileHover='hover'
    >
      {/* 격자 그리드 */}
      <svg className='absolute inset-0 w-full h-full' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <pattern id='ts-grid' width='20' height='20' patternUnits='userSpaceOnUse'>
            <path d='M 20 0 L 0 0 0 20' fill='none' stroke='#2563a8' strokeWidth='0.6' />
          </pattern>
          <pattern id='ts-cross' width='20' height='20' patternUnits='userSpaceOnUse'>
            <line x1='0' y1='0' x2='20' y2='20' stroke='#2563a8' strokeWidth='0.3' strokeOpacity='0.4' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#ts-grid)' />
        <rect width='100%' height='100%' fill='url(#ts-cross)' />
      </svg>

      {/* 코너 도트 */}
      {[
        [8, 8],
        [92, 8],
        [8, 92],
        [92, 92],
      ].map(([x, y], i) => (
        <svg key={i} className='absolute inset-0 w-full h-full' viewBox='0 0 100 100' preserveAspectRatio='none'>
          <circle cx={x} cy={y} r='1.5' fill='#1a4f8a' opacity='0.5' />
        </svg>
      ))}

      {/* hover 시 어둡게 */}
      <motion.div
        className='absolute inset-0 pointer-events-none'
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.3 }}
        style={{ background: 'rgba(0,0,0,0.08)' }}
      />

      {/* TS 텍스트 — 우측 하단 */}
      <div className='relative z-10 pb-4 pr-5 leading-none'>
        <span
          className='font-black select-none'
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(3.5rem, 10vw, 5rem)',
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          TS
        </span>
      </div>
    </motion.div>
  );
}
