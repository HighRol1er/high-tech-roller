import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // sharp 비활성화
  },
};

export default nextConfig;
