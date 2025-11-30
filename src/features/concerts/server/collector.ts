import { prisma } from '@/shared/lib/prisma';

import { concertService } from './db';

export const collectConcerts = async () => {
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  const formatDate = (date: Date) => date.toISOString().slice(0, 10).replace(/-/g, '');

  console.log('[Collector] Fetching concerts from KOPIS...');
  const concerts = await concertService.getConcerts({
    page: 1,
    size: 50,
    startDate: formatDate(today),
    endDate: formatDate(nextMonth),
  });

  console.log(`[Collector] Found ${concerts.length} concerts.`);

  const newConcerts = [];

  for (const concert of concerts) {
    const exists = await prisma.concert.findUnique({
      where: { kopisId: concert.id },
    });

    if (exists) {
      continue;
    }

    console.log(`[Collector] New concert found: ${concert.title}`);

    const detail = await concertService.getConcertDetail(concert.id);
    if (!detail) continue;

    let artistId = undefined;

    if (detail.cast) {
      const castNames = detail.cast.split(',').map((s) => s.trim());
      for (const name of castNames) {
        if (!name) continue;
        const artist = await concertService.findArtistByName(name);
        if (artist) {
          artistId = artist.id;
          console.log(`[Collector] Matched artist: ${artist.name}`);
          break;
        }
      }
    }

    const savedConcert = await concertService.upsertConcert({
      kopisId: detail.id,
      title: detail.title,
      poster: detail.poster,
      startDate: detail.startDate,
      endDate: detail.endDate,
      venueName: detail.place,
      genre: detail.genre,
      status: detail.status,
      artistId,
    });

    newConcerts.push(savedConcert);
  }

  console.log(
    `[Collector] Processed ${concerts.length} concerts. Created ${newConcerts.length} new concerts.`
  );

  return newConcerts;
};
