import { cacheLife, cacheTag } from 'next/cache';

import { ArtistService } from '@/entities/artist';

/**
 * Fetches artist profile with caching.
 * Feature-level service to handle caching strategy for Artist Profile page.
 */
export async function getCachedArtistProfile(mbid: string) {
  'use cache';
  cacheLife('hours');
  cacheTag(`artist-profile-${mbid}`);
  return ArtistService.getArtistProfile(mbid);
}
