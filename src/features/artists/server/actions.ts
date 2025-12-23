'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/shared/lib/auth';

import { getFollowedArtistsFromDB, getFollowStatusFromDB, toggleFollowInDB } from './db';
import * as SpotifySyncService from './services/spotify-sync.service';

// --- Types re-exported for Client use ---
export type { SpotifySyncArtist, SyncArtistStatus } from './services/spotify-sync.service';
import { SpotifyArtist } from '@/shared/lib/spotify/types';

export async function toggleFollow(artistId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const isFollowing = await toggleFollowInDB(session.user.id, artistId);
  revalidatePath('/mypage/artists');
  revalidatePath(`/artists/${artistId}`); // Assuming artist detail page exists or will exist
  return isFollowing;
}

export async function getFollowStatus(artistId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return false;
  }

  return await getFollowStatusFromDB(session.user.id, artistId);
}

export async function getFollowedArtists() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  return await getFollowedArtistsFromDB(session.user.id);
}

// --- Spotify Sync Actions ---

export async function fetchMySpotifyArtistsAction(after?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.accessToken || !session.user.id) {
    return { success: false, error: 'Spotify 계정 연동이 필요합니다.' };
  }

  return await SpotifySyncService.fetchMySpotifyArtists(
    session.user.accessToken,
    session.user.id,
    after
  );
}

export async function syncSpotifyArtistsAction(artists: SpotifyArtist[]) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  return await SpotifySyncService.syncSpotifyArtists(session.user.id, artists);
}
