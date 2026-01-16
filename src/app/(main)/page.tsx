import { type Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import { ConcertListSkeleton } from '@/entities/concert';
import { CalendarGrid, CalendarSkeleton, MainConcertFetcher } from '@/features/concerts';
import { Button } from '@/shared/ui/button';

export const metadata: Metadata = {
  title: '홈',
  description: '최신 공연 정보를 확인하세요.',
};

export default function HomePage() {
  return (
    <main className="container mx-auto space-y-12 px-4 py-8">
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">국내 공연</h2>
          <Button variant="link" asChild>
            <Link href="/concerts?type=DOMESTIC">더보기</Link>
          </Button>
        </div>
        <Suspense fallback={<ConcertListSkeleton />}>
          <MainConcertFetcher type="DOMESTIC" />
        </Suspense>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">내한 공연</h2>
          <Button variant="link" asChild>
            <Link href="/concerts?type=GLOBAL">더보기</Link>
          </Button>
        </div>
        <Suspense fallback={<ConcertListSkeleton />}>
          <MainConcertFetcher type="GLOBAL" />
        </Suspense>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">페스티벌</h2>
          <Button variant="link" asChild>
            <Link href="/concerts?type=FESTIVAL">더보기</Link>
          </Button>
        </div>
        <Suspense fallback={<ConcertListSkeleton />}>
          <MainConcertFetcher type="FESTIVAL" />
        </Suspense>
      </section>

      <section id="calendar">
        <h2 className="mb-6 text-2xl font-bold">공연 캘린더</h2>
        <Suspense fallback={<CalendarSkeleton />}>
          <CalendarGrid />
        </Suspense>
      </section>
    </main>
  );
}
