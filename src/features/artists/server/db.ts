import { cacheTag } from 'next/cache';

import { prisma } from '@/shared/lib/prisma';

import { ArtistDetail } from '../types';

export const getArtistProfile = async (
  id: string
): Promise<Omit<ArtistDetail, 'concerts'> | null> => {
  'use cache';
  cacheTag(`artist-profile-${id}`);

  try {
    const artist = await prisma.artist.findUnique({
      where: { id },
    });

    if (!artist) return null;

    return {
      id: artist.id,
      name: artist.name,
      image: artist.image || '',
      genre: artist.genre || '',
      description: artist.description || '',
      spotifyArtistId: artist.spotifyArtistId,
    };
  } catch (error) {
    console.error('Failed to fetch artist profile:', error);
    return null;
  }
};

export const getArtistConcerts = async (id: string) => {
  'use cache';
  cacheTag(`artist-concerts-${id}`);

  try {
    const artist = await prisma.artist.findUnique({
      where: { id },
      include: {
        concerts: {
          include: {
            concert: true,
          },
          orderBy: {
            concert: {
              startDate: 'desc',
            },
          },
        },
      },
    });

    if (!artist) return [];

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0].replace(/-/g, '.');
    };

    return artist.concerts.map(({ concert }) => ({
      id: concert.id,
      title: concert.title,
      posterUrl: concert.posterUrl || '',
      startDate: formatDate(concert.startDate),
      endDate: formatDate(concert.endDate),
      place: concert.place,
      status: concert.status || 'OPEN',
    }));
  } catch (error) {
    console.error('Failed to fetch artist concerts:', error);
    return [];
  }
};

// Deprecated or kept for compatibility if needed, but better to remove if unused.
// Re-implementing using the above functions to avoid duplicate code logic if we were keeping it,
// but for now let's just expose the split functions.
export const getArtistDetail = async (id: string): Promise<ArtistDetail | null> => {
  // 'use cache'; // Composition of cached functions might be tricky.
  // Ideally, consumers should call getArtistProfile and getArtistConcerts separately.
  // But to minimize refactor, we can implement it:
  const profile = await getArtistProfile(id);
  if (!profile) return null;
  const concerts = await getArtistConcerts(id);
  return { ...profile, concerts };
};

export const toggleFollowInDB = async (userId: string, artistId: string) => {
  const existing = await prisma.userArtist.findUnique({
    where: {
      userId_artistId: {
        userId,
        artistId,
      },
    },
  });

  if (existing) {
    await prisma.userArtist.delete({
      where: {
        userId_artistId: {
          userId,
          artistId,
        },
      },
    });
    return false;
  } else {
    await prisma.userArtist.create({
      data: {
        userId,
        artistId,
      },
    });
    return true;
  }
};

export const getFollowStatusFromDB = async (userId: string, artistId: string) => {
  const count = await prisma.userArtist.count({
    where: {
      userId,
      artistId,
    },
  });
  return count > 0;
};

export const getFollowedArtistsFromDB = async (userId: string) => {
  const userArtists = await prisma.userArtist.findMany({
    where: { userId },
    include: { artist: true },
    orderBy: { createdAt: 'desc' },
  });
  return userArtists.map((ua) => ua.artist);
};
