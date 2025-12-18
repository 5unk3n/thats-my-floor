import withSerwistInit from '@serwist/next';
import type { NextConfig } from 'next';

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
});

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [new URL('http://www.kopis.or.kr/**'), new URL('https://i.scdn.co/**')],
  },
};

export default withSerwist(nextConfig);
