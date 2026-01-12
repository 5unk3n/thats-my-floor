import { PublishStatus } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { connection } from 'next/server';

import { ArtistService } from '@/entities/artist';
import { ConcertRepository } from '@/entities/concert';
import {
  rejectConcertAction,
  requestAnalysisAction,
  restoreToReviewAction,
} from '@/features/concerts/api/actions';
import { Button } from '@/shared/ui/button';
import { Pagination } from '@/shared/ui/pagination';

import { ConcertReviewCard } from './ConcertReviewCard';

interface AdminReviewListFetcherProps {
  status: PublishStatus;
  page?: number;
}

export async function AdminReviewListFetcher({ status, page = 1 }: AdminReviewListFetcherProps) {
  await connection();
  const LIMIT = 50;

  const { data: concerts, total } = await ConcertRepository.findConcertsByStatus({
    status,
    page,
    limit: LIMIT,
  });

  if (concerts.length === 0) {
    return <p className="text-muted-foreground p-4">해당 상태의 공연이 없습니다.</p>;
  }

  let content;

  // 1. DRAFT (수집)
  if (status === PublishStatus.DRAFT) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {concerts.map((concert) => (
          <div key={concert.id} className="group flex flex-col">
            <Link href={`/concerts/${concert.id}`} className="block">
              <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg border bg-muted hover:shadow-md transition-shadow">
                {concert.posterUrl && (
                  <Image
                    src={concert.posterUrl}
                    alt={concert.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    unoptimized
                  />
                )}
              </div>
              <h3 className="mt-2 text-sm font-medium line-clamp-2">{concert.title}</h3>
            </Link>
            <div className="mt-2 flex gap-2">
              <form
                action={async () => {
                  'use server';
                  await requestAnalysisAction(concert.id);
                }}
                className="flex-1"
              >
                <Button type="submit" size="sm" className="w-full">
                  출연진 AI 검색 요청
                </Button>
              </form>
              <form
                action={async () => {
                  'use server';
                  await rejectConcertAction(concert.id);
                }}
              >
                <Button type="submit" variant="outline" size="sm">
                  반려
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 2. ANALYZING (분석 중)
  else if (status === PublishStatus.ANALYZING) {
    content = (
      <div className="grid grid-cols-1 gap-4">
        {concerts.map((concert) => (
          <div key={concert.id} className="p-4 border rounded shadow-sm opacity-70">
            <h3 className="font-bold">{concert.title}</h3>
            <p className="text-sm text-gray-500">상태: {concert.publishStatus}</p>
          </div>
        ))}
      </div>
    );
  }

  // 3. REVIEWING (검토 대기)
  else if (status === PublishStatus.REVIEWING) {
    content = (
      <div className="grid grid-cols-1 gap-4">
        {concerts.map((concert) => (
          <ConcertReviewCard key={concert.id} concert={concert} />
        ))}
      </div>
    );
  }

  // 4. PUBLISHED (발행 완료)
  else if (status === PublishStatus.PUBLISHED) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawArtists = concerts.flatMap((c: any) => c.artists.map((ca: any) => ca.artist));
    const enrichedArtists = await ArtistService.enrichArtists(rawArtists);
    const artistNameMap = new Map(enrichedArtists.map((a) => [a.id, a.name]));

    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {concerts.map((concert) => (
          <div
            key={concert.id}
            className="p-4 border rounded shadow-sm bg-green-50 flex flex-col gap-3"
          >
            <h3 className="font-bold text-sm">{concert.title}</h3>
            <p className="text-xs text-gray-600">
              🎤{' '}
              {concert.artists
                ?.map(
                  (a: { artist: { id: number } }) =>
                    artistNameMap.get(a.artist.id) || 'Unknown Artist'
                )
                .join(', ') || '알 수 없음'}
            </p>
            <div className="text-sm text-gray-500">
              {new Date(concert.startDate).toLocaleDateString()}
            </div>
            <form
              action={async () => {
                'use server';
                await restoreToReviewAction(concert.id);
              }}
            >
              <Button type="submit" variant="outline" size="sm" className="w-full mt-auto">
                검토로 복구
              </Button>
            </form>
          </div>
        ))}
      </div>
    );
  }

  // 5. REJECTED (반려)
  else if (status === PublishStatus.REJECTED) {
    content = (
      <div className="grid grid-cols-1 gap-4">
        {concerts.map((concert) => (
          <div
            key={concert.id}
            className="p-4 border rounded shadow-sm bg-gray-100 flex flex-col gap-3"
          >
            <h3 className="font-bold text-sm">{concert.title}</h3>
            <p className="text-xs text-gray-500">❌ 반려됨</p>
            <form
              action={async () => {
                'use server';
                await restoreToReviewAction(concert.id);
              }}
            >
              <Button type="submit" variant="outline" size="sm" className="w-full mt-auto">
                검토로 복구
              </Button>
            </form>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {content}
      <Pagination total={total} page={page} limit={LIMIT} />
    </div>
  );
}
