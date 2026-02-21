import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@vercel/og', 'resvg'],
  bundlePagesRouterDependencies: false,
};

export default nextConfig;
