'use server';

import { kopisClient } from '@/shared/lib/kopis/client';

import { Concert } from '../model/types';

export async function getConcerts(params: {
  page: number;
  size?: number;
  region?: string;
  genre?: string;
  startDate?: string;
  endDate?: string;
}): Promise<Concert[]> {
  const { page, size = 20, region, genre, startDate, endDate } = params;

  // Default date range: Today to 1 month later if not specified
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  const formatDate = (date: Date) => date.toISOString().slice(0, 10).replace(/-/g, '');

  const stdate = startDate || formatDate(today);
  const eddate = endDate || formatDate(nextMonth);

  try {
    // If genre is 'FESTIVAL', we still query 'CCCD' (Popular Music) and set festival='Y'
    // For any other genre (or no genre), we default to 'CCCD' (Popular Music) to restrict scope
    const requestGenre = 'CCCD';
    const requestFestival = genre === 'FESTIVAL' ? 'Y' : undefined;

    const response = await kopisClient.getConcertList({
      cpage: page.toString(),
      rows: size.toString(),
      stdate,
      eddate,
      signgucode: region,
      shcate: requestGenre,
      festival: requestFestival,
    });

    if (!response?.dbs?.db) {
      return [];
    }

    // Handle case where single result is not an array
    const list = Array.isArray(response.dbs.db) ? response.dbs.db : [response.dbs.db];

    return list.map((item) => ({
      id: item.mt20id,
      title: item.prfnm,
      startDate: item.prfpdfrom,
      endDate: item.prfpdto,
      venue: item.fcltynm,
      posterUrl: item.poster,
      genre: item.genrenm,
      state: item.state,
      openRun: item.openrun === 'Y',
    }));
  } catch (error) {
    console.error('Failed to fetch concerts:', error);
    return [];
  }
}
