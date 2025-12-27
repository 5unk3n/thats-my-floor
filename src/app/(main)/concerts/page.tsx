import { Suspense } from 'react';

import { ConcertFilter } from '@/features/concerts/components/ConcertFilter';
import { ConcertList } from '@/features/concerts/components/ConcertList';
import { ConcertFilterSkeleton } from '@/features/concerts/components/skeletons/ConcertFilterSkeleton';
import { ConcertListSkeleton } from '@/features/concerts/components/skeletons/ConcertListSkeleton';

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
