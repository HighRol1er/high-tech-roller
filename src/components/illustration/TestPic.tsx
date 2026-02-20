'use client';

import { motion } from 'framer-motion';

export function TestPic() {
  return (
    <motion.div
      className='relative w-full h-full select-none cursor-pointer overflow-hidden flex flex-col'
      initial='rest'
      whileHover='hover'
    >
      {/* 위쪽 — TEST */}
      <motion.div
        className='flex-1 flex items-center justify-center'
        style={{ background: '#ffffff' }}
        variants={{
          rest: { background: '#ffffff' },
          hover: { background: '#1a6bcc', transition: { duration: 0.4 } },
        }}
      >
        <motion.span
          className='font-black tracking-tighter leading-none select-none font-lora'
          style={{
            fontSize: 'clamp(2.2rem, 8vw, 3.2rem)',
            color: '#111111',
          }}
          variants={{
            rest: { color: '#111111' },
            hover: { color: '#ffffff', transition: { duration: 0.4 } },
          }}
        >
          TEST
        </motion.span>
      </motion.div>

      {/* 가운데 & 배지 */}
      <div className='relative flex items-center justify-center' style={{ height: 0 }}>
        <motion.div
          className='absolute z-20 flex items-center justify-center rounded-full border-4 size-8'
          style={{ borderColor: '#111111', background: '#ffffff' }}
          variants={{
            rest: { borderColor: '#111111', background: '#ffffff' },
            hover: {
              borderColor: '#ffffff',
              background: '#1a6bcc',
              rotate: 180,
              transition: { duration: 0.5 },
            },
          }}
        >
          <motion.span
            className='font-serif font-bold leading-none'
            style={{ fontSize: '1rem', color: '#111111', marginTop: '-1px' }}
            variants={{
              rest: { color: '#111111' },
              hover: { color: '#ffffff', transition: { duration: 0.4 } },
            }}
          >
            &amp;
          </motion.span>
        </motion.div>
      </div>

      {/* 아래쪽 — CODE */}
      <motion.div
        className='flex-1 flex items-center justify-center'
        style={{ background: '#1a6bcc' }}
        variants={{
          rest: { background: '#1a6bcc' },
          hover: { background: '#ffffff', transition: { duration: 0.4 } },
        }}
      >
        <motion.span
          className='font-black tracking-tighter leading-none select-none font-lora'
          style={{
            fontSize: 'clamp(2.2rem, 8vw, 3.2rem)',
            color: '#ffffff',
          }}
          variants={{
            rest: { color: '#ffffff' },
            hover: { color: '#111111', transition: { duration: 0.4 } },
          }}
        >
          CODE
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
