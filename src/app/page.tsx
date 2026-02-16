'use client';

import AsciiArt from '@/components/console/AsciiArt';
import { DarkMode } from '@/components/DarkMode';

export default function Home() {
  AsciiArt();

  return (
    <main>
      <DarkMode />
    </main>
  );
}
