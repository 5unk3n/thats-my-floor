import { Prisma } from '@prisma/client';

import { prisma } from '@/shared/lib/prisma';

import { ArtistCandidate } from '../model/types';

export async function findSpotifyUrlByMbid(mbid: string): Promise<string | null> {
  // 1. Find the URL entity linked to the artist via 'mb_l_artist_url'
  // We look for URLs containing 'open.spotify.com/artist/'
  const artistUrl = await prisma.musicBrainzArtistUrl.findFirst({
    where: {
      artist: { gid: mbid }, // Assuming mbid is the GID
      url: {
        url: {
          contains: 'open.spotify.com/artist/',
        },
      },
    },
    include: {
      url: true,
    },
  });

  return artistUrl?.url.url || null;
}

export async function updateArtistImage(artistId: number, imageUrl: string) {
  return prisma.artist.update({
    where: { id: artistId },
    data: { imageUrl },
  });
}

export async function findArtistCandidates(query: string, limit = 5) {
  return prisma.$queryRaw<ArtistCandidate[]>`
    WITH search_input AS (
        SELECT lower(unaccent(${query})) AS normalized_query
    ),
    candidates AS (
        SELECT DISTINCT ON (m.gid)
            m.gid,
            m.canonical_name,
            m.search_name AS matched_name,
            m.comment,
            m.source,
            m.is_primary,
            similarity(m.search_name_normalized, si.normalized_query) AS sim_score,
            word_similarity(m.search_name_normalized, si.normalized_query) AS word_sim_score,
            CASE 
                WHEN m.search_name_normalized LIKE si.normalized_query || '%' THEN 1       -- Prefix
                WHEN m.search_name_normalized LIKE '% ' || si.normalized_query || '%' THEN 2 -- Word Start (Infix)
                ELSE 3 
            END AS prefix_rank,
            length(m.search_name_normalized) AS name_length
        FROM mv_artist_search m, search_input si
        WHERE 
            si.normalized_query <% m.search_name_normalized
        ORDER BY 
            m.gid, 
            similarity(si.normalized_query, m.search_name_normalized) DESC
    )
    SELECT
        c.gid AS mbid,
        c.canonical_name AS name,
        c.matched_name AS "matchedName",
        c.comment,
        a.image_url AS "imageUrl"
    FROM candidates c
    LEFT JOIN artists a ON a.mbid = c.gid
    ORDER BY
        -- 1. Prefix 우선 (검색 의도 매칭)
        c.prefix_rank ASC,
        -- 2. 짧은 이름 우선 (가장 간결한 정답)
        c.name_length ASC,
        -- 3. 유사도 점수 (오타 보정)
        c.sim_score DESC,
        -- 4. 단어 유사도 보조
        c.word_sim_score DESC,
        -- 5. 메타데이터 (본명, 유명도 등)
        (c.source = 0) DESC,
        c.is_primary DESC
    LIMIT ${limit};
  `;
}

export async function findLocalArtistsByMbids(mbids: string[]) {
  return prisma.artist.findMany({
    where: { mbid: { in: mbids } },
    select: { mbid: true, imageUrl: true },
  });
}

export async function findMusicBrainzArtistByMbid(mbid: string) {
  return prisma.musicBrainzArtist.findUnique({
    where: { gid: mbid },
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

export async function upsertLocalArtist(mbid: string, data: Prisma.ArtistCreateInput) {
  return prisma.artist.upsert({
    where: { mbid },
    create: { ...data, mbid },
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

export async function findArtistsWithConcerts(mbids: string[], userId?: string) {
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

export async function findExistingArtists(mbids: string[]) {
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

export async function findFollowersByArtistIds(artistIds: number[]) {
  return prisma.userArtist.findMany({
    where: {
      artistId: { in: artistIds },
    },
    include: {
      user: {
        include: {
          devices: true,
          notificationSettings: true,
        },
      },
    },
  });
}

export async function findMusicBrainzArtistsByMbids(mbids: string[]) {
  return prisma.musicBrainzArtist.findMany({
    where: { gid: { in: mbids } },
    select: { gid: true, name: true },
  });
}
