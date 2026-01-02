import { lastFmClient } from '@/shared/lib/lastfm/client';
import { LastFmTopArtist } from '@/shared/lib/lastfm/types';

import * as artistRepository from '../db';

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
    const lastfmIds = topArtists.map((a) => a.mbid || a.url); // Use URL as fallback ID if MBID missing

    // Check repository capability.
    const existingArtists = await artistRepository.findArtistsByLastfmIds(lastfmIds, userId);

    const now = new Date();

    const result: LastFmSyncArtist[] = topArtists.map((artist) => {
      const artId = artist.mbid || artist.url;
      const existing = existingArtists.find((e) => e.lastfmArtistId === artId);

      let status: SyncArtistStatus = 'new';
      if (existing) {
        if (existing.followers.length > 0) {
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
        dbId: existing?.id,
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
    await artistRepository.createArtistsMany(
      artists.map((artist) => ({
        name: artist.name,
        image: artist.image.find((i) => i.size === 'large')?.['#text'],
        lastfmArtistId: artist.mbid || artist.url,
        followerCount: 0,
      }))
    );

    // Fetch currently stored artists to get their internal IDs
    const lastfmIds = artists.map((a) => a.mbid || a.url);
    const dbArtists = await artistRepository.findArtistsByLastfmIdList(lastfmIds);

    // 2. Bulk Insert UserArtist
    const artistIds = dbArtists.map((a) => a.id);
    const existingFollows = await artistRepository.findUserArtists(userId, artistIds);
    const existingArtistIds = new Set(existingFollows.map((f) => f.artistId));

    const newFollows = dbArtists
      .filter((a) => !existingArtistIds.has(a.id))
      .map((a) => ({
        userId,
        artistId: a.id,
      }));

    let addedCount = 0;
    if (newFollows.length > 0) {
      const result = await artistRepository.createUserArtistsMany(newFollows);
      addedCount = result.count;
    }

    return { success: true, count: addedCount };
  } catch (error) {
    console.error('syncLastFmArtists error:', error);
    return { success: false, error: '동기화 중 오류가 발생했습니다.' };
  }
}
