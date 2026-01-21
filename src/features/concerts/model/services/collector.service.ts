import { ConcertRepository } from '@/entities/concert';
import { kopisClient } from '@/shared/lib/kopis/client';
import { KopisConcertListResponse } from '@/shared/lib/kopis/types';
import { prisma } from '@/shared/lib/prisma';
import { R2ImageService } from '@/shared/lib/r2';

export const collectConcerts = async () => {
  const today = new Date();
  const futureLimit = new Date();
  futureLimit.setFullYear(today.getFullYear() + 1);

  const formatDate = (date: Date) => date.toISOString().slice(0, 10).replace(/-/g, '');
  const stdate = formatDate(today);
  const eddate = formatDate(futureLimit);

  console.log('[Collector] Fetching concerts from KOPIS...');

  // Helper to fetch all pages
  const fetchAllPages = async (
    fetcher: (page: string) => Promise<KopisConcertListResponse>,
    categoryName: string
  ) => {
    let page = 1;
    type ConcertItem = KopisConcertListResponse['dbs']['db'][number];
    const allItems: ConcertItem[] = [];

    while (true) {
      console.log(`[Collector] Fetching ${categoryName} page ${page}...`);
      const response = await fetcher(String(page));
      const raw = response.dbs?.db || [];
      const list = Array.isArray(raw) ? raw : [raw];

      allItems.push(...list);

      if (list.length < 100) break;
      page++;
    }
    return allItems;
  };

  // 1. Fetch Concerts
  const concertList = await fetchAllPages(
    (page) =>
      kopisClient.getConcertList({
        cpage: page,
        rows: '100',
        stdate,
        eddate,
        shcate: 'CCCD',
        festival: 'N',
      }),
    'Concerts'
  );

  // 2. Fetch Festivals
  const festivalList = await fetchAllPages(
    (page) =>
      kopisClient.getFestivalList({
        cpage: page,
        rows: '100',
        stdate,
        eddate,
        shcate: 'CCCD',
      }),
    'Festivals'
  );

  console.log(
    `[Collector] Found ${concertList.length} concerts and ${festivalList.length} festivals.`
  );

  const newConcerts: Array<{
    id: string;
    kopisId: string;
  }> = [];

  // Helper function to process items
  const processItem = async (item: { mt20id: string }, category: 'CONCERT' | 'FESTIVAL') => {
    try {
      const exists = await prisma.concert.findUnique({
        where: { kopisId: item.mt20id },
      });

      if (exists) {
        return;
      }

      console.log(`[Collector] New ${category} found: ${item.mt20id}`);

      // We need raw detail to check 'visit' field
      // concertService.getConcertDetail doesn't expose 'visit' yet, so we use client directly or we update service.
      // For now, let's use client directly to be safe and get 'visit'.
      const detailResponse = await kopisClient.getConcertDetail(item.mt20id);
      const detail = detailResponse.dbs?.db;

      if (!detail) return;

      // Artist Matching Logic
      let artistId = undefined;
      if (detail.prfcast) {
        const castNames = detail.prfcast.split(',').map((s) => s.trim());
        for (const name of castNames) {
          if (!name) continue;
          if (!name) continue;
          const artist = await ConcertRepository.findArtistByName(name);
          if (artist) {
            artistId = artist.id;
            console.log(`[Collector] Matched artist: ${name}`);
            break;
          }
        }
      }

      // Parse storyUrls
      const storyUrls = Array.isArray(detail.styurls?.styurl)
        ? detail.styurls.styurl
        : detail.styurls?.styurl
          ? [detail.styurls.styurl as string]
          : [];

      // Parse relates
      const rawRelates = Array.isArray(detail.relates?.relate)
        ? detail.relates.relate
        : detail.relates?.relate
          ? [detail.relates.relate]
          : [];

      const relates = rawRelates.map((item: { relatenm: string; relateurl: string }) => ({
        name: item.relatenm,
        url: item.relateurl,
      }));

      // 포스터 이미지 R2 업로드
      let r2PosterUrl = detail.poster;
      if (detail.poster) {
        try {
          const result = await R2ImageService.downloadAndUploadImage(detail.poster, 'concerts');
          r2PosterUrl = result.url;
          console.log(`[Collector] Uploaded poster to R2: ${result.url}`);
        } catch (error) {
          console.error(`[Collector] Failed to upload poster:`, error);
          // 실패 시 원본 URL 유지
        }
      }

      // 스토리 이미지들 R2 업로드
      let r2Images: string[] = storyUrls;
      if (storyUrls.length > 0) {
        try {
          const results = await R2ImageService.uploadImages(storyUrls, 'concerts');
          r2Images = results.map((r) => r.url);
          console.log(`[Collector] Uploaded ${results.length} images to R2`);
        } catch (error) {
          console.error(`[Collector] Failed to upload images:`, error);
          // 실패 시 원본 URL 유지
        }
      }

      const savedConcert = await ConcertRepository.upsertConcertWithArtist({
        kopisId: detail.mt20id,
        title: detail.prfnm,
        posterUrl: r2PosterUrl,
        startDate: detail.prfpdfrom,
        endDate: detail.prfpdto,
        place: detail.fcltynm,
        region: detail.area,
        status: detail.prfstate,
        runtime: detail.prfruntime,
        artistId: artistId ? String(artistId) : undefined,
        isGlobal: detail.visit === 'Y',
        isFestival: detail.festival === 'Y',

        price: detail.pcseguidance,
        schedule: detail.dtguidance,
        description: detail.sty,
        images: r2Images,
        relates,
      });

      newConcerts.push(savedConcert);
    } catch (e) {
      console.error(`[Collector] Error processing ${item.mt20id}:`, e);
    }
  };

  // Process lists
  // Note: KOPIS might return empty object or undefined in some cases, loop safely
  for (const c of concertList) {
    if (c?.mt20id) await processItem(c, 'CONCERT');
  }

  for (const f of festivalList) {
    if (f?.mt20id) await processItem(f, 'FESTIVAL');
  }

  console.log(`[Collector] Processed. Created ${newConcerts.length} new items.`);

  return newConcerts;
};
