import { connection } from 'next/server';

import { ConcertGrid } from '@/features/concerts/components/ConcertGrid';
import { getConcerts } from '@/features/concerts/server/actions';

interface MainConcertFetcherProps {
  type: 'DOMESTIC' | 'GLOBAL' | 'FESTIVAL';
}

export async function MainConcertFetcher({ type }: MainConcertFetcherProps) {
  await connection();

  const response = await getConcerts({ type, page: 1, size: 8 });
  const concerts = response.success ? response.data! : [];

  return <ConcertGrid concerts={concerts} />;
}
