'use server';

import { searchCache } from '@/shared/lib/cache';
import { prisma } from '@/shared/lib/prisma';
import { SpotifyService } from '@/shared/lib/spotify/client';

import { SearchResult } from '../types';

export async function search(query: string): Promise<SearchResult> {
  if (!query || query.trim().length === 0) {
    return { concerts: [], artists: [] };
  }

  const normalizedQuery = query.trim();

  // 1. Check Cache
  if (searchCache.has(normalizedQuery)) {
    console.log(`[Cache Hit] Serving search results for: "${normalizedQuery}"`);
    return searchCache.get(normalizedQuery) as SearchResult;
  }

  console.log(`[Cache Miss] Fetching fresh data for: "${normalizedQuery}"`);

  const [concerts, spotifyArtists] = await Promise.all([
    // Search Concerts (DB)
    prisma.concert.findMany({
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
    }),
    // Search Artists (Spotify API)
    SpotifyService.searchArtists(normalizedQuery, 5),
  ]);

  const result: SearchResult = {
    concerts: concerts.map((c) => ({
      id: c.id,
      title: c.prfnm,
      poster: c.poster,
      startDate: c.prfpdfrom,
      endDate: c.prfpdto,
      place: c.fcltynm,
      status: c.prfstate,
    })),
    artists: spotifyArtists.map((a) => ({
      id: a.id,
      name: a.name,
      image: a.images[0]?.url || null,
    })),
  };

  // 2. Set Cache
  searchCache.set(normalizedQuery, result);

  return result;
}
