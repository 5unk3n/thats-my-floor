import { Prisma } from '@prisma/client';

import { spotifyClient } from '@/shared/lib/spotify/client';

import {
  createLocalArtist,
  createUserArtist,
  deleteUserArtist,
  findArtistCandidates,
  findFollowersByArtistIds,
  findLocalArtistByMbid,
  findMusicBrainzArtistByMbid,
  findMusicBrainzArtistsByMbids,
  findSpotifyUrlByMbid,
  findUserArtist,
  updateArtistImage,
  upsertLocalArtist,
} from '../api/repository';

/**
 * Search artists by name.
 * Pure domain logic: merges MusicBrainz and Local data.
 */
export async function searchArtists(query: string, limit?: number) {
  // 1. Search candidates using optimized fuzzy search query
  return findArtistCandidates(query, limit);
}

/**
 * Get artist profile by MBID.
 * Pure domain logic: merges MusicBrainz and Local data.
 */
export async function getArtistProfile(mbid: string) {
  const mbArtist = await findMusicBrainzArtistByMbid(mbid);
  if (!mbArtist) return null;

  let localArtist = await findLocalArtistByMbid(mbid);

  // Requirement: Ensure local artist exists to store image
  if (!localArtist) {
    try {
      const created = await createLocalArtist({ mbid: mbArtist.gid });
      localArtist = { ...created, customAliases: [] };
    } catch (e) {
      console.error('[getArtistProfile] Failed to create local artist:', e);
    }
  }

  let imageUrl = localArtist?.imageUrl;

  // Custom Logic: Check for image expiry (30 days)
  const lastUpdated = localArtist?.updatedAt;
  const isExpired = lastUpdated
    ? Date.now() - lastUpdated.getTime() > 30 * 24 * 60 * 60 * 1000
    : false;

  if (!imageUrl || isExpired) {
    try {
      const syncedUrl = await syncArtistImageByMbid(mbid);
      if (syncedUrl) {
        imageUrl = syncedUrl;
      }
    } catch (e) {
      console.error('[getArtistProfile] Image sync failed:', e);
    }
  }

  const data = {
    ...mbArtist,
    localData: localArtist ? { ...localArtist, imageUrl } : { imageUrl },
  };

  // Transform/Combine data if needed
  return {
    id: data.gid,
    mbid: data.gid,
    name: data.name,
    genres: [], // TODO: Tag/Genre implementation
    links: data.artistLinks.map((l) => ({
      type: l.linkDef.linkType.name,
      url: l.url.url,
    })),
    // Compatibility for UI
    imageUrl: data.localData?.imageUrl,

    // Domain Logic: Extract External Links
    externalLinks: {
      appleMusic: data.artistLinks.find((l) => l.url.url.includes('music.apple.com'))?.url.url,
      spotify: data.artistLinks.find((l) => l.url.url.includes('spotify.com'))?.url.url,
      youtube: data.artistLinks.find((l) => l.url.url.includes('youtube.com'))?.url.url,
      melon: data.artistLinks.find((l) => l.url.url.includes('melon.com'))?.url.url,
    },
  };
}

/**
 * Toggle follow status for a user and artist (by MBID).
 * Business logic moved from repository.
 */
export async function toggleArtistFollow(userId: string, artistMbid: string) {
  // 1. Ensure Artist exists in local DB
  const artist = await findLocalArtistByMbid(artistMbid);
  let artistId = artist?.id;

  if (!artistId) {
    // Fetch details from MB to create local record
    const mbArtist = await findMusicBrainzArtistByMbid(artistMbid);
    if (!mbArtist) throw new Error('Artist not found in MusicBrainz');

    // Create local artist
    const newArtist = await createLocalArtist({
      mbid: artistMbid,
      // name is not in local Artist table
      // We can fetch image later or set default
    });
    artistId = newArtist.id;
  }

  // 2. Check existence of follow
  const existing = await findUserArtist(userId, artistId);

  if (existing) {
    await deleteUserArtist(existing.id);
    return false;
  } else {
    await createUserArtist(userId, artistId);
    return true;
  }
}

export async function getArtistFollowStatus(userId: string, artistMbid: string) {
  const artist = await findLocalArtistByMbid(artistMbid);
  if (!artist) return false;

  const follow = await findUserArtist(userId, artist.id);
  return !!follow;
}

export async function upsertArtist(mbid: string, data: Prisma.ArtistCreateInput) {
  return upsertLocalArtist(mbid, data);
}

export async function findSubscribedFollowers(artistIds: number[]) {
  // 1. Fetch raw data
  const userArtists = await findFollowersByArtistIds(artistIds);

  // 2. Filter by notification settings (Domain Logic)
  return userArtists
    .map((ua) => ua.user)
    .filter(
      (user) =>
        user.notificationSettings?.concertRegistrationAlert === true && user.devices.length > 0
    );
}

export async function enrichArtists(
  artists: { id: number; mbid: string; imageUrl: string | null }[]
) {
  const mbids = artists.map((a) => a.mbid);

  // 1. Fetch MB data
  const mbArtists = await findMusicBrainzArtistsByMbids(mbids);
  const mbMap = new Map(mbArtists.map((m) => [m.gid, m.name]));

  // 2. Merge (Domain Logic)
  return artists.map((artist) => ({
    ...artist,
    name: mbMap.get(artist.mbid) || 'Unknown Artist',
  }));
}

export async function syncArtistImageByMbid(artistMbid: string): Promise<string | null> {
  // 1. Get artist with current image info
  const artist = await findLocalArtistByMbid(artistMbid);
  if (!artist) return null;

  // 2. Check if update is needed (Lazy Loading: Only if no image)
  if (artist.imageUrl) {
    return artist.imageUrl;
  }

  // 3. Resolve Spotify ID via MusicBrainz
  const spotifyUrl = await findSpotifyUrlByMbid(artist.mbid);
  if (!spotifyUrl) {
    console.log(`[SyncImage] No Spotify URL found for artist ${artist.mbid}`);
    return null;
  }

  // Extract ID from URL (https://open.spotify.com/artist/3HqSLMAZ3g3d5poNaI7GXP)
  const spotifyId = spotifyUrl.split('/').pop();
  if (!spotifyId) return null;

  // 4. Fetch from Spotify API
  const imageUrl = await spotifyClient.getArtistImage(spotifyId);

  // 5. Update DB if image found
  if (imageUrl) {
    await updateArtistImage(artist.id, imageUrl);
    return imageUrl;
  }

  return null;
}
