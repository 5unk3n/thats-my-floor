import { ConcertGrid } from '@/features/concerts/components/ConcertGrid';
import { getConcerts } from '@/features/concerts/server/services/concert.service';

interface MainConcertFetcherProps {
  type: 'DOMESTIC' | 'GLOBAL' | 'FESTIVAL';
}

export async function MainConcertFetcher({ type }: MainConcertFetcherProps) {
  const concerts = await getConcerts({ type, page: 1, size: 8 });

  return <ConcertGrid concerts={concerts} />;
}
