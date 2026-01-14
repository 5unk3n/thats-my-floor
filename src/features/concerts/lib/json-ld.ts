import { ConcertDetailModel } from '@/entities/concert';

export const generateConcertJsonLd = (concert: ConcertDetailModel) => {
  // 1. Status Logic
  const isCancelled = concert.status?.includes('취소');
  const eventStatus = isCancelled
    ? 'https://schema.org/EventCancelled'
    : 'https://schema.org/EventScheduled';

  // 2. Price Logic (Extract lowest price)
  // Example: "VIP 150,000 / R 120,000" -> 120000
  const priceMatches = concert.price?.match(/[0-9,]+/g) || [];
  const prices = priceMatches
    .map((p) => parseInt(p.replace(/,/g, ''), 10))
    .filter((p) => !isNaN(p));
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

  // 3. Region Logic
  const addressLocality = concert.region;

  // 4. Date Logic
  let startDate = concert.startDate.replaceAll('.', '-');
  const timeMatch = concert.schedule?.match(/(\d{2}:\d{2})/);
  if (timeMatch) {
    const [hours, minutes] = timeMatch[1].split(':');
    startDate = `${startDate}T${hours}:${minutes}+09:00`;
  }

  const offers = concert.relates?.map((link) => ({
    '@type': 'Offer',
    price: minPrice.toString(),
    priceCurrency: 'KRW',
    url: link.url,
    name: link.name,
    seller: {
      '@type': 'Organization',
      name: link.name,
    },
  }));

  // 6. Performers
  const performers = concert.artists?.map((artist) => ({
    '@type': 'Person',
    name: artist.name,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: concert.title,
    startDate: startDate,
    eventStatus,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: concert.place,
      address: {
        '@type': 'PostalAddress',
        addressLocality,
        addressCountry: 'KR',
      },
    },
    image: [concert.posterUrl, ...(concert.images || [])].filter(Boolean),
    description: concert.description || concert.title,
    offers: offers,
    performer: performers,
    organizer: {
      '@type': 'Organization',
      name: "That's My Floor",
      url: 'https://thatsmyfloor.com',
    },
  };
};
