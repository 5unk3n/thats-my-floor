'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { ArtistRepository, ArtistService } from '@/entities/artist';
import { UserRepository } from '@/entities/user';
import { ERROR_CODES } from '@/shared/constants/error-codes';
import { authOptions } from '@/shared/lib/auth';
import { ActionResponse } from '@/shared/types/action-response';

import {
  fetchMyLastFmArtists,
  LastFmSyncArtist,
  syncLastFmArtists,
} from '../model/services/lastfm-sync.service';

export async function toggleFollow(artistId: string): Promise<ActionResponse<boolean>> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  try {
    const isFollowing = await ArtistService.toggleArtistFollow(
      session.user.id,
      artistId // Passed as string (MBID)
    );
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
    const status = await ArtistService.getArtistFollowStatus(
      session.user.id,
      artistId // Passed as string (MBID)
    );
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
    const artists = await ArtistRepository.findFollowedArtists(session.user.id);
    return { success: true, data: artists };
  } catch (error) {
    console.error('getFollowedArtists Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to fetch artists' },
    };
  }
}

// --- Last.fm Sync Actions ---

export async function fetchMyLastFmArtistsAction(
  username?: string,
  period: 'overall' | '7day' | '1month' | '3month' | '6month' | '12month' = 'overall'
): Promise<ActionResponse<{ artists: LastFmSyncArtist[] }>> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: '로그인이 필요합니다.' },
    };
  }

  let targetUsername = username;

  // If no username provided, try to get from connected account
  if (!targetUsername) {
    const account = await UserRepository.findAccount(session.user.id, 'lastfm');
    if (!account) {
      return {
        success: false,
        error: { code: ERROR_CODES.BAD_REQUEST, message: '연동된 Last.fm 계정이 없습니다.' },
      };
    }
    targetUsername = account.providerAccountId;
  }

  const result = await fetchMyLastFmArtists(targetUsername!, session.user.id, 50, period);

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
    data: { artists: result.data || [] },
  };
}

export async function syncLastFmArtistsAction(
  artists: LastFmSyncArtist[]
): Promise<ActionResponse<{ count: number }>> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  const result = await syncLastFmArtists(session.user.id, artists);
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
