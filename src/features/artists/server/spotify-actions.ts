'use server';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { SpotifyService } from '@/shared/lib/spotify/client';
import { SpotifyArtist } from '@/shared/lib/spotify/types';

export type SyncArtistStatus = 'new' | 'exists' | 'following';

export interface SpotifySyncArtist extends SpotifyArtist {
  status: SyncArtistStatus;
  dbId?: string;
}

export async function fetchMySpotifyArtists(after?: string): Promise<{
  success: boolean;
  data?: SpotifySyncArtist[];
  nextCursor?: string | null;
  error?: string;
}> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.accessToken) {
      return { success: false, error: 'Spotify 계정 연동이 필요합니다.' };
    }

    // 1. Fetch from Spotify
    const response = await SpotifyService.getFollowedArtists(session.user.accessToken, 20, after);

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
          where: { userId: session.user.id },
        },
      },
    });

    // 3. Merge data
    const result: SpotifySyncArtist[] = spotifyArtists.map((artist) => {
      const existing = existingArtists.find((e) => e.spotifyArtistId === artist.id);

      let status: SyncArtistStatus = 'new';
      if (existing) {
        status = existing.followers.length > 0 ? 'following' : 'exists';
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

export async function syncSpotifyArtists(artists: SpotifyArtist[]) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    const userId = session.user.id;
    let successCount = 0;

    // Using transaction for batch processing
    // Note: Prisma upsert within loop is fine but for performance we might optimize later.
    // For manual sync (usually < 50 artists), this is acceptable.
    await prisma.$transaction(async (tx) => {
      for (const artist of artists) {
        // 1. Upsert Artist
        const dbArtist = await tx.artist.upsert({
          where: { spotifyArtistId: artist.id },
          create: {
            name: artist.name,
            image: artist.images[0]?.url,
            genre: artist.genres[0], // Take primary genre
            spotifyArtistId: artist.id,
            followerCount: 0,
          },
          update: {
            // Update info if changed
            image: artist.images[0]?.url,
            genre: artist.genres[0],
          },
        });

        // 2. Create Follow Relation (ignore if exists)
        // Using upsert on UserArtist or createMany with skipDuplicates?
        // Prisma createMany skipDuplicates is supported in Postgres.
        // But we need to do this per artist to update followerCount on Artist?
        // Let's use simple link.

        const existingFollow = await tx.userArtist.findUnique({
          where: {
            userId_artistId: {
              userId,
              artistId: dbArtist.id,
            },
          },
        });

        if (!existingFollow) {
          await tx.userArtist.create({
            data: {
              userId,
              artistId: dbArtist.id,
            },
          });

          // Increment follower count
          await tx.artist.update({
            where: { id: dbArtist.id },
            data: { followerCount: { increment: 1 } },
          });

          successCount++;
        }
      }
    });

    return { success: true, count: successCount };
  } catch (error) {
    console.error('syncSpotifyArtists error:', error);
    return { success: false, error: '동기화 중 오류가 발생했습니다.' };
  }
}
