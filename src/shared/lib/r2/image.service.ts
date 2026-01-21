import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';

import { R2_BUCKET_NAME, R2_PUBLIC_DOMAIN, r2Client } from './client';

export interface UploadImageResult {
  url: string;
  key: string;
}

/**
 * 이미지를 다운로드하여 WebP로 변환 후 R2에 업로드
 * @param sourceUrl - 원본 이미지 URL
 * @param key - R2 오브젝트 키 (확장자 제외)
 * @param maxWidth - 최대 너비 (기본값: 1200px)
 */
export const downloadAndUploadImage = async (
  sourceUrl: string,
  key: string,
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
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  // 3. R2에 업로드
  const fullKey = `${key}.webp`;

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
 * @param prefix - R2 키 프리픽스 (예: concerts/{kopisId}/images)
 */
export const uploadImages = async (
  urls: string[],
  prefix: string
): Promise<UploadImageResult[]> => {
  const results: UploadImageResult[] = [];

  for (let i = 0; i < urls.length; i++) {
    try {
      const result = await downloadAndUploadImage(urls[i], `${prefix}/${i}`);
      results.push(result);
    } catch (error) {
      console.error(`[R2] Failed to upload image ${i}:`, error);
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
