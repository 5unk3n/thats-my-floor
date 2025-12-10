'use server';

import { Prisma } from '@prisma/client';

import { prisma } from '@/shared/lib/prisma';

import { Concert } from '../model/types';
import { AnalysisService } from './services/analysis.service';
import { revalidatePath } from 'next/cache';

// --- Admin Pipeline Actions ---

export async function requestAnalysisAction(concertId: string) {
  try {
    await AnalysisService.requestAnalysis(concertId);
    revalidatePath('/admin/reviews');
    return { success: true };
  } catch (error) {
    console.error('Request Analysis Failed:', error);
    return { success: false, error: 'Failed' };
  }
}

export async function runPipelineAction() {
  try {
    const results = await AnalysisService.runAnalysisPipeline();
    revalidatePath('/admin/reviews');
    return { success: true, count: results.length };
  } catch (error) {
    console.error('Pipeline Run Failed:', error);
    return { success: false, error: 'Pipeline Failed' };
  }
}

export async function publishConcertAction(concertId: string, candidate: any) {
  try {
    await AnalysisService.publishConcert(concertId, candidate);
    revalidatePath('/admin/reviews');
    return { success: true };
  } catch (error) {
    console.error('Publish Failed:', error);
    return { success: false, error: 'Publish Failed' };
  }
}

export async function getConcerts(params: {
  page: number;
  size?: number;
  region?: string;
  type?: 'DOMESTIC' | 'VISIT' | 'FESTIVAL';
  startDate?: string;
  endDate?: string;
  keyword?: string;
}): Promise<Concert[]> {
  const { page = 1, size = 20, region, type, startDate, endDate, keyword } = params;

  // Default date range: Today to 1 month later if not specified
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  // DB Query Filters
  const where: Prisma.ConcertWhereInput = {};

  // 1. Type Filter
  if (type === 'VISIT') {
    where.visit = true;
  } else if (type === 'FESTIVAL') {
    where.festival = true;
  } else if (type === 'DOMESTIC') {
    where.visit = false;
    where.festival = false;
  }

  // 2. Keyword Search
  if (keyword) {
    where.prfnm = { contains: keyword, mode: 'insensitive' };
  }

  // 3. Date Filter
  const st = startDate
    ? new Date(startDate.slice(0, 4) + '-' + startDate.slice(4, 6) + '-' + startDate.slice(6, 8))
    : today;

  const ed = endDate
    ? new Date(endDate.slice(0, 4) + '-' + endDate.slice(4, 6) + '-' + endDate.slice(6, 8))
    : nextMonth;

  where.prfpdfrom = {
    gte: st,
    lte: ed,
  };

  // 4. Region Filter
  if (region) {
    where.area = { contains: region, mode: 'insensitive' };
  }

  try {
    const concerts = await prisma.concert.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      orderBy: { prfpdfrom: 'asc' },
    });

    return concerts.map((item) => ({
      id: item.mt20id,
      title: item.prfnm,
      startDate: item.prfpdfrom.toISOString().slice(0, 10).replace(/-/g, '.'),
      endDate: item.prfpdto.toISOString().slice(0, 10).replace(/-/g, '.'),
      venue: item.fcltynm,
      posterUrl: item.poster || '',
      genre: item.genrenm || '',
      state: item.prfstate || '',
      openRun: item.openrun,
    }));
  } catch (error) {
    console.error('Failed to fetch concerts from DB:', error);
    return [];
  }
}
