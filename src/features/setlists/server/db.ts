import { prisma } from '@/shared/lib/prisma';

import { CreateSetlistInput } from '../types';

export const findSetlistByConcertId = async (concertId: string) => {
  return prisma.setlist.findFirst({
    where: { concertId },
    include: {
      tracks: {
        orderBy: {
          orderNumber: 'asc',
        },
      },
    },
  });
};

export const createSetlist = async (data: CreateSetlistInput) => {
  return prisma.setlist.create({
    data: {
      concertId: data.concertId,
      artistId: data.artistId,
      date: data.date,
      venue: data.venue,
      tracks: {
        create: data.tracks.map((track) => ({
          title: track.title,
          orderNumber: track.orderNumber,
          duration: track.duration,
        })),
      },
    },
    include: {
      tracks: true,
    },
  });
};
