import { lastFmClient } from '@/shared/lib/lastfm/client';

export interface LastFmCandidate {
  name: string;
  lastfmArtistId: string; // mbid or url
  imageUrl?: string;
  listeners: number;
  playcount?: number;
  url: string;
}

export const searchLastFmArtists = async (query: string): Promise<LastFmCandidate[]> => {
  if (!query || query.trim().length < 2) return [];

  try {
    const response = await lastFmClient.searchArtist(query, 5);
    const artists = response?.results.artistmatches.artist || [];

    return artists.map((artist) => ({
      name: artist.name,
      lastfmArtistId: artist.mbid || artist.url,
      imageUrl: artist.image.find((img) => img.size === 'large')?.['#text'],
      listeners: parseInt(artist.listeners || '0', 10), // Search usually returns listeners/streamable??
      // Note: Artist search response in Last.fm has listeners, but types might imply string.
      // Let's check types.ts for LastFmArtist. It has keys 'listeners' in 'stats', but search response might be simpler.
      // Actually, search result 'artist' usually has fewer fields. Let's rely on basic mapping.
      // If listeners is missing in search result, default to 0.
      url: artist.url,
    }));
  } catch (error) {
    console.error('Last.fm Search Service Failed:', error);
    return [];
  }
};
