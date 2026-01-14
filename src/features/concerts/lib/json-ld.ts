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
  const addressLocality = concert.region || 'South Korea';

  // 4. Date Logic
  // Extract time from schedule (e.g., "(19:00)") if startDate has 00:00:00
  let startDate = concert.startDate;
  const timeMatch = concert.schedule?.match(/(\d{2}:\d{2})/);
  if (timeMatch && (startDate.includes('00:00:00') || !startDate.includes(':'))) {
    // If it's "YYYY-MM-DD 00:00:00" or just "YYYY-MM-DD"
    const datePart = startDate.split(' ')[0]; // Take YYYY-MM-DD
    startDate = `${datePart}T${timeMatch[1]}:00`;
  }

  // 5. Offers Logic
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
    endDate: concert.endDate,
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
