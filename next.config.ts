import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [new URL('http://www.kopis.or.kr/**'), new URL('https://i.scdn.co/**')],
  },
};

export default nextConfig;
