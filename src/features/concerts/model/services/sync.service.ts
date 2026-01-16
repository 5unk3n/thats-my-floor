import { PublishStatus } from '@prisma/client';

import { ConcertRepository } from '@/entities/concert';
import { kopisClient } from '@/shared/lib/kopis/client';
import { prisma } from '@/shared/lib/prisma';

import { invalidateCalendarCache } from '../../lib/invalidate-calendar';

/**
 * 모든 유효한 공연의 상태를 KOPIS와 동기화합니다.
 */
export async function syncAllConcertStatus() {
  console.log('[SyncService] Starting concert status synchronization...');

  const targets = await getTargetConcerts();
  console.log(`[SyncService] Found ${targets.length} concerts to sync.`);

  let successCount = 0;
  let failCount = 0;
  let changedCount = 0;

  for (const concert of targets) {
    try {
      const result = await updateStatusFromKopis(concert);
      successCount++;
      if (result.changed) {
        changedCount++;
      }
    } catch (error) {
      console.error(`[SyncService] Failed to sync concert ${concert.kopisId}:`, error);
      failCount++;
    }
  }

  console.log(
    `[SyncService] Sync completed. Success: ${successCount}, Changed: ${changedCount}, Fail: ${failCount}`
  );
  return { successCount, changedCount, failCount };
}

/**
 * 동기화 대상 공연을 추출합니다.
 * '공연예정' 또는 '공연중' 상태인 공연만 대상으로 합니다.
 */
async function getTargetConcerts() {
  return prisma.concert.findMany({
    where: {
      publishStatus: PublishStatus.PUBLISHED,
      status: {
        in: ['공연예정', '공연중'],
      },
    },
    select: {
      id: true,
      kopisId: true,
      status: true,
      startDate: true,
      endDate: true,
    },
  });
}

type TargetConcert = Awaited<ReturnType<typeof getTargetConcerts>>[number];

/**
 * 개별 공연의 상태를 KOPIS API로부터 가져와 업데이트합니다.
 * 상태가 실제로 변경된 경우에만 업데이트하고 캐시를 무효화합니다.
 */
async function updateStatusFromKopis(
  concert: TargetConcert
): Promise<{ changed: boolean; newStatus?: string }> {
  const detailResponse = await kopisClient.getConcertDetail(concert.kopisId);
  const detail = detailResponse.dbs?.db;

  if (!detail || !detail.prfstate) {
    throw new Error(`Invalid KOPIS detail for ${concert.kopisId}`);
  }

  const newStatus = detail.prfstate;

  // 상태가 동일하면 업데이트하지 않음
  if (concert.status === newStatus) {
    return { changed: false };
  }

  // 상태가 변경되었으면 업데이트
  await ConcertRepository.updateConcertStatus(concert.id, newStatus);
  console.log(
    `[SyncService] Updated status for ${concert.kopisId}: ${concert.status} → ${newStatus}`
  );

  // 공연종료 상태로 변경된 경우 캘린더 캐시 무효화
  if (newStatus === '공연완료') {
    invalidateCalendarCache(concert.startDate, concert.endDate);
    console.log(`[SyncService] Invalidated calendar cache for ${concert.kopisId}`);
  }

  return { changed: true, newStatus };
}
