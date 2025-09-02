import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 🚀 This tells Next.js to ignore ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
  /* other config options can go here */
};

export default nextConfig;
