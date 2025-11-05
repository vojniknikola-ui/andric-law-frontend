import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '**.trycloudflare.com',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
