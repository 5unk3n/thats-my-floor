import { PublishStatus } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { connection } from 'next/server';

import { ArtistRepository } from '@/entities/artist';
import {
  rejectConcertAction,
  requestAnalysisAction,
  restoreToReviewAction,
} from '@/features/concerts/api/actions';
import { prisma } from '@/shared/lib/prisma';
import { Button } from '@/shared/ui/button';

import { ConcertReviewCard } from './ConcertReviewCard';

interface AdminReviewListFetcherProps {
  status: PublishStatus;
}

export async function AdminReviewListFetcher({ status }: AdminReviewListFetcherProps) {
  await connection();

  const concerts = await prisma.concert.findMany({
    where: { publishStatus: status },
    orderBy: { updatedAt: 'desc' },
    take: 50,
    include: { artists: { include: { artist: true } } },
  });

  if (concerts.length === 0) {
    return <p className="text-muted-foreground p-4">해당 상태의 공연이 없습니다.</p>;
  }

  // 1. DRAFT (수집)
  if (status === PublishStatus.DRAFT) {
    return (
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
  if (status === PublishStatus.ANALYZING) {
    return (
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
  if (status === PublishStatus.REVIEWING) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {concerts.map((concert) => (
          <ConcertReviewCard key={concert.id} concert={concert} />
        ))}
      </div>
    );
  }

  // 4. PUBLISHED (발행 완료)
  if (status === PublishStatus.PUBLISHED) {
    const rawArtists = concerts.flatMap((c) => c.artists.map((ca) => ca.artist));
    const enrichedArtists = await ArtistRepository.enrichArtistsWithMetadata(rawArtists);
    const artistNameMap = new Map(enrichedArtists.map((a) => [a.id, a.name]));

    return (
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
                ?.map((a) => artistNameMap.get(a.artist.id) || 'Unknown Artist')
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
  if (status === PublishStatus.REJECTED) {
    return (
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

  return null;
}
