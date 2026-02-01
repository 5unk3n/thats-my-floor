import withSerwistInit from '@serwist/next';
import type { NextConfig } from 'next';

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      new URL('https://i.scdn.co/image/**'),
      new URL('https://cdn.thatsmyfloor.live/**'),
      new URL('https://cdn-dev.thatsmyfloor.live/**'),
    ],
  },
  cacheComponents: true,
};

export default withSerwist(nextConfig);
