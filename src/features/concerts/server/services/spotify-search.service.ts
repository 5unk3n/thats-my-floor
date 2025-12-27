import { SpotifyService } from '@/shared/lib/spotify/client';

export interface SpotifyCandidate {
  name: string;
  spotifyId: string;
  imageUrl?: string;
  popularity: number;
  followers: number;
  genres: string[];
}

export const searchSpotifyArtists = async (query: string): Promise<SpotifyCandidate[]> => {
  if (!query || query.trim().length < 2) return [];

  try {
    const artists = await SpotifyService.searchArtists(query, 5);

    return artists.map((artist) => ({
      name: artist.name,
      spotifyId: artist.id,
      imageUrl: artist.images[0]?.url,
      popularity: artist.popularity,
      followers: artist.followers.total,
      genres: artist.genres,
    }));
  } catch (error) {
    console.error('Spotify Search Service Failed:', error);
    return [];
  }
};
