'use client';

import { motion } from 'framer-motion';

function iso(x: number, y: number, z: number) {
  return {
    sx: (x - y) * 28 + 50,
    sy: (x + y) * 14 - z * 22 + 72,
  };
}

const LAYERS = [
  {
    id: 'behavioral',
    label: 'BEHAVIORAL',
    color: '#c084fc',
    shadow: '#7c3aed',
    patterns: ['Observer', 'Strategy', 'Command', 'Iterator', 'State', 'Template', 'Chain', 'Visitor', 'Memento'],
  },
  {
    id: 'structural',
    label: 'STRUCTURAL',
    color: '#38bdf8',
    shadow: '#0369a1',
    patterns: ['Adapter', 'Bridge', 'Composite', 'Decorator', 'Facade', 'Flyweight', 'Proxy'],
  },
  {
    id: 'creational',
    label: 'CREATIONAL',
    color: '#fb923c',
    shadow: '#c2410c',
    patterns: ['Singleton', 'Factory', 'Abstract', 'Builder', 'Prototype'],
  },
];

// hover variant로 떠오르는 블록
function IsoBlock({
  x,
  y,
  z,
  w,
  d,
  h,
  color,
  shadow,
  floatDelay,
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  color: string;
  shadow: string;
  floatDelay: number;
}) {
  const p = (dx: number, dy: number, dz: number) => iso(x + dx, y + dy, z + dz);

  const top = [p(0, 0, h), p(w, 0, h), p(w, d, h), p(0, d, h)];
  const left = [p(0, d, 0), p(0, d, h), p(w, d, h), p(w, d, 0)];
  const right = [p(w, 0, 0), p(w, 0, h), p(w, d, h), p(w, d, 0)];

  const pts = (face: ReturnType<typeof p>[]) => face.map((v) => `${v.sx},${v.sy}`).join(' ');

  return (
    <motion.g
      variants={{
        rest: { y: 0, opacity: 1 },
        hover: {
          y: [-0, -2, 0],
          opacity: [1, 1, 1],
          transition: {
            y: { duration: 1.4, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' },
          },
        },
      }}
    >
      <polygon points={pts(left)} fill={shadow} fillOpacity={0.9} />
      <polygon points={pts(right)} fill={shadow} fillOpacity={0.7} />
      <polygon points={pts(top)} fill={color} fillOpacity={0.95} />
    </motion.g>
  );
}

const BEHAVIORAL_BLOCKS = [0, 1, 2, 3, 4, 5, 6].map((i) => ({
  i,
  x: (i % 4) * 0.85 + 0.1,
  y: Math.floor(i / 4) * 0.85 + 0.1,
  z: 0,
  w: 0.7,
  d: 0.7,
  h: 0.3 + (i % 3) * 0.15,
  ...LAYERS[0],
  floatDelay: i * 0.12,
}));

const STRUCTURAL_BLOCKS = [0, 1, 2, 3, 4, 5].map((i) => ({
  i,
  x: (i % 3) * 0.9 + 0.5,
  y: Math.floor(i / 3) * 0.9 + 0.5,
  z: 0.8,
  w: 0.75,
  d: 0.75,
  h: 0.4 + (i % 2) * 0.2,
  ...LAYERS[1],
  floatDelay: i * 0.1 + 0.2,
}));

const CREATIONAL_BLOCKS = [0, 1, 2, 3, 4].map((i) => ({
  i,
  x: (i % 3) * 0.85 + 0.9,
  y: Math.floor(i / 3) * 0.85 + 1.1,
  z: 1.8,
  w: 0.7,
  d: 0.7,
  h: 0.5 + (i % 3) * 0.18,
  ...LAYERS[2],
  floatDelay: i * 0.1 + 0.4,
}));

export function GoFIllustration() {
  return (
    <motion.div
      className='relative w-full h-full overflow-hidden select-none cursor-pointer'
      style={{ background: 'linear-gradient(135deg, #0f0c1a 0%, #12101f 60%, #0a0d18 100%)' }}
      initial='rest'
      whileHover='hover'
    >
      {/* 배경 점 패턴 */}
      <svg className='absolute inset-0 w-full h-full opacity-[0.06]'>
        <defs>
          <pattern id='dots' width='12' height='12' patternUnits='userSpaceOnUse'>
            <circle cx='1' cy='1' r='0.8' fill='white' />
          </pattern>
        </defs>
        <rect width='100%' height='100%' fill='url(#dots)' />
      </svg>

      {/* hover 시 글로우 오버레이 */}
      <motion.div
        className='absolute inset-0 z-10 pointer-events-none'
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'radial-gradient(ellipse at 60% 60%, rgba(192,132,252,0.07) 0%, transparent 70%)',
        }}
      />

      {/* 타이틀 */}
      <div className='absolute top-3 left-4 z-20 flex flex-col leading-none'>
        <span className='text-[11px] font-mono tracking-[0.4em] text-white/30'>GANG OF FOUR</span>
        <span
          className='text-4xl font-black tracking-tighter text-white leading-none'
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Design
        </span>
        <span
          className='text-4xl font-black tracking-tighter leading-none'
          style={{
            fontFamily: 'Georgia, serif',
            background: 'linear-gradient(90deg, #fb923c, #38bdf8, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Patterns
        </span>
        <div
          className='h-px mt-2'
          style={{ background: 'linear-gradient(90deg, #fb923c44, #38bdf844, #c084fc44)', width: '140%' }}
        />
      </div>

      {/* 아이소메트릭 SVG */}
      <svg className='absolute inset-0 w-full h-full' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid meet'>
        {/* 바닥 그리드 */}
        {Array.from({ length: 4 }).map((_, xi) =>
          Array.from({ length: 4 }).map((_, yi) => {
            const a = iso(xi, yi, 0);
            const b = iso(xi + 1, yi, 0);
            const c = iso(xi + 1, yi + 1, 0);
            const dd = iso(xi, yi + 1, 0);
            return (
              <polygon
                key={`g-${xi}-${yi}`}
                points={`${a.sx},${a.sy} ${b.sx},${b.sy} ${c.sx},${c.sy} ${dd.sx},${dd.sy}`}
                fill='none'
                stroke='white'
                strokeWidth='0.15'
                strokeOpacity='0.06'
              />
            );
          }),
        )}

        {/* Behavioral */}
        {BEHAVIORAL_BLOCKS.map((b) => (
          <IsoBlock key={`bh-${b.i}`} {...b} />
        ))}
        {/* Structural */}
        {STRUCTURAL_BLOCKS.map((b) => (
          <IsoBlock key={`st-${b.i}`} {...b} />
        ))}
        {/* Creational */}
        {CREATIONAL_BLOCKS.map((b) => (
          <IsoBlock key={`cr-${b.i}`} {...b} />
        ))}
      </svg>

      {/* hover 시에만 나타나는 범례 */}
      <motion.div
        className='absolute right-3 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2.5'
        variants={{
          rest: { opacity: 0, x: 8 },
          hover: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.35 }}
      >
        {LAYERS.slice()
          .reverse()
          .map((layer) => (
            <div key={layer.id} className='flex flex-col gap-0.5 items-end'>
              <div className='flex items-center gap-1.5'>
                <span className='text-[6px] font-mono' style={{ color: layer.color + '80' }}>
                  {layer.patterns.length} PTS
                </span>
                <div className='w-2 h-2 rounded-sm' style={{ backgroundColor: layer.color }} />
              </div>
              <span className='text-[7px] font-mono font-bold' style={{ color: layer.color }}>
                {layer.label}
              </span>
            </div>
          ))}
      </motion.div>
    </motion.div>
  );
}
