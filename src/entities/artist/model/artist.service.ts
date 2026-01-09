import { Prisma } from '@prisma/client';

import {
  createLocalArtist,
  createUserArtist,
  deleteUserArtist,
  findFollowersByArtistIds,
  findLocalArtistByMbid,
  findLocalArtistsByMbids,
  findMusicBrainzArtistByMbid,
  findMusicBrainzArtistsByMbids,
  findMusicBrainzArtistsByName,
  findUserArtist,
  upsertLocalArtist,
} from '../api/repository';

/**
 * Search artists by name.
 * Pure domain logic: merges MusicBrainz and Local data.
 */
export async function searchArtists(query: string) {
  // 1. Search in MusicBrainz Artist table
  const artists = await findMusicBrainzArtistsByName(query);

  if (artists.length === 0) {
    return [];
  }

  // 2. Fetch local Artist data (images) for these artists
  const mbids = artists.map((a) => a.gid);
  const localArtists = await findLocalArtistsByMbids(mbids);

  const localArtistMap = new Map(localArtists.map((a) => [a.mbid, a]));

  // 3. Merge data
  return artists.map((artist) => ({
    ...artist,
    localData: localArtistMap.get(artist.gid) || null,
  }));
}

/**
 * Get artist profile by MBID.
 * Pure domain logic: merges MusicBrainz and Local data.
 */
export async function getArtistProfile(mbid: string) {
  const mbArtist = await findMusicBrainzArtistByMbid(mbid);
  if (!mbArtist) return null;

  const localArtist = await findLocalArtistByMbid(mbid);

  const data = { ...mbArtist, localData: localArtist };

  // Transform/Combine data if needed
  return {
    id: data.gid,
    mbid: data.gid,
    name: data.name,
    images: data.localData?.imageUrl ? [data.localData.imageUrl] : [],
    genres: [], // TODO: Tag/Genre implementation
    links: data.artistLinks.map((l) => ({
      type: l.linkDef.linkType.name,
      url: l.url.url,
    })),
    // Compatibility for UI
    image: data.localData?.imageUrl || null,

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
