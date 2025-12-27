import { PublishStatus } from '@prisma/client';

import { kopisClient } from '@/shared/lib/kopis/client';
import { prisma } from '@/shared/lib/prisma';

import * as concertRepository from '../db';

/**
 * 모든 유효한 공연의 상태를 KOPIS와 동기화합니다.
 */
export async function syncAllConcertStatus() {
  console.log('[SyncService] Starting concert status synchronization...');

  const targets = await getTargetConcerts();
  console.log(`[SyncService] Found ${targets.length} concerts to sync.`);

  let successCount = 0;
  let failCount = 0;

  for (const concert of targets) {
    try {
      await updateStatusFromKopis(concert.id, concert.kopisId);
      successCount++;
    } catch (error) {
      console.error(`[SyncService] Failed to sync concert ${concert.kopisId}:`, error);
      failCount++;
    }
  }

  console.log(`[SyncService] Sync completed. Success: ${successCount}, Fail: ${failCount}`);
  return { successCount, failCount };
}

/**
 * 동기화 대상 공연을 추출합니다.
 */
async function getTargetConcerts() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return prisma.concert.findMany({
    where: {
      publishStatus: PublishStatus.PUBLISHED,
      endDate: {
        gte: today,
      },
    },
    select: {
      id: true,
      kopisId: true,
    },
  });
}

/**
 * 개별 공연의 상태를 KOPIS API로부터 가져와 업데이트합니다.
 */
async function updateStatusFromKopis(id: string, kopisId: string) {
  const detailResponse = await kopisClient.getConcertDetail(kopisId);
  const detail = detailResponse.dbs?.db;

  if (!detail || !detail.prfstate) {
    throw new Error(`Invalid KOPIS detail for ${kopisId}`);
  }

  await concertRepository.updateConcertStatus(id, detail.prfstate);
  console.log(`[SyncService] Updated status for ${kopisId}: ${detail.prfstate}`);
}
