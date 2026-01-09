import { ConcertRepository } from '@/entities/concert';

export const getConcertsByArtistId = async (artistId: number) => {
  const concerts = await ConcertRepository.findConcertsByArtistId(artistId);

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0].replace(/-/g, '.');
  };

  return concerts.map((c) => ({
    id: c.id,
    title: c.title,
    posterUrl: c.posterUrl || '',
    startDate: formatDate(c.startDate),
    endDate: formatDate(c.endDate),
    place: c.place,
    status: c.status || '',
  }));
};

export const getConcertsByArtistMbid = async (artistMbid: string) => {
  const concerts = await ConcertRepository.findConcertsByArtistMbid(artistMbid);

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0].replace(/-/g, '.');
  };

  return concerts.map((c) => ({
    id: c.id,
    title: c.title,
    posterUrl: c.posterUrl || '',
    startDate: formatDate(c.startDate),
    endDate: formatDate(c.endDate),
    place: c.place,
    status: c.status || '',
  }));
};
