import { searchCache } from '@/shared/lib/cache';
import { SpotifyService } from '@/shared/lib/spotify/client';

import { SearchResult } from '../../types';
import * as searchRepository from '../db';

export const getSearchResults = async (
  query: string,
  type: 'all' | 'concert' | 'artist' = 'all'
): Promise<SearchResult> => {
  if (!query || query.trim().length === 0) {
    return { concerts: [], artists: [] };
  }

  const normalizedQuery = query.trim();
  const cacheKey = `${normalizedQuery}:${type}`;

  // 1. Check Cache
  if (searchCache.has(cacheKey)) {
    console.log(`[Cache Hit] Serving search results for: "${normalizedQuery}" (type: ${type})`);
    return searchCache.get(cacheKey) as SearchResult;
  }

  console.log(`[Cache Miss] Fetching fresh data for: "${normalizedQuery}" (type: ${type})`);

  try {
    const [concerts, spotifyArtists] = await Promise.all([
      // Search Concerts (DB) - Run only if type is 'all' or 'concert'
      type === 'all' || type === 'concert'
        ? searchRepository.searchConcerts(normalizedQuery, 5)
        : Promise.resolve([]),
      // Search Artists (Spotify API) - Run only if type is 'all' or 'artist'
      type === 'all' || type === 'artist'
        ? SpotifyService.searchArtists(normalizedQuery, 5)
        : Promise.resolve([]),
    ]);

    const result: SearchResult = {
      concerts: concerts.map((c) => ({
        id: c.id,
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

    return result;
  } catch (error) {
    console.error('Search Service Error:', error);
    throw error;
  }
};
