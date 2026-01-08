import { type Metadata } from 'next';
import { Suspense } from 'react';

import { ConcertFilterSkeleton } from '@/entities/concert/ui/skeletons/ConcertFilterSkeleton';
import { ConcertListSkeleton } from '@/entities/concert/ui/skeletons/ConcertListSkeleton';
import { ConcertFilter, ConcertList } from '@/features/concerts';

export const metadata: Metadata = {
  title: '공연 목록',
  description: '예정된 모든 공연을 확인하세요.',
};

interface ConcertsPageProps {
  searchParams: Promise<{
    page?: string;
    region?: string;
    type?: string;
  }>;
}

export default function ConcertsPage({ searchParams }: ConcertsPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">공연 목록</h1>

      <Suspense fallback={<ConcertFilterSkeleton />}>
        <ConcertFilter />
      </Suspense>

      <Suspense fallback={<ConcertListSkeleton />}>
        <ConcertList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
