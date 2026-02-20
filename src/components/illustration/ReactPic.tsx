'use client';

import { Title } from './Title';
import { motion } from 'framer-motion';

const cx = 50;
const cy = 50;

function getOrbitPath(rx: number, ry: number, rotateDeg: number) {
  const φ = (rotateDeg * Math.PI) / 180;
  const x1 = +(cx + rx * Math.cos(φ)).toFixed(3);
  const y1 = +(cy + rx * Math.sin(φ)).toFixed(3);
  const x2 = +(cx - rx * Math.cos(φ)).toFixed(3);
  const y2 = +(cy - rx * Math.sin(φ)).toFixed(3);
  return `M ${x1} ${y1} A ${rx} ${ry} ${rotateDeg} 1 1 ${x2} ${y2} A ${rx} ${ry} ${rotateDeg} 1 1 ${x1} ${y1}`;
}

const ORBITS = [
  { id: 'orbit-0', rx: 42, ry: 14, rotate: 0, duration: 3.5 },
  { id: 'orbit-1', rx: 42, ry: 14, rotate: 60, duration: 4.2 },
  { id: 'orbit-2', rx: 42, ry: 14, rotate: 120, duration: 2.9 },
];

export function ReactPic() {
  return (
    <motion.div
      className='relative w-full h-full bg-[#0a0f1e] select-none overflow-hidden cursor-pointer'
      initial='rest'
      whileHover='hover'
    >
      {/* 별 배경 — hover 시에만 깜빡임 */}
      {Array.from({ length: 28 }).map((_, i) => (
        <motion.div
          key={i}
          className='absolute rounded-full bg-white'
          style={{
            width: i % 3 === 0 ? 2 : 1,
            height: i % 3 === 0 ? 2 : 1,
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
          }}
          variants={{
            rest: { opacity: 0.15 },
            hover: {
              opacity: [0.1, 0.6, 0.1],
              transition: { duration: 2 + (i % 3), delay: i * 0.05, repeat: Infinity },
            },
          }}
        />
      ))}

      {/* 타이틀 — 항상 보임 */}
      <Title title={'React'} titleStyle={'text-[#61dafb]'} />

      {/* hover 시 글로우 */}
      <motion.div
        className='absolute inset-0 pointer-events-none z-10'
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'radial-gradient(ellipse at 60% 50%, rgba(97,218,251,0.08) 0%, transparent 70%)',
        }}
      />

      <svg className='absolute inset-0 w-full h-full' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid meet'>
        <defs>
          {ORBITS.map((orbit) => (
            <path key={orbit.id} id={orbit.id} d={getOrbitPath(orbit.rx, orbit.ry, orbit.rotate)} fill='none' />
          ))}
        </defs>

        {/* 궤도 타원 — 항상 보임 */}
        {ORBITS.map((orbit) => (
          <ellipse
            key={orbit.id + '-vis'}
            cx={cx}
            cy={cy}
            rx={orbit.rx}
            ry={orbit.ry}
            fill='none'
            stroke='#61dafb'
            strokeWidth='1.5'
            strokeOpacity='0.3'
            transform={`rotate(${orbit.rotate} ${cx} ${cy})`}
          />
        ))}

        {/* 전자 — animateMotion은 항상 돌지만 hover 시에만 보임 */}
        {ORBITS.map((orbit, oi) =>
          [0, 1 / 2].map((offset, i) => (
            <motion.g
              key={`e-${oi}-${i}`}
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: 0.3 }}
            >
              <circle r='3' fill='#61dafb' opacity='0.12'>
                <animateMotion
                  dur={`${orbit.duration}s`}
                  repeatCount='indefinite'
                  begin={`${-offset * orbit.duration}s`}
                >
                  <mpath href={`#${orbit.id}`} />
                </animateMotion>
              </circle>
              <circle r='1.4' fill='#61dafb'>
                <animateMotion
                  dur={`${orbit.duration}s`}
                  repeatCount='indefinite'
                  begin={`${-offset * orbit.duration}s`}
                >
                  <mpath href={`#${orbit.id}`} />
                </animateMotion>
              </circle>
            </motion.g>
          )),
        )}

        {/* 핵 — 항상 보임 */}
        <circle cx={cx} cy={cy} r='4.5' fill='#0a0f1e' stroke='#61dafb' strokeWidth='1.0' />
        <circle cx={cx} cy={cy} r='1.8' fill='#61dafb' opacity='0.8' />

        {/* 핵 펄스 — hover 시에만 */}
        <motion.circle
          cx={cx}
          cy={cy}
          r='4.5'
          fill='none'
          stroke='#61dafb'
          strokeWidth='0.5'
          variants={{
            rest: { scale: 1, opacity: 0 },
            hover: {
              scale: [1, 3],
              opacity: [0.5, 0],
              transition: { duration: 2.5, repeat: Infinity, repeatDelay: 0.5 },
            },
          }}
        />
      </svg>
    </motion.div>
  );
}
