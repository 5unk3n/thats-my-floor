import { Prisma, PublishStatus } from '@prisma/client';

import { ArtistCandidate, ArtistService } from '@/entities/artist';
import { prisma } from '@/shared/lib/prisma';

import * as PerplexityService from './perplexity.service';

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
 * Triggers grouping analysis: Perplexity -> Local MB Lookup -> Grouped Result.
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
      // Double-check status update if needed
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

      // 2. Verification (Local DB) - Loop through EACH detected name
      for (const name of uniqueNames) {
        try {
          // Search MusicBrainz Mirror for this specific name
          const candidates = await ArtistService.searchArtists(name);

          groupedResults.push({
            query: name,
            candidates,
          });
        } catch (err) {
          console.error(`Error searching artist ${name}:`, err);
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
export async function publishConcert(concertId: string, selectedCandidates: ArtistCandidate[]) {
  return prisma.$transaction(async (tx) => {
    // 1. Create/Connect Artists
    for (const candidate of selectedCandidates) {
      if (!candidate.mbid) continue; // Skip invalid

      let artist = await tx.artist.findUnique({
        where: { mbid: candidate.mbid },
      });

      if (!artist) {
        artist = await tx.artist.create({
          data: {
            mbid: candidate.mbid,
            imageUrl: candidate.imageUrl,
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
