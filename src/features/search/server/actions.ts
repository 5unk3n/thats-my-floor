'use server';

import { prisma } from '@/shared/lib/prisma';

import { SearchResult } from '../types';

export async function search(query: string): Promise<SearchResult> {
  if (!query || query.trim().length === 0) {
    return { concerts: [], artists: [] };
  }

  const normalizedQuery = query.trim();

  // Search Concerts
  const concerts = await prisma.concert.findMany({
    where: {
      OR: [
        { prfnm: { contains: normalizedQuery, mode: 'insensitive' } },
        { fcltynm: { contains: normalizedQuery, mode: 'insensitive' } },
      ],
    },
    take: 5,
    select: {
      id: true,
      prfnm: true,
      poster: true,
      prfpdfrom: true,
      prfpdto: true,
      fcltynm: true,
      prfstate: true,
    },
    orderBy: {
      prfpdfrom: 'desc',
    },
  });

  // Search Artists
  const artists = await prisma.artist.findMany({
    where: {
      name: { contains: normalizedQuery, mode: 'insensitive' },
    },
    take: 5,
    select: {
      id: true,
      name: true,
      image: true,
    },
  });

  return {
    concerts: concerts.map((c) => ({
      id: c.id,
      title: c.prfnm,
      poster: c.poster,
      startDate: c.prfpdfrom,
      endDate: c.prfpdto,
      place: c.fcltynm,
      status: c.prfstate,
    })),
    artists: artists.map((a) => ({
      id: a.id,
      name: a.name,
      image: a.image,
    })),
  };
}
