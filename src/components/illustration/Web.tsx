'use client';

import { motion } from 'framer-motion';

const nodes = [
  { id: 0, x: 50, y: 40, label: 'HTML' },
  { id: 1, x: 20, y: 65, label: 'CSS' },
  { id: 2, x: 80, y: 65, label: 'JS' },
  { id: 3, x: 35, y: 85, label: 'API' },
  { id: 4, x: 65, y: 85, label: 'DB' },
];

const edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [0, 3],
  [0, 4],
];

export function Web() {
  return (
    <motion.div
      className='relative w-full h-full bg-zinc-100 dark:bg-zinc-950 select-none cursor-pointer'
      initial='rest'
      whileHover='hover'
    >
      {/* 배경 그리드 */}
      <svg className='absolute inset-0 w-full h-full opacity-10' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <pattern id='grid' width='24' height='24' patternUnits='userSpaceOnUse'>
            <path d='M 24 0 L 0 0 0 24' fill='none' stroke='#4ade80' strokeWidth='0.5' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#grid)' />
      </svg>

      {/* 글로우 오버레이 — hover 시에만 */}
      <motion.div
        className='absolute inset-0 pointer-events-none z-10'
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(74,222,128,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Web 타이틀 — 항상 보임 */}
      <div className='absolute top-3 left-4 z-20 flex flex-col leading-none'>
        <span className='text-4xl font-black tracking-tighter text-black/90 dark:text-white/90 font-mono'>Web</span>
        <div className='h-0.5 bg-green-400 mt-1 rounded-full' />
      </div>

      {/* 네트워크 그래프 */}
      <svg className='absolute inset-0 w-full h-full'>
        {/* 엣지 — 항상 보임 */}
        {edges.map(([from, to], i) => {
          const a = nodes[from];
          const b = nodes[to];
          return (
            <line
              key={i}
              x1={`${a.x}%`}
              y1={`${a.y}%`}
              x2={`${b.x}%`}
              y2={`${b.y}%`}
              stroke='#4ade80'
              strokeWidth='0.8'
              strokeOpacity='0.25'
            />
          );
        })}

        {/* 흐르는 패킷 — hover 시에만 */}
        {edges.map(([from, to], i) => {
          const a = nodes[from];
          const b = nodes[to];
          return (
            <motion.circle
              key={`packet-${i}`}
              r='2'
              fill='#4ade80'
              variants={{
                rest: { opacity: 0 },
                hover: {
                  cx: [`${a.x}%`, `${b.x}%`],
                  cy: [`${a.y}%`, `${b.y}%`],
                  opacity: [0, 1, 0],
                  transition: {
                    duration: 1.8,
                    delay: i * 0.6,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                  },
                },
              }}
            />
          );
        })}

        {/* 노드 — 항상 보임 */}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r='14'
              fill='#052e16'
              stroke='#4ade80'
              strokeWidth='1'
              strokeOpacity='0.5'
            />
            {/* 펄스 링 — hover 시에만 */}
            <motion.circle
              cx={`${node.x}%`}
              cy={`${node.y}%`}
              r='14'
              fill='none'
              stroke='#4ade80'
              strokeWidth='1'
              variants={{
                rest: { scale: 1, opacity: 0 },
                hover: {
                  scale: [1, 2],
                  opacity: [0.4, 0],
                  transition: { duration: 2, repeat: Infinity, repeatDelay: 1 },
                },
              }}
            />
            <text
              x={`${node.x}%`}
              y={`${node.y}%`}
              textAnchor='middle'
              dominantBaseline='central'
              fontSize='7'
              fill='#4ade80'
              fontFamily='monospace'
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
