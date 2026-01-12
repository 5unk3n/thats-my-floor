import { ArtistService } from '@/entities/artist';
import { ConcertRepository } from '@/entities/concert';

import { SearchResult } from '../types';

export const getSearchResults = async (
  query: string,
  type: 'all' | 'concert' | 'artist' = 'all'
): Promise<SearchResult> => {
  'use cache';
  if (!query || query.trim().length === 0) {
    return { concerts: [], artists: [] };
  }

  const normalizedQuery = query.trim();

  try {
    const [concerts, artists] = await Promise.all([
      // Search Concerts
      type === 'all' || type === 'concert'
        ? ConcertRepository.searchConcerts(normalizedQuery, 5)
        : Promise.resolve([] as Awaited<ReturnType<typeof ConcertRepository.searchConcerts>>),
      // Search Artists
      type === 'all' || type === 'artist'
        ? ArtistService.searchArtists(normalizedQuery)
        : Promise.resolve([] as Awaited<ReturnType<typeof ArtistService.searchArtists>>),
    ]);

    const result: SearchResult = {
      concerts: concerts.map((c) => ({
        id: c.id,
        title: c.title,
        posterUrl: c.posterUrl,
        startDate: c.startDate,
        endDate: c.endDate,
        place: c.place,
        status: c.status || '공연예정', // Handle potential null status
      })),
      artists,
    };

    return result;
  } catch (error) {
    console.error('Search Service Error:', error);
    throw error;
  }
};
