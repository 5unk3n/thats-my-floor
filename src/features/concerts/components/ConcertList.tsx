import { getConcerts } from '../server/actions';
import { ConcertGrid } from './ConcertGrid';
import { ConcertPagination } from './ConcertPagination';

interface ConcertListProps {
  searchParams: Promise<{
    page?: string;
    region?: string;
    type?: string;
  }>;
}

export async function ConcertList({ searchParams }: ConcertListProps) {
  const { page: pageParam, region, type } = await searchParams;
  const page = Number(pageParam) || 1;

  const validTypes = ['DOMESTIC', 'GLOBAL', 'FESTIVAL'] as const;
  const concertType = validTypes.find((t) => t === type) || undefined;

  const response = await getConcerts({
    page,
    region,
    type: concertType,
  });

  const concerts = response.success ? response.data! : [];

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
