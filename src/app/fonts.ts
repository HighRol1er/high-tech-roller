import { Domine, JetBrains_Mono, Lora } from 'next/font/google';

export const domine = Domine({
  subsets: ['latin'],
  weight: ['700', '600'],
  variable: '--font-domine',
});

export const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const jetbrainsmono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['700', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});
