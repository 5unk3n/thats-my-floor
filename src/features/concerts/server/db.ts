import { kopisClient } from '@/shared/lib/kopis/client';

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
      status: item.state,
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
        status: item.state,
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
};
