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
    remotePatterns: [new URL('http://www.kopis.or.kr/**'), new URL('https://i.scdn.co/image/**')],
  },
  cacheComponents: true,
  serverExternalPackages: ['tar-stream', 'unbzip2-stream'], // 증분 업데이트 스크립트용
};

export default withSerwist(nextConfig);
