'use server';

import { searchCache } from '@/shared/lib/cache';
import { prisma } from '@/shared/lib/prisma';
import { SpotifyService } from '@/shared/lib/spotify/client';

import { SearchResult } from '../types';

import { ActionResponse } from '@/shared/types/action-response';
import { ERROR_CODES } from '@/shared/constants/error-codes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function search(
  query: string,
  type: 'all' | 'concert' | 'artist' = 'all'
): Promise<ActionResponse<SearchResult>> {
  if (!query || query.trim().length === 0) {
    return { success: true, data: { concerts: [], artists: [] } };
  }

  const normalizedQuery = query.trim();
  const cacheKey = `${normalizedQuery}:${type}`;

  // 1. Check Cache
  if (searchCache.has(cacheKey)) {
    console.log(`[Cache Hit] Serving search results for: "${normalizedQuery}" (type: ${type})`);
    return { success: true, data: searchCache.get(cacheKey) as SearchResult };
  }

  console.log(`[Cache Miss] Fetching fresh data for: "${normalizedQuery}" (type: ${type})`);

  try {
    const [concerts, spotifyArtists] = await Promise.all([
      // Search Concerts (DB) - Run only if type is 'all' or 'concert'
      type === 'all' || type === 'concert'
        ? prisma.concert.findMany({
            where: {
              publishStatus: 'PUBLISHED',
              OR: [
                { title: { contains: normalizedQuery, mode: 'insensitive' } },
                { place: { contains: normalizedQuery, mode: 'insensitive' } },
              ],
            },
            take: 5,
            select: {
              id: true,
              kopisId: true,
              title: true,
              posterUrl: true,
              startDate: true,
              endDate: true,
              place: true,
              status: true,
            },
            orderBy: {
              startDate: 'desc',
            },
          })
        : Promise.resolve([]),
      // Search Artists (Spotify API) - Run only if type is 'all' or 'artist'
      type === 'all' || type === 'artist'
        ? SpotifyService.searchArtists(normalizedQuery, 5)
        : Promise.resolve([]),
    ]);

    const result: SearchResult = {
      concerts: concerts.map((c) => ({
        id: c.id, // Use UUID for consistency
        title: c.title,
        posterUrl: c.posterUrl,
        startDate: c.startDate,
        endDate: c.endDate,
        place: c.place,
        status: c.status,
      })),
      artists: spotifyArtists.map((a) => ({
        id: a.id,
        name: a.name,
        image: a.images[0]?.url || null,
      })),
    };

    // 2. Set Cache
    searchCache.set(cacheKey, result);

    return { success: true, data: result };
  } catch (error) {
    console.error('Search Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Search failed' },
    };
  }
}
