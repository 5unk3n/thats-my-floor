import { type Metadata } from 'next';
import { Suspense } from 'react';

import { SpotifySyncSkeleton } from '@/features/artists/components/skeletons/SpotifySyncSkeleton';
import { SpotifySyncFetcher } from '@/features/artists/components/SpotifySyncFetcher';

export const metadata: Metadata = {
  title: '스포티파이 연동',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SpotifySyncPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">스포티파이 아티스트 가져오기</h1>
          <p className="text-muted-foreground">
            스포티파이에서 팔로우한 아티스트 중, 알림을 받고 싶은 아티스트를 선택해주세요.
          </p>
        </div>
      </div>

      <Suspense fallback={<SpotifySyncSkeleton />}>
        <SpotifySyncFetcher />
      </Suspense>
    </div>
  );
}
