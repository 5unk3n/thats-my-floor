import { prisma } from '@/shared/lib/prisma';

// --- Pure Data Access (Repository) ---

export const findArtistById = async (id: number) => {
  return prisma.artist.findUnique({
    where: { id },
  });
};

export const findArtistConcerts = async (id: number) => {
  return prisma.artist.findUnique({
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
};

export const toggleArtistFollow = async (userId: string, artistId: number) => {
  const existing = await prisma.userArtist.findUnique({
    where: {
      userId_artistId: {
        userId,
        artistId,
      },
    },
  });

  if (existing) {
    await prisma.userArtist.delete({
      where: {
        userId_artistId: {
          userId,
          artistId,
        },
      },
    });
    return false;
  } else {
    await prisma.userArtist.create({
      data: {
        userId,
        artistId,
      },
    });
    return true;
  }
};

export const existsArtistFollow = async (userId: string, artistId: number) => {
  const count = await prisma.userArtist.count({
    where: {
      userId,
      artistId,
    },
  });
  return count > 0;
};

export const findFollowedArtists = async (userId: string) => {
  const userArtists = await prisma.userArtist.findMany({
    where: { userId },
    include: { artist: true },
    orderBy: { createdAt: 'desc' },
  });
  return userArtists.map((ua) => ua.artist);
};

// --- Last.fm Sync Related Queries ---

export const findArtistsByLastfmIds = async (lastfmIds: string[], userId: string) => {
  return prisma.artist.findMany({
    where: {
      mbid: { in: lastfmIds },
    },
    include: {
      followers: {
        where: { userId: userId },
      },
      concerts: {
        include: {
          concert: {
            select: {
              endDate: true,
              startDate: true, // Added for completeness if needed logic
            },
          },
        },
      },
    },
  });
};

export const createArtistsMany = async (
  artists: {
    name: string;
    image?: string;
    genre?: string;
    mbid: string;
    followerCount?: number;
  }[]
) => {
  return prisma.artist.createMany({
    data: artists,
    skipDuplicates: true,
  });
};

export const findArtistsByLastfmIdList = async (lastfmIds: string[]) => {
  return prisma.artist.findMany({
    where: {
      mbid: { in: lastfmIds },
    },
  });
};

export const findUserArtists = async (userId: string, artistIds: number[]) => {
  return prisma.userArtist.findMany({
    where: {
      userId,
      artistId: { in: artistIds },
    },
    select: { artistId: true },
  });
};

export const createUserArtistsMany = async (
  follows: {
    userId: string;
    artistId: number;
  }[]
) => {
  return prisma.userArtist.createMany({
    data: follows,
    skipDuplicates: true,
  });
};
