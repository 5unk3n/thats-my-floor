import { notFound } from 'next/navigation';

import { ConcertDetail } from '@/features/concerts/components/ConcertDetail';
import { kopisClient } from '@/shared/lib/kopis/client';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ConcertDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const data = await kopisClient.getConcertDetail(id);
    const concert = data?.dbs?.db;

    if (!concert) {
      notFound();
    }

    return <ConcertDetail concert={concert} />;
  } catch (error) {
    console.error('Failed to fetch concert detail:', error);
    throw error;
  }
}
