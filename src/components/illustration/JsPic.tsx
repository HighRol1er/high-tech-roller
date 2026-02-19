'use client';

import { motion } from 'framer-motion';

export function JsPic() {
  return (
    <motion.div
      className='relative w-full h-full select-none cursor-pointer overflow-hidden flex items-end justify-end'
      style={{ background: '#f7df1e' }}
      initial='rest'
      whileHover='hover'
    >
      {/* 격자 그리드 */}
      <svg className='absolute inset-0 w-full h-full' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <pattern id='js-grid' width='20' height='20' patternUnits='userSpaceOnUse'>
            <path d='M 20 0 L 0 0 0 20' fill='none' stroke='#c9b800' strokeWidth='0.6' />
          </pattern>
          {/* 대각선 추가 */}
          <pattern id='js-cross' width='20' height='20' patternUnits='userSpaceOnUse'>
            <line x1='0' y1='0' x2='20' y2='20' stroke='#c9b800' strokeWidth='0.3' strokeOpacity='0.4' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#js-grid)' />
        <rect width='100%' height='100%' fill='url(#js-cross)' />
      </svg>

      {/* 코너 도트 */}
      {[
        [8, 8],
        [92, 8],
        [8, 92],
        [92, 92],
      ].map(([x, y], i) => (
        <svg key={i} className='absolute inset-0 w-full h-full' viewBox='0 0 100 100' preserveAspectRatio='none'>
          <circle cx={x} cy={y} r='1.5' fill='#a89900' opacity='0.5' />
        </svg>
      ))}

      {/* hover 시 어둡게 */}
      <motion.div
        className='absolute inset-0 pointer-events-none'
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.3 }}
        style={{ background: 'rgba(0,0,0,0.06)' }}
      />

      {/* JS 텍스트 — 우측 하단 */}
      <div className='relative z-10 pb-4 pr-5 leading-none'>
        <span
          className='font-black select-none'
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 'clamp(3.5rem, 10vw, 5rem)',
            color: '#1a1400',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          JS
        </span>
      </div>
    </motion.div>
  );
}
