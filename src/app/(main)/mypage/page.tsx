import { type Metadata } from 'next';
import { Suspense } from 'react';

import { LastFmConnectFetcher } from '@/features/auth/components/LastFmConnectFetcher';
import { LinkedAccountsFetcher } from '@/features/auth/components/LinkedAccountsFetcher';
import { LastFmConnectSkeleton } from '@/features/auth/components/skeletons/LastFmConnectSkeleton';
import { LinkedAccountsSkeleton } from '@/features/auth/components/skeletons/LinkedAccountsSkeleton';
import { UserProfileSkeleton } from '@/features/auth/components/skeletons/UserProfileSkeleton';
import { UserProfileFetcher } from '@/features/auth/components/UserProfileFetcher';
import { NotificationSettings } from '@/features/notifications';

export const metadata: Metadata = {
  title: '마이페이지',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold">마이페이지</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<UserProfileSkeleton />}>
          <UserProfileFetcher />
        </Suspense>

        <div className="space-y-6">
          <Suspense fallback={<LinkedAccountsSkeleton />}>
            <LinkedAccountsFetcher />
          </Suspense>

          <Suspense fallback={<LastFmConnectSkeleton />}>
            <LastFmConnectFetcher />
          </Suspense>

          <NotificationSettings />
        </div>
      </div>
    </div>
  );
}
