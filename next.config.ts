import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      // Tangani semua README.md di @uploadthing
      "node_modules/@uploadthing/**/*.md": {
        condition: "foreign",
        loaders: ["raw-loader"],
        as: "*.js",
      },
      // Tangani semua .d.cts di @uploadthing
      "node_modules/@uploadthing/**/*.d.cts": {
        condition: "foreign",
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      { hostname: "utfs.io", protocol: "https" },
      { hostname: "4igyvchkki.ufs.sh", protocol: "https" },
    ],
  },
};

export default nextConfig;