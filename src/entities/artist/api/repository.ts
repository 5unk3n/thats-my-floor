import { prisma } from '@/shared/lib/prisma';

// --- Pure Data Access (Repository) ---

// Helper to fetch names from MusicBrainz
export const enrichArtistsWithMetadata = async <T extends { mbid: string }>(artists: T[]) => {
  if (artists.length === 0) return [];
  const mbids = artists.map((a) => a.mbid);
  const mbArtists = await prisma.musicBrainzArtist.findMany({
    where: { gid: { in: mbids } },
    select: { gid: true, name: true },
  });
  const mbArtistMap = new Map(mbArtists.map((a) => [a.gid, a.name]));

  return artists.map((a) => ({
    ...a,
    name: mbArtistMap.get(a.mbid) || 'Unknown Artist',
  }));
};

export const findArtistById = async (id: number) => {
  const artist = await prisma.artist.findUnique({
    where: { id },
  });

  if (!artist) return null;

  const [enriched] = await enrichArtistsWithMetadata([artist]);
  return {
    ...enriched,
    genre: '', // Schema doesn't have genre yet
    description: '', // Schema doesn't have description yet
  };
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

  const rawArtists = userArtists.map((ua) => ua.artist);
  return enrichArtistsWithMetadata(rawArtists);
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
  const data = artists.map((a) => ({
    mbid: a.mbid,
    imageUrl: a.image,
  }));

  return prisma.artist.createMany({
    data,
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

export const findSubscribedFollowers = async (artistIds: number[]) => {
  return prisma.userArtist.findMany({
    where: {
      artistId: { in: artistIds },
      user: {
        notificationSettings: {
          concertRegistrationAlert: true,
        },
      },
    },
    include: {
      user: {
        include: {
          devices: true,
        },
      },
    },
  });
};
