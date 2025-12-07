import Link from 'next/link';

import { ConcertList } from '@/features/concerts/components/ConcertList';
import { getConcerts } from '@/features/concerts/server/actions';
import { Button } from '@/shared/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const domesticConcerts = await getConcerts({ type: 'DOMESTIC', page: 1, size: 8 });
  const intlConcerts = await getConcerts({ type: 'VISIT', page: 1, size: 8 });
  const festivals = await getConcerts({ type: 'FESTIVAL', page: 1, size: 8 });

  return (
    <main className="container mx-auto space-y-12 py-8">
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">국내 공연</h2>
          <Button variant="link" asChild>
            <Link href="/concerts?type=DOMESTIC">더보기</Link>
          </Button>
        </div>
        <ConcertList concerts={domesticConcerts} />
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">내한 공연</h2>
          <Button variant="link" asChild>
            <Link href="/concerts?type=VISIT">더보기</Link>
          </Button>
        </div>
        <ConcertList concerts={intlConcerts} />
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">페스티벌</h2>
          <Button variant="link" asChild>
            <Link href="/concerts?type=FESTIVAL">더보기</Link>
          </Button>
        </div>
        <ConcertList concerts={festivals} />
      </section>
    </main>
  );
}
