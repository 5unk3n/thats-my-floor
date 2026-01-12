import { cacheLife, cacheTag } from 'next/cache';

import { ArtistService } from '@/entities/artist';

/**
 * Fetches artist profile with caching.
 * Feature-level service to handle caching strategy for Artist Profile page.
 */
export async function getCachedArtistProfile(artistId: string) {
  'use cache';
  cacheLife('max');
  cacheTag(`artist-profile-${artistId}`);
  return ArtistService.getArtistProfile(artistId);
}
