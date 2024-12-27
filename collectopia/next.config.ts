import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [{
      protocol: 'http',
      hostname: 'localhost',
      pathname: '**'
    }]
  }
};

export default nextConfig;
