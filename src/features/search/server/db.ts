import { PublishStatus } from '@prisma/client';

import { prisma } from '@/shared/lib/prisma';

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
