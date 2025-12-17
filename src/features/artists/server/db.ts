import { prisma } from '@/shared/lib/prisma';
import { ArtistDetail } from '../types';

export const getArtistDetail = async (id: string): Promise<ArtistDetail | null> => {
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

    if (!artist) return null;

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0].replace(/-/g, '.');
    };

    return {
      id: artist.id,
      name: artist.name,
      image: artist.image || '',
      genre: artist.genre || '',
      description: artist.description || '',
      spotifyArtistId: artist.spotifyArtistId,
      concerts: artist.concerts.map(({ concert }) => ({
        id: concert.id,
        title: concert.title,
        posterUrl: concert.posterUrl || '',
        startDate: formatDate(concert.startDate),
        endDate: formatDate(concert.endDate),
        place: concert.place,
        status: concert.status || 'OPEN',
      })),
    };
  } catch (error) {
    console.error('Failed to fetch artist detail:', error);
    return null;
  }
};
