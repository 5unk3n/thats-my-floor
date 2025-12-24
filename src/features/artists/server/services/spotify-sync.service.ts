import { prisma } from '@/shared/lib/prisma';
import { SpotifyService } from '@/shared/lib/spotify/client';
import { SpotifyArtist } from '@/shared/lib/spotify/types';

export type SyncArtistStatus = 'new' | 'exists' | 'following';

export interface SpotifySyncArtist extends SpotifyArtist {
  status: SyncArtistStatus;
  dbId?: string;
}

export async function fetchMySpotifyArtists(
  accessToken: string,
  userId: string,
  after?: string
): Promise<{
  success: boolean;
  data?: SpotifySyncArtist[];
  nextCursor?: string | null;
  error?: string;
}> {
  try {
    // 1. Fetch from Spotify
    const response = await SpotifyService.getFollowedArtists(accessToken, 20, after);

    if (!response) {
      return { success: false, error: '아티스트 목록을 가져오는데 실패했습니다.' };
    }

    const spotifyArtists = response.artists.items;
    const nextCursor = response.artists.cursors.after;

    // 2. Check DB status
    const spotifyIds = spotifyArtists.map((a) => a.id);
    const existingArtists = await prisma.artist.findMany({
      where: {
        spotifyArtistId: { in: spotifyIds },
      },
      include: {
        followers: {
          where: { userId: userId },
        },
        concerts: {
          include: {
            concert: {
              select: {
                endDate: true,
              },
            },
          },
        },
      },
    });

    const now = new Date();

    // 3. Merge data
    const result: SpotifySyncArtist[] = spotifyArtists.map((artist) => {
      const existing = existingArtists.find((e) => e.spotifyArtistId === artist.id);

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
      };
    });

    return { success: true, data: result, nextCursor };
  } catch (error) {
    console.error('fetchMySpotifyArtists error:', error);
    return { success: false, error: '서버 에러가 발생했습니다.' };
  }
}

export async function syncSpotifyArtists(userId: string, artists: SpotifyArtist[]) {
  try {
    // 1. Bulk Insert Artists (Performance Optimized)
    // Updates are less critical, so we use createMany to avoid timeouts with large batches.
    await prisma.artist.createMany({
      data: artists.map((artist) => ({
        name: artist.name,
        image: artist.images[0]?.url,
        genre: artist.genres[0],
        spotifyArtistId: artist.id,
        followerCount: 0,
      })),
      skipDuplicates: true,
    });

    // Fetch currently stored artists to get their internal IDs
    const dbArtists = await prisma.artist.findMany({
      where: {
        spotifyArtistId: { in: artists.map((a) => a.id) },
      },
    });

    // 2. Bulk Insert UserArtist
    // First, find existing relations to avoid unique constraint errors (though createMany has skipDuplicates)
    // We need to count how many were actually added, so finding existing ones first is helpful.
    const artistIds = dbArtists.map((a) => a.id);

    const existingFollows = await prisma.userArtist.findMany({
      where: {
        userId,
        artistId: { in: artistIds },
      },
      select: { artistId: true },
    });

    const existingArtistIds = new Set(existingFollows.map((f) => f.artistId));

    const newFollows = dbArtists
      .filter((a) => !existingArtistIds.has(a.id))
      .map((a) => ({
        userId,
        artistId: a.id,
      }));

    let addedCount = 0;
    if (newFollows.length > 0) {
      const result = await prisma.userArtist.createMany({
        data: newFollows,
        skipDuplicates: true,
      });
      addedCount = result.count;
    }

    return { success: true, count: addedCount };
  } catch (error) {
    console.error('syncSpotifyArtists error:', error);
    return { success: false, error: '동기화 중 오류가 발생했습니다.' };
  }
}
