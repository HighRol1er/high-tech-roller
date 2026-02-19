import { Web, ReactIllustration, GoFIllustration } from '@/components/illustration';

const TAG_MAP: Record<string, React.ReactNode> = {
  web: <Web />,
  react: <ReactIllustration />,
  gof: <GoFIllustration />,
};

const DEFAULT = (
  <div className='w-full h-full bg-zinc-900 flex items-center justify-center'>
    <span className='text-zinc-600 text-xs font-mono'>NO THUMBNAIL</span>
  </div>
);

interface ThumbnailProps {
  tags: string[];
}

export function Thumbnail({ tags }: ThumbnailProps) {
  const key = tags[0]?.toLowerCase().trim();
  return TAG_MAP[key] ?? DEFAULT;
}
