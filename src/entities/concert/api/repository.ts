import { Concert, Prisma, PublishStatus } from '@prisma/client';

import { prisma } from '@/shared/lib/prisma';
import { PaginatedResult } from '@/shared/types/common';

// 1. 공통 필터 조건 정의
type ConcertFilter = Prisma.ConcertWhereInput;

// 2. 일반 공연 목록 조회 (페이지네이션)
export const findConcerts = async (
  where: ConcertFilter,
  page: number,
  limit: number,
  orderBy?: Prisma.ConcertOrderByWithRelationInput
): Promise<PaginatedResult<Concert>> => {
  const skip = (page - 1) * limit;

  const [total, data] = await Promise.all([
    prisma.concert.count({ where }),
    prisma.concert.findMany({
      where,
      take: limit,
      skip,
      orderBy: orderBy || { startDate: 'asc' },
    }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: total > page * limit,
  };
};

// 3. 관리자용 상태별 조회 (페이지네이션 + 아티스트 포함)
export const findConcertsByStatus = async ({
  status,
  page,
  limit,
}: {
  status: PublishStatus;
  page: number;
  limit: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<PaginatedResult<any>> => {
  const skip = (page - 1) * limit;

  const [total, data] = await Promise.all([
    prisma.concert.count({ where: { publishStatus: status } }),
    prisma.concert.findMany({
      where: { publishStatus: status },
      take: limit,
      skip,
      orderBy: { updatedAt: 'desc' },
      include: {
        artists: {
          include: {
            artist: true,
          },
        },
      },
    }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: total > page * limit,
  };
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
  const mbArtist = await prisma.musicBrainzArtist.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive',
      },
    },
  });

  if (!mbArtist) return null;

  return prisma.artist.findUnique({
    where: { mbid: mbArtist.gid },
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

export const findConcertsForSitemap = async () => {
  return prisma.concert.findMany({
    where: {
      publishStatus: PublishStatus.PUBLISHED,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    select: {
      id: true,
      updatedAt: true,
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

  return concerts;
};

export const findConcertsByArtistMbid = async (artistMbid: string) => {
  const concerts = await prisma.concert.findMany({
    where: {
      artists: {
        some: {
          artist: {
            mbid: artistMbid,
          },
        },
      },
      publishStatus: PublishStatus.PUBLISHED,
      status: '공연예정',
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

  return concerts;
};

export const searchConcerts = async (query: string, limit: number = 5) => {
  return prisma.concert.findMany({
    where: {
      publishStatus: PublishStatus.PUBLISHED,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { place: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: limit,
    select: {
      id: true,
      kopisId: true,
      title: true,
      posterUrl: true,
      startDate: true,
      endDate: true,
      place: true,
      status: true,
    },
    orderBy: {
      startDate: 'desc',
    },
  });
};

export const findConcertsByMonth = async (year: number, month: number) => {
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

  return prisma.concert.findMany({
    where: {
      publishStatus: PublishStatus.PUBLISHED,
      OR: [
        // 시작일이 해당 월 내에 있는 경우
        { startDate: { gte: startOfMonth, lte: endOfMonth } },
        // 종료일이 해당 월 내에 있는 경우
        { endDate: { gte: startOfMonth, lte: endOfMonth } },
        // 공연이 해당 월 전체를 포함하는 경우
        {
          AND: [{ startDate: { lte: startOfMonth } }, { endDate: { gte: endOfMonth } }],
        },
      ],
    },
    select: {
      id: true,
      title: true,
      startDate: true,
      endDate: true,
      isGlobal: true,
      isFestival: true,
      place: true,
      posterUrl: true,
      schedule: true,
      artists: {
        select: {
          artist: {
            select: {
              mbid: true,
            },
          },
        },
      },
    },
    orderBy: { startDate: 'asc' },
  });
};
