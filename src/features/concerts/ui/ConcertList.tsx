import { ConcertGrid } from '@/entities/concert';
import { getConcerts } from '@/features/concerts/model/services/concert.service';
import { Pagination } from '@/shared/ui/pagination';

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
  const LIMIT = 20;

  const validTypes = ['DOMESTIC', 'GLOBAL', 'FESTIVAL'] as const;
  const concertType = validTypes.find((t) => t === type) || undefined;

  const validRegions = ['METRO', 'OTHERS'] as const;
  const regionType = validRegions.find((r) => r === region) || undefined;

  const { data: concerts, total } = await getConcerts({
    page,
    size: LIMIT,
    type: concertType,
    region: regionType,
  });

  return (
    <>
      <ConcertGrid concerts={concerts} />
      <div className="mt-8 flex justify-center">
        <Pagination total={total} page={page} limit={LIMIT} />
      </div>
    </>
  );
}
