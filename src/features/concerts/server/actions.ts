'use server';

import { Prisma, PublishStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// eslint-disable-next-line boundaries/element-types -- MVP: Cross-feature notification for publish flow
import * as notificationService from '@/features/notifications/server/services/notification.service';
import { ERROR_CODES } from '@/shared/constants/error-codes';
import { prisma } from '@/shared/lib/prisma';
import { ActionResponse } from '@/shared/types/action-response';

import { Concert } from '../types';
import * as AnalysisService from './services/analysis.service';
import { Candidate } from './services/analysis.service';

// --- Admin Pipeline Actions ---

export async function requestAnalysisAction(concertId: string): Promise<ActionResponse> {
  try {
    // 1. Set status to ANALYZING immediately
    await AnalysisService.requestAnalysis(concertId);

    // 2. Trigger Pipeline asynchronously (Fire-and-forget)
    AnalysisService.runAnalysisPipeline(concertId).catch((err) =>
      console.error('Async Pipeline Error:', err)
    );

    revalidatePath('/admin/reviews');
    return { success: true, data: undefined };
  } catch (error) {
    console.error('Request Analysis Failed:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Analysis Request Failed' },
    };
  }
}

export async function runPipelineAction(): Promise<ActionResponse<{ count: number }>> {
  try {
    const results = await AnalysisService.runAnalysisPipeline();
    revalidatePath('/admin/reviews');
    return { success: true, data: { count: results.length } };
  } catch (error) {
    console.error('Pipeline Run Failed:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Pipeline Failed' },
    };
  }
}

export async function publishConcertAction(
  concertId: string,
  candidates: Candidate[]
): Promise<ActionResponse> {
  try {
    const concert = await AnalysisService.publishConcert(concertId, candidates);

    // Send notification to followers after successful publish
    await notificationService.notifyConcertRegistration(concert.id);

    revalidatePath('/admin/reviews');
    return { success: true, data: undefined };
  } catch (error) {
    console.error('Publish Failed:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Publish Failed' },
    };
  }
}

export async function rejectConcertAction(concertId: string): Promise<ActionResponse> {
  try {
    await AnalysisService.rejectConcert(concertId);
    revalidatePath('/admin/reviews');
    return { success: true, data: undefined };
  } catch (error) {
    console.error('Reject Failed:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Reject Failed' },
    };
  }
}

export async function restoreToReviewAction(concertId: string): Promise<ActionResponse> {
  try {
    await prisma.concert.update({
      where: { id: concertId },
      data: { publishStatus: PublishStatus.REVIEWING },
    });
    revalidatePath('/admin/reviews');
    return { success: true, data: undefined };
  } catch (error) {
    console.error('Restore Failed:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Restore Failed' },
    };
  }
}

// --- Manual Spotify Search ---

export async function searchSpotifyArtistsAction(query: string): Promise<Candidate[]> {
  if (!query || query.trim().length < 2) return [];

  const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
  const SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search';

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) return [];

  try {
    // Get access token
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenRes = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenRes.ok) return [];

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Search artists
    const params = new URLSearchParams({
      q: query,
      type: 'artist',
      limit: '5',
    });

    const searchRes = await fetch(`${SPOTIFY_SEARCH_URL}?${params.toString()}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!searchRes.ok) return [];

    const data = await searchRes.json();
    const artists = data.artists?.items || [];

    return artists.map(
      (artist: {
        id: string;
        name: string;
        images: { url: string }[];
        popularity: number;
        followers: { total: number };
        genres: string[];
      }) => ({
        name: artist.name,
        spotifyId: artist.id,
        imageUrl: artist.images[0]?.url,
        popularity: artist.popularity,
        followers: artist.followers.total,
        genres: artist.genres,
      })
    );
  } catch (error) {
    console.error('Spotify Search Failed:', error);
    return [];
  }
}

export async function getConcerts(params: {
  page: number;
  size?: number;
  region?: string;
  type?: 'DOMESTIC' | 'GLOBAL' | 'FESTIVAL';
  startDate?: string;
  endDate?: string;
  keyword?: string;
}): Promise<ActionResponse<Concert[]>> {
  const { page = 1, size = 20, type, startDate, endDate, keyword } = params;

  // Default date range: Today to 1 month later if not specified
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  // DB Query Filters
  const where: Prisma.ConcertWhereInput = {
    // Only show published concerts to users
    publishStatus: PublishStatus.PUBLISHED,
  };

  // 1. Type Filter
  if (type === 'GLOBAL') {
    where.isGlobal = true;
  } else if (type === 'FESTIVAL') {
    where.isFestival = true;
  } else if (type === 'DOMESTIC') {
    where.isGlobal = false;
    where.isFestival = false;
  }

  // 2. Keyword Search
  if (keyword) {
    where.title = { contains: keyword, mode: 'insensitive' };
  }

  // 3. Date Filter
  const st = startDate
    ? new Date(startDate.slice(0, 4) + '-' + startDate.slice(4, 6) + '-' + startDate.slice(6, 8))
    : today;

  const ed = endDate
    ? new Date(endDate.slice(0, 4) + '-' + endDate.slice(4, 6) + '-' + endDate.slice(6, 8))
    : nextMonth;

  where.startDate = {
    gte: st,
    lte: ed,
  };

  // 4. Region Filter removed (area column deleted)
  // If region filtering is still needed, it might need to rely on 'place' or another logic, but user deleted 'area'.
  // I will comment it out or remove it.
  /*
  if (region) {
    where.area = { contains: region, mode: 'insensitive' };
  }
  */

  try {
    const concerts = await prisma.concert.findMany({
      where,
      skip: (page - 1) * size,
      take: size,
      orderBy: { startDate: 'asc' },
    });

    return {
      success: true,
      data: concerts.map((item) => ({
        id: item.id,
        title: item.title,
        startDate: item.startDate.toISOString().slice(0, 10).replace(/-/g, '.'),
        endDate: item.endDate.toISOString().slice(0, 10).replace(/-/g, '.'),
        place: item.place,
        posterUrl: item.posterUrl || '',
        status: item.status || '',
      })),
    };
  } catch (error) {
    console.error('Failed to fetch concerts from DB:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.NOT_FOUND, message: 'Failed to fetch concerts' },
    };
  }
}
