import { Prisma, PublishStatus } from '@prisma/client';

import { kopisClient } from '@/shared/lib/kopis/client';
import { prisma } from '@/shared/lib/prisma';

export interface Concert {
  id: string;
  title: string;
  poster: string;
  startDate: string;
  endDate: string;
  place: string;
  genre: string;
  status: string;
}

export interface ConcertDetail extends Concert {
  cast: string;
  crew: string;
  runtime: string;
  age: string;
  producer: string;
  price: string;
  story: string;
  storyUrls: string[];
  schedule: string;
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
      poster: item.poster,
      startDate: item.prfpdfrom,
      endDate: item.prfpdto,
      place: item.fcltynm,
      genre: item.genrenm,
      status: item.prfstate,
    }));
  },

  getConcertDetail: async (id: string): Promise<ConcertDetail | null> => {
    try {
      const response = await kopisClient.getConcertDetail(id);
      const item = response.dbs?.db;

      if (!item) return null;

      return {
        id: item.mt20id,
        title: item.prfnm,
        poster: item.poster,
        startDate: item.prfpdfrom,
        endDate: item.prfpdto,
        place: item.fcltynm,
        genre: item.genrenm,
        status: item.prfstate,
        cast: item.prfcast,
        crew: item.prfcrew,
        runtime: item.prfruntime,
        age: item.prfage,
        producer: item.entrpsnm,
        price: item.pcseguidance,
        story: item.sty,
        storyUrls: Array.isArray(item.styurls?.styurl)
          ? item.styurls.styurl
          : item.styurls?.styurl
            ? [item.styurls.styurl]
            : [],
        schedule: item.dtguidance,
      };
    } catch (error) {
      console.error('Failed to fetch concert detail:', error);
      return null;
    }
  },

  upsertConcert: async (data: {
    mt20id: string;
    mt10id?: string;
    prfnm: string;
    prfpdfrom: string;
    prfpdto: string;
    fcltynm: string;
    poster?: string;
    genrenm?: string;
    prfstate?: string;
    openrun?: boolean;
    area?: string;
    prfcast?: string;
    prfcrew?: string;
    prfruntime?: string;
    prfage?: string;
    entrpsnm?: string;
    pcseguidance?: string;
    dtguidance?: string;
    sty?: string;
    styurls?: string[];
    relates?: Prisma.InputJsonValue[];
    visit?: boolean;
    festival?: boolean;
    artistId?: string;
  }) => {
    return prisma.concert.upsert({
      where: { mt20id: data.mt20id },
      update: {
        mt10id: data.mt10id,
        prfnm: data.prfnm,
        poster: data.poster,
        prfpdfrom: new Date(data.prfpdfrom),
        prfpdto: new Date(data.prfpdto),
        fcltynm: data.fcltynm,
        genrenm: data.genrenm,
        prfstate: data.prfstate,
        openrun: data.openrun || false,
        area: data.area,
        prfcast: data.prfcast,
        prfcrew: data.prfcrew,
        prfruntime: data.prfruntime,
        prfage: data.prfage,
        entrpsnm: data.entrpsnm,
        pcseguidance: data.pcseguidance,
        dtguidance: data.dtguidance,
        sty: data.sty,
        styurls: data.styurls || [],
        relates: data.relates || [],
        visit: data.visit || false,
        festival: data.festival || false,
        artistId: data.artistId,
      },
      create: {
        mt20id: data.mt20id,
        mt10id: data.mt10id,
        prfnm: data.prfnm,
        poster: data.poster,
        prfpdfrom: new Date(data.prfpdfrom),
        prfpdto: new Date(data.prfpdto),
        fcltynm: data.fcltynm,
        genrenm: data.genrenm,
        prfstate: data.prfstate,
        openrun: data.openrun || false,
        area: data.area,
        prfcast: data.prfcast,
        prfcrew: data.prfcrew,
        prfruntime: data.prfruntime,
        prfage: data.prfage,
        entrpsnm: data.entrpsnm,
        pcseguidance: data.pcseguidance,
        dtguidance: data.dtguidance,
        sty: data.sty,
        styurls: data.styurls || [],
        relates: data.relates || [],
        visit: data.visit || false,
        festival: data.festival || false,
        artistId: data.artistId,
        publishStatus: PublishStatus.DRAFT,
      },
    });
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
