import { Prisma, PublishStatus } from '@prisma/client';

import * as PerplexityService from '@/features/concerts/server/services/perplexity.service';
import { lastFmClient } from '@/shared/lib/lastfm/client';
import { prisma } from '@/shared/lib/prisma';

export interface Candidate {
  name: string;
  lastfmArtistId?: string;
  url?: string;
  imageUrl?: string;
  listeners?: number;
  playcount?: number;
  genres?: string[]; // Last.fm artists might have tags, we can map them if needed
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

      // 2. Verification (Last.fm) - Loop through EACH detected name
      for (const name of uniqueNames) {
        try {
          // Search Last.fm for this specific name
          const response = await lastFmClient.searchArtist(name, 3);
          const candidates = response?.results.artistmatches.artist || [];

          groupedResults.push({
            query: name,
            candidates: candidates.map((c) => ({
              name: c.name,
              lastfmArtistId: c.mbid || c.url,
              url: c.url,
              imageUrl: c.image.find((img) => img.size === 'large')?.['#text'],
              listeners: parseInt(c.listeners || '0', 10),
              // genres: c.tags, // Tags not directly in search result usually
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
      if (!candidate.lastfmArtistId) continue; // Skip invalid

      let artist = await tx.artist.findUnique({
        where: { lastfmArtistId: candidate.lastfmArtistId },
      });

      if (!artist) {
        artist = await tx.artist.create({
          data: {
            name: candidate.name,
            lastfmArtistId: candidate.lastfmArtistId,
            image: candidate.imageUrl,
            followerCount: 0, // Last.fm search doesn't provide follower count directly in same way
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
