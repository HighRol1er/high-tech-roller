'use client';

import { useEffect } from 'react';

export default function AsciiArt() {
  useEffect(() => {
    const lines = [
      ' ██╗  ██╗██╗ ██████╗ ██╗  ██╗████████╗███████╗ ██████╗██╗  ██╗',
      ' ██║  ██║██║██╔════╝ ██║  ██║╚══██╔══╝██╔════╝██╔════╝██║  ██║',
      ' ███████║██║██║  ███╗███████║   ██║   █████╗  ██║     ███████║',
      ' ██╔══██║██║██║   ██║██╔══██║   ██║   ██╔══╝  ██║     ██╔══██║',
      ' ██║  ██║██║╚██████╔╝██║  ██║   ██║   ███████╗╚██████╗██║  ██║',
      ' ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝',
    ];

    const colors = ['#67BD4D', '#FDBA32', '#F6862A', '#E24244', '#99449A', '#18A0DD'];

    // 1. 첫 번째 인자: 각 줄 앞에 %c를 붙여서 문자열을 합칩니다.
    const message = lines.map((line) => `%c${line}`).join('\n');

    // 2. 나머지 인자: 각 %c에 매칭될 스타일 배열을 만듭니다.
    const styles = colors.map(
      (color) => `color: ${color}; font-family: monospace; font-weight: bold; text-shadow: 0 0 2px ${color};`,
    );

    // 3. 한 번의 console.log로 모든 스타일을 전달합니다.
    console.log(message, ...styles);

    console.log('%cSystem Status: %cWelcome:)', 'color: gray;', 'color: #00ff00; font-weight: bold;');
  }, []);
}
