'use server';

import { PublishStatus } from '@prisma/client';
import { revalidatePath, revalidateTag } from 'next/cache';

import { Concert } from '@/entities/concert';
import { ERROR_CODES } from '@/shared/constants/error-codes';
import { prisma } from '@/shared/lib/prisma';
import { ActionResponse } from '@/shared/types/action-response';

import * as AnalysisService from '../model/services/analysis.service';
import { Candidate } from '../model/services/analysis.service';
import * as concertService from '../model/services/concert.service';
import { LastFmCandidate, searchLastFmArtists } from '../model/services/lastfm-search.service';
import { notifyConcertRegistration } from '../model/services/notification.service';

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
    // Send notification to followers after successful publish
    const detail = await concertService.getConcertDetail(concert.id);
    if (detail) {
      const artistNames = detail.artists.map((a) => a.name).join(', ');
      await notifyConcertRegistration(concert.id, artistNames);
    }

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

// --- Manual Last.fm Search ---

export async function searchExternalArtistsAction(query: string): Promise<LastFmCandidate[]> {
  return searchLastFmArtists(query);
}

export async function getConcertsAction(params: {
  page: number;
  size?: number;
  region?: string;
  type?: 'DOMESTIC' | 'GLOBAL' | 'FESTIVAL';
}): Promise<ActionResponse<Concert[]>> {
  try {
    const concerts = await concertService.getConcerts({
      page: params.page,
      size: params.size,
      type: params.type,
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
