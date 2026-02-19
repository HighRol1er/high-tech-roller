import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {}, // webpack 에러 억제
};

export default nextConfig;
