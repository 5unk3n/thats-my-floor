import { type Metadata } from 'next';

import { LastFmSyncFetcher } from '@/features/artists';

export const metadata: Metadata = {
  title: 'Last.fm 연동', // Updated title
  robots: {
    index: false,
    follow: false,
  },
};

export default function LastFmSyncPage() {
  // Renamed component
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Last.fm 아티스트 가져오기</h1>
          <p className="text-muted-foreground">
            Last.fm 계정의 Top Artists를 가져와 알림을 받을 수 있습니다.
          </p>
        </div>
      </div>

      <LastFmSyncFetcher />
    </div>
  );
}
