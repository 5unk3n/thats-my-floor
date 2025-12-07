import { getConcerts } from '@/features/concerts/server/actions';

export const dynamic = 'force-dynamic';

import { ConcertFilter } from '@/features/concerts/components/ConcertFilter';
import { ConcertList } from '@/features/concerts/components/ConcertList';
import { ConcertPagination } from '@/features/concerts/components/ConcertPagination';

interface ConcertsPageProps {
  searchParams: Promise<{
    page?: string;
    region?: string;
    type?: string;
  }>;
}

export default async function ConcertsPage({ searchParams }: ConcertsPageProps) {
  const { page: pageParam, region, type } = await searchParams;
  const page = Number(pageParam) || 1;

  const validTypes = ['DOMESTIC', 'VISIT', 'FESTIVAL'] as const;
  const concertType = validTypes.find((t) => t === type) || undefined;

  const concerts = await getConcerts({
    page,
    region,
    type: concertType,
  });

  // Check if there are more results for pagination
  // This is a simplified check. Ideally, the API should return total count.
  // For now, if we get a full page (20 items), we assume there might be more.
  const hasMore = concerts.length === 20;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">공연 목록</h1>

      <ConcertFilter />

      <ConcertList concerts={concerts} />

      <ConcertPagination hasMore={hasMore} />
    </div>
  );
}
