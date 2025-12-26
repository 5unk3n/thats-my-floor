import { Prisma, PublishStatus } from '@prisma/client';
import { cacheTag } from 'next/cache';

import * as concertRepository from '../db';
import { BookingLink, Concert, ConcertDetail, ConcertFilterParams } from '../db';

export const getConcerts = async (params: ConcertFilterParams): Promise<Concert[]> => {
  'use cache';
  cacheTag('concerts');
  if (params.type) {
    cacheTag(`concerts-${params.type}`);
  }

  // Business Logic: Default Dates
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  const startDate = params.startDate
    ? new Date(
        params.startDate.slice(0, 4) +
          '-' +
          params.startDate.slice(4, 6) +
          '-' +
          params.startDate.slice(6, 8)
      )
    : today;

  const endDate = params.endDate
    ? new Date(
        params.endDate.slice(0, 4) +
          '-' +
          params.endDate.slice(4, 6) +
          '-' +
          params.endDate.slice(6, 8)
      )
    : nextMonth;

  // Business Logic: Filter Construction
  const filter = {
    publishStatus: PublishStatus.PUBLISHED,
    startDate,
    endDate,
    isGlobal: params.type === 'GLOBAL' ? true : params.type === 'DOMESTIC' ? false : undefined,
    isFestival: params.type === 'FESTIVAL' ? true : params.type === 'DOMESTIC' ? false : undefined,
    keyword: params.keyword,
  };

  const concerts = await concertRepository.findConcerts({
    where: filter,
    page: params.page || 1,
    size: params.size || 20,
  });

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0].replace(/-/g, '.');
  };

  return concerts.map((item) => ({
    id: item.id,
    title: item.title,
    posterUrl: item.posterUrl || '',
    startDate: formatDate(item.startDate),
    endDate: formatDate(item.endDate),
    place: item.place,
    status: item.status || 'OPEN',
  }));
};

export const getConcertDetail = async (id: string): Promise<ConcertDetail | null> => {
  'use cache';
  cacheTag(`concert-detail-${id}`);

  const concert = await concertRepository.findConcertById(id);

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

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0].replace(/-/g, '.');
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
    artists: concert.artists.map((a) => ({ id: a.artist.id, name: a.artist.name })),
  };
};

export const syncConcert = async (data: {
  kopisId: string;
  title: string;
  startDate: string;
  endDate: string;
  place: string;
  area?: string;
  posterUrl?: string;
  status?: string;
  runtime?: string;
  price?: string;
  schedule?: string;
  description?: string;
  images?: string[];
  relates?: Prisma.InputJsonValue[];
  isGlobal?: boolean;
  isFestival?: boolean;
  artistId?: string;
}) => {
  // Pass through to repository, but this layer is where we'd put
  // any additional business logic (e.g. notification triggers, validation)
  // before hitting the DB.
  // For now, it delegates to the complex upsert logic in Repository (or we move that here?)
  // The architecture review suggested moving "Orchestration" here.
  // Let's assume we keep the 'upsertConcert' in generic form in DB or split it?
  // Current db.ts upsertConcert does: upsert Concert -> optional find/create ConcertArtist.
  // We should move that logic here.
  return concertRepository.upsertConcertWithArtist(data);
};
