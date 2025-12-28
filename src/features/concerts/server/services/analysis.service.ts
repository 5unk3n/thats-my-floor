import { Prisma, PublishStatus } from '@prisma/client';

import * as PerplexityService from '@/features/concerts/server/services/perplexity.service';
import { prisma } from '@/shared/lib/prisma';
import { SpotifyService } from '@/shared/lib/spotify/client';

export interface Candidate {
  name: string;
  spotifyId?: string;
  imageUrl?: string;
  popularity?: number;
  followers?: number;
  genres?: string[];
}

/**
 * Step 1: Request Analysis (Selection)
 * Admin selects a Draft concert to be analyzed.
 */
export async function requestAnalysis(concertId: string) {
  return prisma.concert.update({
    where: { id: concertId },
    data: {
      publishStatus: PublishStatus.ANALYZING,
    },
  });
}

/**
 * Step 2: Batch/Async Analysis Job
 * Triggers grouping analysis: Perplexity -> Spotify (N) -> Grouped Result.
 */
export async function runAnalysisPipeline(concertId?: string, limit = 5) {
  const where: Prisma.ConcertWhereInput = concertId
    ? { id: concertId }
    : { publishStatus: PublishStatus.ANALYZING };

  const targets = await prisma.concert.findMany({
    where,
    take: limit,
  });

  const results = [];

  for (const concert of targets) {
    try {
      // Double-check status update if needed (e.g. if picked up by cron)
      if (concert.publishStatus !== PublishStatus.ANALYZING) {
        await prisma.concert.update({
          where: { id: concert.id },
          data: { publishStatus: PublishStatus.ANALYZING },
        });
      }

      // 1. AI Search (Perplexity) - Get Array of Artist Names
      const artistNames = await PerplexityService.searchConcertLineup(concert.title);
      // Clean and unique names
      const uniqueNames = Array.from(new Set(artistNames.map((n) => n.trim()).filter(Boolean)));

      const groupedResults = [];

      // 2. Verification (Spotify) - Loop through EACH detected name
      for (const name of uniqueNames) {
        try {
          // Search Spotify for this specific name
          // We use a broader search here to get candidates
          // Assumption: SpotifyService.searchArtists (plural) needed or reuse singular
          // Let's assume we fetch top 3 for each name
          const candidates = await SpotifyService.searchArtists(name, 3);

          groupedResults.push({
            query: name,
            candidates: candidates.map((c) => ({
              name: c.name,
              spotifyId: c.id,
              imageUrl: c.images[0]?.url,
              popularity: c.popularity,
              followers: c.followers.total,
              genres: c.genres,
            })),
          });
        } catch {
          // Fallback for this name
          groupedResults.push({ query: name, candidates: [] });
        }
      }

      const analysisResult = {
        results: groupedResults,
        analyzedAt: new Date().toISOString(),
      };

      // 3. Save Result & Update Status
      await prisma.concert.update({
        where: { id: concert.id },
        data: {
          publishStatus: PublishStatus.REVIEWING,
          analysisResult: analysisResult as unknown as Prisma.InputJsonValue,
        },
      });

      results.push({ id: concert.id, success: true, groups: groupedResults.length });
    } catch (error) {
      console.error('Pipeline failed for concert ' + concert.id + ':', error);
      // Error State handling? For now keep as is or set to REJECTED?
      results.push({ id: concert.id, success: false, error });
    }
  }

  return results;
}

/**
 * Step 3: Publish (Review Approval) - MULTI ARTIST VERSION
 * Accepts multiple selected candidates.
 */
export async function publishConcert(concertId: string, selectedCandidates: Candidate[]) {
  return prisma.$transaction(async (tx) => {
    // 1. Create/Connect Artists
    for (const candidate of selectedCandidates) {
      if (!candidate.spotifyId) continue; // Skip invalid

      let artist = await tx.artist.findUnique({
        where: { spotifyArtistId: candidate.spotifyId },
      });

      if (!artist) {
        artist = await tx.artist.create({
          data: {
            name: candidate.name,
            spotifyArtistId: candidate.spotifyId,
            image: candidate.imageUrl,
            followerCount: candidate.followers || 0,
          },
        });
      }

      // 2. Link Concert -> Artist (Many-to-Many)
      // Check if already linked to avoid duplicates
      const existingRelation = await tx.concertArtist.findUnique({
        where: {
          concertId_artistId: {
            concertId,
            artistId: artist.id,
          },
        },
      });

      if (!existingRelation) {
        await tx.concertArtist.create({
          data: {
            concertId,
            artistId: artist.id,
            role: 'MAIN', // Default
          },
        });
      }
    }

    // 3. Update Status
    const updatedConcert = await tx.concert.update({
      where: { id: concertId },
      data: {
        publishStatus: PublishStatus.PUBLISHED,
      },
      include: {
        artists: true, // Include ConcertArtist relations to get artistIds
      },
    });

    return updatedConcert;
  });
}

/**
 * Reject Analysis
 */
export async function rejectConcert(concertId: string) {
  return prisma.concert.update({
    where: { id: concertId },
    data: { publishStatus: PublishStatus.REJECTED },
  });
}
