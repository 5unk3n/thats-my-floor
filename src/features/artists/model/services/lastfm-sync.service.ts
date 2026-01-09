import { ArtistRepository } from '@/entities/artist';
import { lastFmClient } from '@/shared/lib/lastfm/client';
import { LastFmTopArtist } from '@/shared/lib/lastfm/types';

export type SyncArtistStatus = 'new' | 'exists' | 'following';

export interface LastFmSyncArtist extends LastFmTopArtist {
  status: SyncArtistStatus;
  dbId?: string;
  imageUrl?: string;
}

export async function fetchMyLastFmArtists(
  username: string,
  userId: string,
  limit: number = 50,
  period: 'overall' | '7day' | '1month' | '3month' | '6month' | '12month' = 'overall'
): Promise<{
  success: boolean;
  data?: LastFmSyncArtist[];
  error?: string;
}> {
  try {
    // 1. Fetch from Last.fm
    const response = await lastFmClient.getUserTopArtists(username, limit, period);

    if (!response || !response.topartists) {
      return { success: false, error: '아티스트 목록을 가져오는데 실패했습니다.' };
    }

    const topArtists = response.topartists.artist;

    // 2. Check DB status
    // Filter out artists without mbid as our DB requires valid UUID mbid
    const validArtists = topArtists.filter((a) => a.mbid);
    const lastfmIds = validArtists.map((a) => a.mbid).filter((id): id is string => !!id);

    // Check repository capability.
    // Use the individual export
    const existingArtists = await ArtistRepository.findArtistsWithConcerts(lastfmIds, userId);

    const now = new Date();

    const result: LastFmSyncArtist[] = topArtists.map((artist) => {
      const artId = artist.mbid;
      // If we don't have an mbid, we can't match against DB (UUID required)
      const existing = artId ? existingArtists.find((e) => e.mbid === artId) : undefined;

      let status: SyncArtistStatus = 'new';
      if (existing) {
        // existing.followers is populated by findArtistsWithConcerts
        if (existing.followers && existing.followers.length > 0) {
          status = 'following';
        } else {
          // Check if there is any upcoming concert
          const hasUpcomingConcert = existing.concerts.some(
            ({ concert }) => concert.endDate >= now
          );
          status = hasUpcomingConcert ? 'exists' : 'new';
        }
      }

      return {
        ...artist,
        status,
        dbId: existing?.id ? String(existing.id) : undefined,
        imageUrl: artist.image.find((i) => i.size === 'large')?.['#text'],
      };
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('fetchMyLastFmArtists error:', error);
    return { success: false, error: '서버 에러가 발생했습니다.' };
  }
}

export async function syncLastFmArtists(userId: string, artists: LastFmTopArtist[]) {
  try {
    // 1. Bulk Insert Artists (Performance Optimized)
    // Map to db structure
    // Only insert artists with MBID
    const artistsToCreate = artists
      .filter((a) => a.mbid)
      .map((artist) => ({
        name: artist.name,
        image: artist.image.find((i) => i.size === 'large')?.['#text'],
        mbid: artist.mbid!,
        followerCount: 0,
      }));

    await ArtistRepository.createArtistsMany(artistsToCreate);

    // Fetch currently stored artists to get their internal IDs
    const lastfmIds = artists.map((a) => a.mbid).filter((id): id is string => !!id);
    const dbArtists = await ArtistRepository.findExistingArtists(lastfmIds);

    // 2. Bulk Insert UserArtist
    const artistIds = dbArtists.map((a) => a.id);
    const existingFollows = await ArtistRepository.findUserArtists(userId, artistIds);
    const existingArtistIds = new Set(existingFollows.map((f) => f.artistId));

    const newFollows = dbArtists
      .filter((a) => !existingArtistIds.has(a.id))
      .map((a) => ({
        userId,
        artistId: a.id,
      }));

    let addedCount = 0;
    if (newFollows.length > 0) {
      const result = await ArtistRepository.createUserArtistsMany(newFollows);
      addedCount = result.count;
    }

    return { success: true, count: addedCount };
  } catch (error) {
    console.error('syncLastFmArtists error:', error);
    return { success: false, error: '동기화 중 오류가 발생했습니다.' };
  }
}
