import { Prisma, PublishStatus } from '@prisma/client';
import { format } from 'date-fns';
import { cacheLife, cacheTag } from 'next/cache';

import { ArtistService } from '@/entities/artist';
import {
  BookingLink,
  Concert,
  ConcertDetailModel,
  ConcertFilterParams,
  ConcertRepository,
} from '@/entities/concert';
import { PaginatedResult } from '@/shared/types/common';

export const getConcerts = async (
  params: ConcertFilterParams
): Promise<PaginatedResult<Concert>> => {
  'use cache';
  cacheLife('hours');
  cacheTag('concerts');
  if (params.type) {
    cacheTag(`concerts-${params.type}`);
  }

  // Business Logic: Filter Construction
  const filter: Prisma.ConcertWhereInput = {
    publishStatus: PublishStatus.PUBLISHED,
    isGlobal: params.type === 'GLOBAL' ? true : params.type === 'DOMESTIC' ? false : undefined,
    isFestival: params.type === 'FESTIVAL' ? true : params.type === 'DOMESTIC' ? false : undefined,
  };

  if (params.region === 'METRO') {
    filter.OR = [
      { region: { contains: '서울' } },
      { region: { contains: '경기' } },
      { region: { contains: '인천' } },
    ];
  } else if (params.region === 'OTHERS') {
    filter.AND = [
      { region: { not: { contains: '서울' } } },
      { region: { not: { contains: '경기' } } },
      { region: { not: { contains: '인천' } } },
    ];
  }

  const {
    data: concerts,
    total,
    page,
    limit,
    totalPages,
    hasNextPage,
  } = await ConcertRepository.findConcerts(filter, params.page || 1, params.size || 20, {
    createdAt: 'desc',
  });

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0].replace(/-/g, '.');
  };

  return {
    data: concerts.map((item) => ({
      id: item.id,
      title: item.title,
      posterUrl: item.posterUrl || '',
      startDate: formatDate(item.startDate),
      endDate: formatDate(item.endDate),
      place: item.place,
      status: item.status || 'OPEN',
    })),
    total,
    page,
    limit,
    totalPages,
    hasNextPage,
  };
};

export const getConcertDetail = async (id: string): Promise<ConcertDetailModel | null> => {
  'use cache';
  cacheLife('max');
  cacheTag(`concert-detail-${id}`);

  const concert = await ConcertRepository.findConcertById(id);

  if (!concert) return null;

  // Business Logic: Data Transformation & Parsing
  let relates: BookingLink[] = [];
  if (concert.relates && Array.isArray(concert.relates)) {
    relates = (
      concert.relates as Array<{
        relatenm?: string;
        name?: string;
        relateurl?: string;
        url?: string;
      }>
    )
      .map((item) => ({
        name: item.relatenm || item.name || '',
        url: item.relateurl || item.url || '',
      }))
      .filter((link) => link.name && link.url);
  }

  // Enrich artists with names from MusicBrainz
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawArtists = concert.artists.map((ca: any) => ca.artist);
  const enrichedArtists = await ArtistService.enrichArtists(rawArtists);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const artistMap = new Map(enrichedArtists.map((a: any) => [a.id, a]));

  const formatDate = (date: Date) => {
    return format(date, 'yyyy.MM.dd');
  };

  return {
    id: concert.id,
    title: concert.title,
    posterUrl: concert.posterUrl || '',
    startDate: formatDate(concert.startDate),
    endDate: formatDate(concert.endDate),
    place: concert.place,
    status: concert.status || 'OPEN',
    runtime: concert.runtime || '',
    price: concert.price || '',
    description: concert.description || '',
    images: concert.images,
    schedule: concert.schedule || '',
    relates,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    artists: concert.artists.map((a: any) => ({
      id: String(a.artist.id),
      mbid: String(a.artist.mbid),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      name: (artistMap.get(a.artist.id) as any)?.name || 'Unknown Artist',
    })),
  };
};
