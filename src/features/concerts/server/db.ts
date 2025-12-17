import { Prisma, PublishStatus } from '@prisma/client';

import { prisma } from '@/shared/lib/prisma';

export interface Concert {
  id: string;
  title: string;
  posterUrl: string;
  startDate: string;
  endDate: string;
  place: string;
  status: string;
}

export interface BookingLink {
  name: string;
  url: string;
}

export interface ConcertDetail extends Concert {
  runtime: string;
  price: string;
  description: string;
  images: string[];
  schedule: string;
  relates: BookingLink[];
}

export const concertService = {
  getConcerts: async (params: {
    startDate: string;
    endDate: string;
    page: number;
    size: number;
  }): Promise<Concert[]> => {
    const concerts = await prisma.concert.findMany({
      where: {
        endDate: { gte: new Date(params.startDate) },
        startDate: { lte: new Date(params.endDate) },
      },
      skip: (params.page - 1) * params.size,
      take: params.size,
      orderBy: { startDate: 'desc' },
    });

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0].replace(/-/g, '.');
    };

    return concerts.map((item) => ({
      id: item.id,
      title: item.title,
      posterUrl: item.posterUrl || '',
      startDate: formatDate(item.startDate),
      endDate: formatDate(item.endDate),
      place: item.place,
      status: item.status || 'OPEN',
    }));
  },

  getConcertDetail: async (id: string): Promise<ConcertDetail | null> => {
    try {
      const concert = await prisma.concert.findUnique({
        where: { id },
        include: {
          artists: {
            include: {
              artist: true,
            },
          },
        },
      });

      if (!concert) return null;

      // Parse relates (booking links) safely
      let relates: BookingLink[] = [];
      if (concert.relates && Array.isArray(concert.relates)) {
        relates = concert.relates as unknown as BookingLink[];
      }

      const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0].replace(/-/g, '.');
      };

      return {
        id: concert.id,
        title: concert.title,
        posterUrl: concert.posterUrl || '',
        startDate: formatDate(concert.startDate),
        endDate: formatDate(concert.endDate),
        place: concert.place,
        status: concert.status || 'OPEN',
        runtime: concert.runtime || '',
        price: concert.price || '',
        description: concert.description || '',
        images: concert.images,
        schedule: concert.schedule || '',
        relates,
      };
    } catch (error) {
      console.error('Failed to fetch concert detail from DB:', error);
      return null;
    }
  },

  upsertConcert: async (data: {
    kopisId: string;
    title: string;
    startDate: string;
    endDate: string;
    place: string;
    area?: string; // region in DB, area in KOPIS
    posterUrl?: string;
    status?: string;
    runtime?: string;
    price?: string;
    schedule?: string;
    description?: string;
    images?: string[];
    relates?: Prisma.InputJsonValue[];
    isGlobal?: boolean;
    isFestival?: boolean;
    artistId?: string;
  }) => {
    const concert = await prisma.concert.upsert({
      where: { kopisId: data.kopisId },
      update: {
        title: data.title,
        posterUrl: data.posterUrl,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        place: data.place,
        region: data.area,
        status: data.status,
        runtime: data.runtime,
        price: data.price,
        schedule: data.schedule,
        description: data.description,
        images: data.images || [],
        relates: data.relates || [],
        isGlobal: data.isGlobal || false,
        isFestival: data.isFestival || false,
      },
      create: {
        kopisId: data.kopisId,
        title: data.title,
        posterUrl: data.posterUrl,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        place: data.place,
        region: data.area,
        status: data.status,
        runtime: data.runtime,
        price: data.price,
        schedule: data.schedule,
        description: data.description,
        images: data.images || [],
        relates: data.relates || [],
        isGlobal: data.isGlobal || false,
        isFestival: data.isFestival || false,
        publishStatus: PublishStatus.DRAFT,
      },
    });

    if (data.artistId) {
      // Check for existing relation to avoid duplicates
      const existing = await prisma.concertArtist.findUnique({
        where: {
          concertId_artistId: {
            concertId: concert.id,
            artistId: data.artistId,
          },
        },
      });

      if (!existing) {
        await prisma.concertArtist.create({
          data: {
            concertId: concert.id,
            artistId: data.artistId,
            role: 'MAIN', // Default role for collector-matched artists
          },
        });
      }
    }

    return concert;
  },

  findArtistByName: async (name: string) => {
    // Simple exact match for now.
    // In real world, might need fuzzy search or normalization.
    return prisma.artist.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });
  },
};
