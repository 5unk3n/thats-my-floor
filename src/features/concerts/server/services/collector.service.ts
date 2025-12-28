import * as concertRepository from '@/features/concerts/server/db';
import * as concertService from '@/features/concerts/server/services/concert.service';
import { kopisClient } from '@/shared/lib/kopis/client';
import { prisma } from '@/shared/lib/prisma';

export const collectConcerts = async () => {
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  const formatDate = (date: Date) => date.toISOString().slice(0, 10).replace(/-/g, '');
  const stdate = formatDate(today);
  const eddate = formatDate(nextMonth);

  console.log('[Collector] Fetching concerts from KOPIS...');

  // 1. Fetch Concerts (Popular Music, Non-Festival)
  const concertResponse = await kopisClient.getConcertList({
    cpage: '1',
    rows: '50',
    stdate,
    eddate,
    shcate: 'CCCD',
    festival: 'N',
  });
  const rawConcerts = concertResponse.dbs?.db || [];
  const concertList = Array.isArray(rawConcerts) ? rawConcerts : [rawConcerts];

  // 2. Fetch Festivals (Popular Music)
  const festivalResponse = await kopisClient.getFestivalList({
    cpage: '1',
    rows: '50',
    stdate,
    eddate,
    shcate: 'CCCD',
  });
  const rawFestivals = festivalResponse.dbs?.db || [];
  const festivalList = Array.isArray(rawFestivals) ? rawFestivals : [rawFestivals];

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
          const artist = await concertRepository.findArtistByName(name);
          if (artist) {
            artistId = artist.id;
            console.log(`[Collector] Matched artist: ${artist.name}`);
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

      const savedConcert = await concertService.syncConcert({
        kopisId: detail.mt20id,
        title: detail.prfnm,
        posterUrl: detail.poster,
        startDate: detail.prfpdfrom,
        endDate: detail.prfpdto,
        place: detail.fcltynm,
        region: detail.area,
        status: detail.prfstate,
        runtime: detail.prfruntime,
        artistId,
        isGlobal: detail.visit === 'Y',
        isFestival: detail.festival === 'Y',

        price: detail.pcseguidance,
        schedule: detail.dtguidance,
        description: detail.sty,
        images: storyUrls,
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
