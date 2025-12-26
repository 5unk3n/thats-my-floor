import { notFound } from 'next/navigation';

import { ConcertDetail } from '@/features/concerts/components/ConcertDetail';
import { concertService } from '@/features/concerts/server/db';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const latestConcerts = await concertService.getRecentConcertsForStaticParams(100);

  if (latestConcerts.length === 0) {
    return [{ id: '__placeholder__' }];
  }

  return latestConcerts.map((concert: { id: string }) => ({
    id: concert.id,
  }));
}

export default async function ConcertDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (id === '__placeholder__') {
    notFound();
  }

  let concert;

  try {
    concert = await concertService.getConcertDetail(id);
  } catch (error) {
    console.error('Failed to fetch concert detail:', error);
    throw error;
  }

  if (!concert) {
    notFound();
  }

  return <ConcertDetail concert={concert} />;
}
