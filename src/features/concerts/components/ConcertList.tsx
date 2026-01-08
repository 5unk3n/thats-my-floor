import { ConcertGrid } from '@/entities/concert';
import { getConcerts } from '@/features/concerts/server/services/concert.service';

import { ConcertPagination } from './ConcertPagination';

interface ConcertListProps {
  searchParams: Promise<{
    page?: string;
    region?: string;
    type?: string;
  }>;
}

export async function ConcertList({ searchParams }: ConcertListProps) {
  const { page: pageParam, type, region } = await searchParams;
  const page = Number(pageParam) || 1;

  const validTypes = ['DOMESTIC', 'GLOBAL', 'FESTIVAL'] as const;
  const concertType = validTypes.find((t) => t === type) || undefined;

  const validRegions = ['METRO', 'OTHERS'] as const;
  const regionType = validRegions.find((r) => r === region) || undefined;

  const concerts = await getConcerts({
    page,
    type: concertType,
    region: regionType,
  });

  // Check if there are more results for pagination
  // This is a simplified check. Ideally, the API should return total count.
  // For now, if we get a full page (20 items), we assume there might be more.
  const hasMore = concerts.length === 20;

  return (
    <>
      <ConcertGrid concerts={concerts} />
      <ConcertPagination hasMore={hasMore} />
    </>
  );
}
