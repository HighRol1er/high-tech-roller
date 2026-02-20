import { WebPic, ReactPic, DesignPatternPic, JsPic, TsPic, DefaultPic, TestPic } from '@/components/illustration';

const TAG_MAP: Record<string, React.ReactNode> = {
  web: <WebPic />,
  react: <ReactPic />,
  designpattern: <DesignPatternPic />,
  javascript: <JsPic />,
  typescript: <TsPic />,
  default: <DefaultPic />,
  test: <TestPic />,
};

interface ThumbnailProps {
  tags: string[];
}

export function Thumbnail({ tags }: ThumbnailProps) {
  if (!tags || tags.length === 0) {
    return TAG_MAP['default'];
  }
  const key = tags[0].toLowerCase().trim().replace(/\s+/g, '');
  return TAG_MAP[key] ?? TAG_MAP['default'];
}
