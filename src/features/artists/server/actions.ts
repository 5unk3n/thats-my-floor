'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/shared/lib/auth';

import { getFollowedArtistsFromDB, getFollowStatusFromDB, toggleFollowInDB } from './db';

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
