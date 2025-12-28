'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { ERROR_CODES } from '@/shared/constants/error-codes';
import { authOptions } from '@/shared/lib/auth';
import { ActionResponse } from '@/shared/types/action-response';

import { existsArtistFollow, findFollowedArtists, toggleArtistFollow } from './db';
import * as SpotifySyncService from './services/spotify-sync.service';
import { SpotifySyncArtist } from './services/spotify-sync.service';

export async function toggleFollow(artistId: string): Promise<ActionResponse<boolean>> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  try {
    const isFollowing = await toggleArtistFollow(session.user.id, artistId);
    revalidatePath('/mypage/artists');
    revalidatePath(`/artists/${artistId}`);
    return { success: true, data: isFollowing };
  } catch (error) {
    console.error('toggleFollow Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to toggle follow' },
    };
  }
}

export async function getFollowStatus(artistId: string): Promise<ActionResponse<boolean>> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: true, data: false };
  }

  try {
    const status = await existsArtistFollow(session.user.id, artistId);
    return { success: true, data: status };
  } catch (error) {
    console.error('getFollowStatus Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to get status' },
    };
  }
}

export async function getFollowedArtists(): Promise<ActionResponse<unknown[]>> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  try {
    const artists = await findFollowedArtists(session.user.id);
    return { success: true, data: artists };
  } catch (error) {
    console.error('getFollowedArtists Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to fetch artists' },
    };
  }
}

// --- Spotify Sync Actions ---

export async function fetchMySpotifyArtistsAction(
  after?: string
): Promise<ActionResponse<{ artists: SpotifySyncArtist[]; nextCursor: string | null }>> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.accessToken || !session.user.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Spotify 계정 연동이 필요합니다.' },
    };
  }

  const result = await SpotifySyncService.fetchMySpotifyArtists(
    session.user.accessToken,
    session.user.id,
    after
  );

  if (!result.success) {
    return {
      success: false,
      error: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: result.error || 'Server Error',
      },
    };
  }

  return {
    success: true,
    data: { artists: result.data || [], nextCursor: result.nextCursor || null },
  };
}

export async function syncSpotifyArtistsAction(
  artists: SpotifySyncArtist[]
): Promise<ActionResponse<{ count: number }>> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  const result = await SpotifySyncService.syncSpotifyArtists(session.user.id, artists);
  if (!result.success) {
    return {
      success: false,
      error: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: result.error || 'Sync Failed',
      },
    };
  }

  return { success: true, data: { count: result.count! } };
}
