import Link from 'next/link';
import { PATH } from '@/shared/constants';

export function Logo() {
  const lines = [
    ' ██╗  ██╗██╗ ██████╗ ██╗  ██╗████████╗███████╗ ██████╗██╗  ██╗',
    ' ██║  ██║██║██╔════╝ ██║  ██║╚══██╔══╝██╔════╝██╔════╝██║  ██║',
    ' ███████║██║██║  ███╗███████║   ██║   █████╗  ██║     ███████║',
    ' ██╔══██║██║██║   ██║██╔══██║   ██║   ██╔══╝  ██║     ██╔══██║',
    ' ██║  ██║██║╚██████╔╝██║  ██║   ██║   ███████╗╚██████╗██║  ██║',
    ' ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝',
  ];

  const colors = ['#67BD4D', '#FDBA32', '#F6862A', '#E24244', '#99449A', '#18A0DD'];

  return (
    <Link href={PATH.MAIN} aria-label='go home'>
      <span className='sr-only'>HighTech Roller Logo</span>

      <div
        className='flex-col items-center justify-center pt-1.5 leading-none select-none overflow-hidden w-full scale-100'
        aria-hidden='true'
      >
        {lines.map((line, lineIdx) => (
          <div key={lineIdx} className='flex whitespace-pre'>
            {line.split('').map((char, charIdx) => {
              const delay = (lineIdx * line.length + charIdx) * 0.005;
              const isFirstLetter = charIdx < 9;

              return (
                <span
                  key={charIdx}
                  className={`inline-block w-[1ch] text-[5px] text-center animate-in fade-in duration-300
                    ${!isFirstLetter ? 'group-data-[state=collapsed]:hidden' : ''}
                  `}
                  style={{
                    color: colors[lineIdx],
                    textShadow: `0 0 2px ${colors[lineIdx]}, 0 0 4px ${colors[lineIdx]}`,
                    animationDelay: `${delay}s`,
                    animationFillMode: 'both',
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </Link>
  );
}
