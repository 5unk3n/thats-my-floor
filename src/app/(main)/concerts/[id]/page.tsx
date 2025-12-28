import { type Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ConcertDetail } from '@/features/concerts/components/ConcertDetail';
import * as concertRepository from '@/features/concerts/server/db';
import * as concertService from '@/features/concerts/server/services/concert.service';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const latestConcerts = await concertRepository.findRecentConcertsForStaticParams(100);

  if (latestConcerts.length === 0) {
    return [{ id: '__placeholder__' }];
  }

  return latestConcerts.map((concert: { id: string }) => ({
    id: concert.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  if (id === '__placeholder__') {
    return {
      title: '공연 상세',
    };
  }

  const concert = await concertService.getConcertDetail(id);

  if (!concert) {
    return {
      title: '공연을 찾을 수 없습니다',
    };
  }

  return {
    title: `${concert.title} | 공연 정보`,
    description:
      concert.description?.slice(0, 160) || `${concert.title} 공연의 상세 정보를 확인하세요.`,
    openGraph: {
      title: `${concert.title} | 공연 정보`,
      description:
        concert.description?.slice(0, 160) || `${concert.title} 공연의 상세 정보를 확인하세요.`,
      images: concert.posterUrl ? [concert.posterUrl] : [],
    },
  };
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
