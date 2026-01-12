import { ConcertGrid } from '@/entities/concert';
import * as concertService from '@/features/concerts/model/services/concert.service';

interface MainConcertFetcherProps {
  type: 'DOMESTIC' | 'GLOBAL' | 'FESTIVAL';
}

export async function MainConcertFetcher({ type }: MainConcertFetcherProps) {
  const { data: concerts } = await concertService.getConcerts({ type, page: 1, size: 8 });

  return <ConcertGrid concerts={concerts} layout="horizontal" />;
}
