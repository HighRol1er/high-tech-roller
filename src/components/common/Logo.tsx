export default function Logo() {
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
    /* 1. p-10을 p-2로 줄여 여백 확보
       2. text-[clamp(...)] 또는 아주 작은 고정 수치 사용 (여기선 5px)
       3. 전체적으로 scale을 조절하여 사이드바 너비에 맞춤
    */
    <div className='flex flex-col items-center justify-center font-mono leading-none select-none p-2 overflow-hidden w-full scale-100 origin-left'>
      {lines.map((line, lineIdx) => (
        <div key={lineIdx} className='flex whitespace-pre'>
          {line.split('').map((char, charIdx) => {
            const delay = (lineIdx * line.length + charIdx) * 0.005;
            return (
              <span
                key={charIdx}
                className='inline-block w-[1ch] text-[5px] text-center animate-in fade-in duration-300'
                style={{
                  color: colors[lineIdx],
                  // 글자가 작아졌으므로 그림자 반경도 줄여야 뭉치지 않습니다.
                  textShadow: `
                    0 0 2px ${colors[lineIdx]},
                    0 0 4px ${colors[lineIdx]}
                    `,
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
  );
}
