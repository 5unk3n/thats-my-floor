'use server';

import { PublishStatus } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';

import * as notificationService from '@/features/notifications/server/services/notification.service';
import { ERROR_CODES } from '@/shared/constants/error-codes';
import { prisma } from '@/shared/lib/prisma';
import { ActionResponse } from '@/shared/types/action-response';

import { Concert } from '../types';
import * as AnalysisService from './services/analysis.service';
import { Candidate } from './services/analysis.service';
import * as concertService from './services/concert.service';

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

    // Invalidate Cache
    // Invalidate Cache
    revalidatePath('/admin/reviews');
    // revalidatePath('/'); // Refresh main page explicitly - unnecessary with tags
    // revalidatePath(`/concerts/${concertId}`); // Refresh detail page - unnecessary with tags

    revalidateTag('concerts', {});
    revalidateTag(`concert-detail-${concertId}`, {});

    // Invalidate artist pages (ISR/Cache)
    if (concert.artists) {
      concert.artists.forEach((ca) => {
        revalidateTag(`artist-concerts-${ca.artistId}`, {}); // tag-based invalidation
      });
    }

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
    revalidatePath(`/concerts/${concertId}`);
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
    revalidatePath(`/concerts/${concertId}`);
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
  try {
    const concerts = await concertService.getConcerts({
      page: params.page,
      size: params.size,
      type: params.type,
      startDate: params.startDate,
      endDate: params.endDate,
      keyword: params.keyword,
    });

    return {
      success: true,
      data: concerts,
    };
  } catch (error) {
    console.error('Failed to fetch concerts via Action:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.NOT_FOUND, message: 'Failed to fetch concerts' },
    };
  }
}
