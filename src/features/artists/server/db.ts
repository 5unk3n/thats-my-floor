import { prisma } from '@/shared/lib/prisma';

// --- Pure Data Access (Repository) ---

export const findArtistById = async (id: string) => {
  return prisma.artist.findUnique({
    where: { id },
  });
};

export const findArtistConcerts = async (id: string) => {
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

export const toggleFollowInDB = async (userId: string, artistId: string) => {
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

export const getFollowStatusFromDB = async (userId: string, artistId: string) => {
  const count = await prisma.userArtist.count({
    where: {
      userId,
      artistId,
    },
  });
  return count > 0;
};

export const getFollowedArtistsFromDB = async (userId: string) => {
  const userArtists = await prisma.userArtist.findMany({
    where: { userId },
    include: { artist: true },
    orderBy: { createdAt: 'desc' },
  });
  return userArtists.map((ua) => ua.artist);
};

// --- Spotify Sync Related Queries ---

export const findArtistsBySpotifyIds = async (spotifyIds: string[], userId: string) => {
  return prisma.artist.findMany({
    where: {
      spotifyArtistId: { in: spotifyIds },
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
    spotifyArtistId: string;
    followerCount?: number;
  }[]
) => {
  return prisma.artist.createMany({
    data: artists,
    skipDuplicates: true,
  });
};

export const findArtistsBySpotifyIdList = async (spotifyIds: string[]) => {
  return prisma.artist.findMany({
    where: {
      spotifyArtistId: { in: spotifyIds },
    },
  });
};

export const findUserArtists = async (userId: string, artistIds: string[]) => {
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
    artistId: string;
  }[]
) => {
  return prisma.userArtist.createMany({
    data: follows,
    skipDuplicates: true,
  });
};
