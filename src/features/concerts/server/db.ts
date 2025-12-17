import { Prisma, PublishStatus } from '@prisma/client';

import { kopisClient } from '@/shared/lib/kopis/client';
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
}

export const concertService = {
  getConcerts: async (params: {
    startDate: string;
    endDate: string;
    page: number;
    size: number;
  }): Promise<Concert[]> => {
    const response = await kopisClient.getConcertList({
      stdate: params.startDate.replace(/-/g, ''),
      eddate: params.endDate.replace(/-/g, ''),
      cpage: params.page.toString(),
      rows: params.size.toString(),
    });

    const db = response.dbs?.db;
    if (!db) return [];

    const list = Array.isArray(db) ? db : [db];

    return list.map((item) => ({
      id: item.mt20id,
      title: item.prfnm,
      posterUrl: item.poster,
      startDate: item.prfpdfrom,
      endDate: item.prfpdto,
      place: item.fcltynm,
      status: item.prfstate,
    }));
  },

  getConcertDetail: async (id: string): Promise<ConcertDetail | null> => {
    try {
      const response = await kopisClient.getConcertDetail(id);
      const item = response.dbs?.db;

      if (!item) return null;

      // Parse relates (booking links)
      const relatesData = item.relates?.relate;
      let relates: BookingLink[] = [];

      if (relatesData) {
        if (Array.isArray(relatesData)) {
          relates = relatesData.map((r) => ({
            name: r.relatenm,
            url: r.relateurl,
          }));
        } else if (relatesData.relatenm && relatesData.relateurl) {
          relates = [{ name: relatesData.relatenm, url: relatesData.relateurl }];
        }
      }

      return {
        id: item.mt20id,
        title: item.prfnm,
        posterUrl: item.poster,
        startDate: item.prfpdfrom,
        endDate: item.prfpdto,
        place: item.fcltynm,
        status: item.prfstate,
        runtime: item.prfruntime,
        price: item.pcseguidance,
        description: item.sty,
        images: Array.isArray(item.styurls?.styurl)
          ? item.styurls.styurl
          : item.styurls?.styurl
            ? [item.styurls.styurl]
            : [],
        schedule: item.dtguidance,
        relates,
      };
    } catch (error) {
      console.error('Failed to fetch concert detail:', error);
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
};
