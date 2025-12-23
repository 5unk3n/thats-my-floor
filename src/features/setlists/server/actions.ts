'use server';

import { ERROR_CODES } from '@/shared/constants/error-codes';
import { prisma } from '@/shared/lib/prisma';
import { ActionResponse } from '@/shared/types/action-response';

import { CreateSetlistInput, Setlist } from '../types';

export async function getSetlistByConcertId(
  concertId: string
): Promise<ActionResponse<Setlist | null>> {
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

    return { success: true, data: setlist };
  } catch (error) {
    console.error('Failed to fetch setlist:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to fetch setlist' },
    };
  }
}

export async function createSetlist(data: CreateSetlistInput): Promise<ActionResponse<Setlist>> {
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

    return { success: true, data: setlist };
  } catch (error) {
    console.error('Failed to create setlist:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to create setlist' },
    };
  }
}
