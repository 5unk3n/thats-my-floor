import { Prisma, PublishStatus } from '@prisma/client';

import { prisma } from '@/shared/lib/prisma';

export const findConcerts = async (params: {
  where: Prisma.ConcertWhereInput;
  page: number;
  size: number;
}) => {
  return prisma.concert.findMany({
    where: params.where,
    skip: (params.page - 1) * params.size,
    take: params.size,
    orderBy: { startDate: 'asc' },
  });
};

export const findConcertById = async (id: string) => {
  return prisma.concert.findUnique({
    where: { id },
    include: {
      artists: {
        include: {
          artist: true,
        },
      },
    },
  });
};

export const upsertConcertWithArtist = async (data: {
  kopisId: string;
  title: string;
  startDate: string;
  endDate: string;
  place: string;
  region?: string;
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
      region: data.region,
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
      region: data.region,
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
    const artistIdNum = parseInt(data.artistId, 10);
    if (!isNaN(artistIdNum)) {
      const existing = await prisma.concertArtist.findUnique({
        where: {
          concertId_artistId: {
            concertId: concert.id,
            artistId: artistIdNum,
          },
        },
      });

      if (!existing) {
        await prisma.concertArtist.create({
          data: {
            concertId: concert.id,
            artistId: artistIdNum,
            role: 'MAIN',
          },
        });
      }
    }
  }

  return concert;
};

export const findArtistByName = async (name: string) => {
  return prisma.artist.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
  });
};

export const updateConcertStatus = async (id: string, status: string) => {
  return prisma.concert.update({
    where: { id },
    data: { status },
  });
};

export const findRecentConcertsForStaticParams = async (take: number = 100) => {
  return prisma.concert.findMany({
    where: {
      publishStatus: PublishStatus.PUBLISHED,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take,
    select: {
      id: true,
    },
  });
};

export const findConcertsByArtistId = async (artistId: number) => {
  const concerts = await prisma.concert.findMany({
    where: {
      artists: {
        some: {
          artistId: artistId,
        },
      },
      publishStatus: {
        equals: PublishStatus.PUBLISHED,
      },
      status: {
        equals: '공연예정',
      },
    },
    orderBy: {
      createdAt: 'desc',
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
    status: c.status,
  }));
};
