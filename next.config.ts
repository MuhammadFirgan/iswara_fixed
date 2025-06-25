import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
        protocol: 'https'
      },
      {
        hostname: '4igyvchkki.ufs.sh',
        protocol: 'https'
      },
    ]
  }
};

export default nextConfig;
