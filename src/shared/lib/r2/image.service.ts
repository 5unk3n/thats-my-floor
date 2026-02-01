import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { createHash } from 'crypto';
import sharp from 'sharp';

import { R2_BUCKET_NAME, R2_PUBLIC_DOMAIN, r2Client } from './client';

export type ImageType = 'concerts' | 'artists';

export interface UploadImageResult {
  url: string;
  key: string;
}

/**
 * 이미지를 다운로드하여 WebP로 변환 후 R2에 업로드
 * Content hash 기반으로 중복 이미지는 자동으로 동일 키 사용
 *
 * @param sourceUrl - 원본 이미지 URL
 * @param type - 이미지 타입 (폴더 구분용)
 * @param maxWidth - 최대 너비 (기본값: 1200px)
 */
export const downloadAndUploadImage = async (
  sourceUrl: string,
  type: ImageType,
  maxWidth: number = 1200
): Promise<UploadImageResult> => {
  // 1. 이미지 다운로드
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.statusText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // 2. Sharp로 리사이즈 및 WebP 변환
  const webpBuffer = await sharp(buffer)
    .resize({
      width: maxWidth,
      height: 16383, // WebP maximum height limit
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toBuffer();

  // 3. Content hash 생성 (처음 16자만 사용)
  const hash = createHash('sha256').update(webpBuffer).digest('hex').slice(0, 16);
  const fullKey = `images/${type}/${hash}.webp`;

  // 4. R2에 업로드 (동일 hash면 덮어쓰기 = 실질적 중복 방지)
  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fullKey,
      Body: webpBuffer,
      ContentType: 'image/webp',
    })
  );

  return {
    url: `${R2_PUBLIC_DOMAIN}/${fullKey}`,
    key: fullKey,
  };
};

/**
 * 복수 이미지를 일괄 업로드
 * @param urls - 원본 이미지 URL 배열
 * @param type - 이미지 타입 (폴더 구분용)
 */
export const uploadImages = async (
  urls: string[],
  type: ImageType
): Promise<UploadImageResult[]> => {
  const results: UploadImageResult[] = [];

  for (const url of urls) {
    try {
      const result = await downloadAndUploadImage(url, type);
      results.push(result);
    } catch (error) {
      console.error(`[R2] Failed to upload image:`, error);
      // 실패한 이미지는 건너뛰고 계속 진행
    }
  }

  return results;
};

/**
 * R2에서 이미지 삭제
 * @param key - R2 오브젝트 키
 */
export const deleteImage = async (key: string): Promise<void> => {
  await r2Client.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    })
  );
};
