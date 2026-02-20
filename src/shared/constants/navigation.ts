import { Disc3, Apple, Pencil, House } from 'lucide-react';

export const NAV = [
  {
    title: 'Home',
    url: '/',
    icon: House,
  },
  {
    title: 'Write(Dev Only)',
    url: '/write',
    icon: Pencil,
  },
  {
    title: '사과게임',
    url: 'https://www.gamesaien.com/game/fruit_box_a/',
    icon: Apple,
    isExternal: true,
  },
  {
    title: 'Playlist',
    url: '/playlist',
    icon: Disc3,
  },
];
