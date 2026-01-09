import { Prisma } from '@prisma/client';

import { prisma } from '@/shared/lib/prisma';

// Individual function exports
export async function findMusicBrainzArtistsByName(query: string, limit = 20) {
  return prisma.musicBrainzArtist.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        {
          aliases: {
            some: {
              name: { contains: query, mode: 'insensitive' },
            },
          },
        },
      ],
    },
    take: limit,
    include: {
      aliases: {
        where: {
          name: { contains: query, mode: 'insensitive' },
        },
        take: 1,
      },
    },
  });
}

export async function findLocalArtistsByMbids(mbids: string[]) {
  return prisma.artist.findMany({
    where: { mbid: { in: mbids } },
    select: { mbid: true, imageUrl: true },
  });
}

export async function findMusicBrainzArtistByGid(gid: string) {
  return prisma.musicBrainzArtist.findUnique({
    where: { gid },
    include: {
      aliases: true,
      artistLinks: {
        include: {
          url: true,
          linkDef: {
            include: {
              linkType: true,
            },
          },
        },
      },
    },
  });
}

export async function findLocalArtistByMbid(mbid: string) {
  return prisma.artist.findUnique({
    where: { mbid },
    include: {
      customAliases: true,
    },
  });
}

export async function createLocalArtist(data: Prisma.ArtistCreateInput) {
  return prisma.artist.create({
    data,
  });
}

export async function upsertLocalArtist(gid: string, data: Prisma.ArtistCreateInput) {
  return prisma.artist.upsert({
    where: { mbid: gid },
    create: { ...data, mbid: gid },
    update: data,
  });
}

export async function findUserArtist(userId: string, artistId: number) {
  return prisma.userArtist.findUnique({
    where: {
      userId_artistId: {
        userId,
        artistId,
      },
    },
  });
}

export async function createUserArtist(userId: string, artistId: number) {
  return prisma.userArtist.create({
    data: {
      userId,
      artistId,
    },
  });
}

export async function deleteUserArtist(id: number) {
  return prisma.userArtist.delete({
    where: { id },
  });
}

export async function findFollowedArtists(userId: string) {
  const follows = await prisma.userArtist.findMany({
    where: { userId },
    include: {
      artist: true,
    },
  });

  return follows.map((f) => f.artist);
}

export async function findArtistsByLastfmIds(mbids: string[], userId?: string) {
  return prisma.artist.findMany({
    where: {
      mbid: { in: mbids },
    },
    include: {
      followers: userId
        ? {
            where: { userId },
          }
        : false,
      concerts: {
        select: {
          concert: {
            select: {
              endDate: true,
            },
          },
        },
        where: {
          concert: {
            endDate: {
              gte: new Date(),
            },
          },
        },
      },
    },
  });
}

export async function findArtistsByLastfmIdList(mbids: string[]) {
  return prisma.artist.findMany({
    where: { mbid: { in: mbids } },
    select: { id: true, mbid: true },
  });
}

export async function findUserArtists(userId: string, artistIds: number[]) {
  return prisma.userArtist.findMany({
    where: {
      userId,
      artistId: { in: artistIds },
    },
  });
}

export async function createUserArtistsMany(follows: { userId: string; artistId: number }[]) {
  return prisma.userArtist.createMany({
    data: follows,
    skipDuplicates: true,
  });
}

export async function createArtistsMany(
  artists: { name: string; mbid: string; image?: string; followerCount?: number }[]
) {
  return prisma.$transaction(
    artists.map((a) =>
      prisma.artist.upsert({
        where: { mbid: a.mbid },
        create: {
          mbid: a.mbid,
          imageUrl: a.image,
        },
        update: {
          imageUrl: a.image,
        },
      })
    )
  );
}
