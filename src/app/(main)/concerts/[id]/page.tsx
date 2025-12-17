import { notFound } from 'next/navigation';

import { ConcertDetail } from '@/features/concerts/components/ConcertDetail';
import { concertService } from '@/features/concerts/server/db';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ConcertDetailPage({ params }: PageProps) {
  const { id } = await params;

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
