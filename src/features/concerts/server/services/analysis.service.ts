import { Prisma, PublishStatus } from '@prisma/client';

import { PerplexityService } from '@/features/concerts/server/services/perplexity.service';
import { prisma } from '@/shared/lib/prisma';
import { SpotifyService } from '@/shared/lib/spotify';

export interface Candidate {
  name: string;
  spotifyId?: string;
  imageUrl?: string;
  popularity?: number;
  followers?: number;
  genres?: string[];
}

interface AnalysisResult {
  candidates: Candidate[];
  searchKeyword: string;
}

export class AnalysisService {
  /**
   * Step 1: Request Analysis (Selection)
   * Admin selects a Draft concert to be analyzed.
   */
  static async requestAnalysis(concertId: string) {
    return prisma.concert.update({
      where: { id: concertId },
      data: {
        publishStatus: PublishStatus.ANALYZING_REQUEST,
      },
    });
  }

  /**
   * Step 2: Batch Analysis Job
   * Finds concerts in ANALYZING_REQUEST, runs AI search & Verification.
   * Note: This should ideally be run by a Cron/Background worker.
   * For MVP, we can trigger it manually or via an API endpoint.
   */
  static async runAnalysisPipeline(limit = 5) {
    // 1. Fetch targets
    const targets = await prisma.concert.findMany({
      where: { publishStatus: PublishStatus.ANALYZING_REQUEST },
      take: limit,
    });

    const results = [];

    for (const concert of targets) {
      try {
        // Lock the row (Optional: optimizing for concurrency)
        await prisma.concert.update({
          where: { id: concert.id },
          data: { publishStatus: PublishStatus.ANALYZING },
        });

        // 2. AI Search (Perplexity)
        const artistNames = await PerplexityService.searchConcertLineup(concert.prfnm);

        const candidates: Candidate[] = [];

        // 3. Verification (Spotify) - Loop through found names
        for (const name of artistNames) {
          const spotifyArtist = await SpotifyService.searchArtist(name);
          if (spotifyArtist) {
            candidates.push({
              name: spotifyArtist.name,
              spotifyId: spotifyArtist.id,
              imageUrl: spotifyArtist.images[0]?.url,
              popularity: spotifyArtist.popularity,
              followers: spotifyArtist.followers.total,
              genres: spotifyArtist.genres,
            });
          } else {
            // Fallback if not found on Spotify (Optional: add as 'unknown' or skip)
            // candidates.push({ name, popularity: 0 });
          }
        }

        // Sort by popularity (Mock logic)
        candidates.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        const topCandidates = candidates.slice(0, 3);

        const searchKeyword = concert.prfnm + ' ' + concert.fcltynm + ' lineup';

        const analysisResult: AnalysisResult = {
          candidates: topCandidates,
          searchKeyword: searchKeyword,
        };

        // 4. Save Result & Update Status
        await prisma.concert.update({
          where: { id: concert.id },
          data: {
            publishStatus: PublishStatus.REVIEWING,
            analysisResult: analysisResult as unknown as Prisma.InputJsonValue,
          },
        });

        results.push({ id: concert.id, success: true, candidates: topCandidates.length });
      } catch (error) {
        console.error('Pipeline failed for concert ' + concert.id + ':', error);
        // Revert to ANALYZING_REQUEST or set to REJECTED/Error state?
        // For now, leaving it as ANALYZING so we can inspect stuck jobs.
        results.push({ id: concert.id, success: false, error });
      }
    }

    return results;
  }

  /**
   * Step 3: Publish (Review Approval)
   * Admin selects a candidate (or manual input) and publishes.
   * Lazy creates Artist if not exists.
   */
  static async publishConcert(concertId: string, selectedCandidate: Candidate) {
    return prisma.$transaction(async (tx) => {
      // 1. Ensure Artist Exists (Lazy Creation)
      let artist = null;

      if (selectedCandidate.spotifyId) {
        artist = await tx.artist.findUnique({
          where: { spotifyArtistId: selectedCandidate.spotifyId },
        });

        if (!artist) {
          artist = await tx.artist.create({
            data: {
              name: selectedCandidate.name,
              spotifyArtistId: selectedCandidate.spotifyId,
              image: selectedCandidate.imageUrl,
              // genres: selectedCandidate.genres?.join(', '),
              followerCount: selectedCandidate.followers || 0,
            },
          });
        }
      }

      // If no Spotify ID (Manual without Spotify), try finding by name or create dummy?
      // For MVP, we respect the architecture: "Spotify based".
      // If we allow manual text without spotify, we might need a different handling.
      // Assuming selectedCandidate ALWAYS has spotifyId for this flow.

      if (!artist) {
        throw new Error('Failed to resolve artist. Spotify ID is required.');
      }

      // 2. Link Concert -> Artist
      // Also update the concert status
      const updatedConcert = await tx.concert.update({
        where: { id: concertId },
        data: {
          artistId: artist.id,
          publishStatus: PublishStatus.PUBLISHED,
        },
      });

      return updatedConcert;
    });
  }

  /**
   * Reject Analysis
   */
  static async rejectConcert(concertId: string) {
    return prisma.concert.update({
      where: { id: concertId },
      data: { publishStatus: PublishStatus.REJECTED },
    });
  }
}
