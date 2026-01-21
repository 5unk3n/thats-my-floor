/**
 * KOPIS 이미지 R2 마이그레이션 스크립트
 *
 * 기존 DB에 저장된 KOPIS URL을 R2 URL로 마이그레이션합니다.
 *
 * 사용법:
 *   npx tsx scripts/migrate-images-to-r2.ts [--dry-run]
 *
 * 옵션:
 *   --dry-run  실제 업로드 없이 처리 대상만 확인
 */

import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

import { R2ImageService } from '../src/shared/lib/r2';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });
const isDryRun = process.argv.includes('--dry-run');

const KOPIS_URL_PATTERN = /kopis\.or\.kr/;
const BATCH_SIZE = 10;

async function main() {
  console.log(`[Migration] Starting R2 migration... ${isDryRun ? '(DRY RUN)' : ''}`);

  // KOPIS URL을 가진 공연 조회
  const concerts = await prisma.concert.findMany({
    where: {
      OR: [{ posterUrl: { contains: 'kopis.or.kr' } }, { images: { hasSome: [] } }],
    },
    select: {
      id: true,
      kopisId: true,
      posterUrl: true,
      images: true,
    },
  });

  // 필터링: KOPIS URL이 있는 것만
  const toMigrate = concerts.filter((c) => {
    const hasPoster = c.posterUrl && KOPIS_URL_PATTERN.test(c.posterUrl);
    const hasImages = c.images.some((img) => KOPIS_URL_PATTERN.test(img));
    return hasPoster || hasImages;
  });

  console.log(`[Migration] Found ${toMigrate.length} concerts to migrate`);

  if (isDryRun) {
    toMigrate.slice(0, 10).forEach((c) => {
      console.log(`  - ${c.kopisId}: poster=${!!c.posterUrl}, images=${c.images.length}`);
    });
    console.log('[Migration] Dry run complete. No changes made.');
    return;
  }

  let successCount = 0;
  let errorCount = 0;

  // 배치 처리
  for (let i = 0; i < toMigrate.length; i += BATCH_SIZE) {
    const batch = toMigrate.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (concert) => {
        try {
          let newPosterUrl = concert.posterUrl;
          let newImages = concert.images;

          // 포스터 마이그레이션
          if (concert.posterUrl && KOPIS_URL_PATTERN.test(concert.posterUrl)) {
            const result = await R2ImageService.downloadAndUploadImage(
              concert.posterUrl,
              `concerts/${concert.kopisId}/poster`
            );
            newPosterUrl = result.url;
          }

          // 이미지 마이그레이션
          const kopisImages = concert.images.filter((img) => KOPIS_URL_PATTERN.test(img));
          if (kopisImages.length > 0) {
            const results = await R2ImageService.uploadImages(
              kopisImages,
              `concerts/${concert.kopisId}/images`
            );
            // 마이그레이션된 이미지 URL 교체
            newImages = concert.images.map((img) => {
              if (KOPIS_URL_PATTERN.test(img)) {
                const idx = kopisImages.indexOf(img);
                return results[idx]?.url || img;
              }
              return img;
            });
          }

          // DB 업데이트
          await prisma.concert.update({
            where: { id: concert.id },
            data: {
              posterUrl: newPosterUrl,
              images: newImages,
            },
          });

          successCount++;
          console.log(`[Migration] ✓ ${concert.kopisId}`);
        } catch (error) {
          errorCount++;
          console.error(`[Migration] ✗ ${concert.kopisId}:`, error);
        }
      })
    );

    console.log(
      `[Migration] Progress: ${Math.min(i + BATCH_SIZE, toMigrate.length)}/${toMigrate.length}`
    );
  }

  console.log(`[Migration] Complete! Success: ${successCount}, Errors: ${errorCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
