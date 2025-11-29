import { prisma } from '@/shared/lib/prisma';

export const getFollowStatusFromDB = async (userId: string, artistId: string) => {
  const follow = await prisma.userArtist.findUnique({
    where: {
      userId_artistId: {
        userId,
        artistId,
      },
    },
  });
  return !!follow;
};

export const toggleFollowInDB = async (userId: string, artistId: string) => {
  const existingFollow = await prisma.userArtist.findUnique({
    where: {
      userId_artistId: {
        userId,
        artistId,
      },
    },
  });

  if (existingFollow) {
    await prisma.userArtist.delete({
      where: {
        userId_artistId: {
          userId,
          artistId,
        },
      },
    });
    return false; // Unfollowed
  } else {
    await prisma.userArtist.create({
      data: {
        userId,
        artistId,
      },
    });
    return true; // Followed
  }
};

export const getFollowedArtistsFromDB = async (userId: string) => {
  const followedArtists = await prisma.userArtist.findMany({
    where: {
      userId,
    },
    include: {
      artist: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return followedArtists.map((fa) => fa.artist);
};
