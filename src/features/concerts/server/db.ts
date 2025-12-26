import { Prisma, PublishStatus } from '@prisma/client';
import { cacheTag } from 'next/cache';

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

export interface ConcertFilterParams {
  page?: number;
  size?: number;
  type?: 'DOMESTIC' | 'GLOBAL' | 'FESTIVAL';
  startDate?: string;
  endDate?: string;
  keyword?: string;
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
  artists: { id: string; name: string }[];
}

export const concertService = {
  getConcerts: async (params: ConcertFilterParams): Promise<Concert[]> => {
    'use cache';
    cacheTag('concerts');
    if (params.type) {
      cacheTag(`concerts-${params.type}`);
    }

    const { page = 1, size = 20, type, startDate, endDate, keyword } = params;

    // Default date range: Today to 1 month later if not specified
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    const st = startDate
      ? new Date(startDate.slice(0, 4) + '-' + startDate.slice(4, 6) + '-' + startDate.slice(6, 8))
      : today;

    const ed = endDate
      ? new Date(endDate.slice(0, 4) + '-' + endDate.slice(4, 6) + '-' + endDate.slice(6, 8))
      : nextMonth;

    const where: Prisma.ConcertWhereInput = {
      publishStatus: PublishStatus.PUBLISHED,
      startDate: {
        gte: st,
        lte: ed,
      },
    };

    if (type === 'GLOBAL') {
      where.isGlobal = true;
    } else if (type === 'FESTIVAL') {
      where.isFestival = true;
    } else if (type === 'DOMESTIC') {
      where.isGlobal = false;
      where.isFestival = false;
    }

    if (keyword) {
      where.title = { contains: keyword, mode: 'insensitive' };
    }

    const concerts = await prisma.concert.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      orderBy: { startDate: 'asc' },
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
    'use cache';
    cacheTag(`concert-detail-${id}`);
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
        relates = (
          concert.relates as Array<{
            relatenm?: string;
            name?: string;
            relateurl?: string;
            url?: string;
          }>
        )
          .map((item) => ({
            name: item.relatenm || item.name || '',
            url: item.relateurl || item.url || '',
          }))
          .filter((link) => link.name && link.url);
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
        artists: concert.artists.map((a) => ({ id: a.artist.id, name: a.artist.name })),
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

  updateConcertStatus: async (id: string, status: string) => {
    return prisma.concert.update({
      where: { id },
      data: { status },
    });
  },

  getRecentConcertsForStaticParams: async (take: number = 100) => {
    return prisma.concert.findMany({
      where: {
        status: 'OPEN',
        publishStatus: PublishStatus.PUBLISHED,
      },
      orderBy: {
        startDate: 'desc',
      },
      take,
      select: {
        id: true,
      },
    });
  },

  getConcertsByArtistId: async (artistId: string) => {
    const concerts = await prisma.concert.findMany({
      where: {
        artists: {
          some: {
            artistId: artistId,
          },
        },
      },
      orderBy: {
        startDate: 'desc',
      },
      select: {
        id: true,
        title: true,
        posterUrl: true,
        startDate: true,
        endDate: true,
        place: true,
        status: true,
      },
    });

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0].replace(/-/g, '.');
    };

    return concerts.map((c) => ({
      id: c.id,
      title: c.title,
      posterUrl: c.posterUrl || '',
      startDate: formatDate(c.startDate),
      endDate: formatDate(c.endDate),
      place: c.place,
      status: c.status || 'OPEN',
    }));
  },
};
