import { cacheLife, cacheTag } from 'next/cache';

import * as artistRepository from '@/features/artists/server/db';

import { ArtistDetail } from '../../types';

export const getArtistProfile = async (
  id: string
): Promise<Omit<ArtistDetail, 'concerts'> | null> => {
  'use cache';
  cacheLife('max');
  cacheTag(`artist-profile-${id}`);

  try {
    const artist = await artistRepository.findArtistById(id);

    if (!artist) return null;

    return {
      id: artist.id,
      name: artist.name,
      image: artist.image || '',
      genre: artist.genre || '',
      description: artist.description || '',
      lastfmArtistId: artist.lastfmArtistId,
    };
  } catch (error) {
    console.error('Failed to fetch artist profile:', error);
    return null;
  }
};

export const getArtistConcerts = async (id: string) => {
  'use cache';
  cacheLife('max');
  cacheTag(`artist-concerts-${id}`);

  try {
    const artist = await artistRepository.findArtistConcerts(id);

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

export const getArtistDetail = async (id: string): Promise<ArtistDetail | null> => {
  const profile = await getArtistProfile(id);
  if (!profile) return null;
  const concerts = await getArtistConcerts(id);
  return { ...profile, concerts };
};
