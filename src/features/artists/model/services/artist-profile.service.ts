import { ArtistService } from '@/entities/artist';

/**
 * Fetches artist profile with caching.
 * Feature-level service to handle caching strategy for Artist Profile page.
 */
export async function getCachedArtistProfile(artistId: string) {
  'use cache';
  return ArtistService.getArtistProfile(artistId);
}
