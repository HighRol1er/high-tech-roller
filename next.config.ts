import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    '*': ['@vercel/og'],
  },
};

export default nextConfig;
