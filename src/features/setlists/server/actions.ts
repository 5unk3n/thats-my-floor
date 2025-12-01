'use server';

import { prisma } from '@/shared/lib/prisma';
import { CreateSetlistInput, Setlist } from '../types';

export async function getSetlistByConcertId(concertId: string): Promise<Setlist | null> {
  try {
    const setlist = await prisma.setlist.findFirst({
      where: { concertId },
      include: {
        tracks: {
          orderBy: {
            orderNumber: 'asc',
          },
        },
      },
    });

    return setlist;
  } catch (error) {
    console.error('Failed to fetch setlist:', error);
    return null;
  }
}

export async function createSetlist(data: CreateSetlistInput): Promise<Setlist | null> {
  try {
    const setlist = await prisma.setlist.create({
      data: {
        concertId: data.concertId,
        artistId: data.artistId,
        date: data.date,
        venue: data.venue,
        tracks: {
          create: data.tracks.map((track) => ({
            title: track.title,
            orderNumber: track.orderNumber,
            spotifyTrackId: track.spotifyTrackId,
            duration: track.duration,
          })),
        },
      },
      include: {
        tracks: true,
      },
    });

    return setlist;
  } catch (error) {
    console.error('Failed to create setlist:', error);
    return null;
  }
}
