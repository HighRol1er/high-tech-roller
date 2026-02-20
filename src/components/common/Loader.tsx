import { motion } from 'framer-motion';

export function Loader({ text = 'Loading' }) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-[#f5f4f0]'>
      <div className='flex flex-col items-center gap-5'>
        <div className='flex gap-2.5'>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className='w-2.5 h-2.5 rounded-full bg-neutral-900'
              animate={{ y: [0, -14, 0], opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.18,
              }}
            />
          ))}
        </div>

        <motion.p
          className='text-[13px] tracking-[0.12em] uppercase font-mono text-neutral-900/50'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {text}
        </motion.p>
      </div>
    </div>
  );
}
