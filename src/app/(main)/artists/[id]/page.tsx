import { type Metadata } from 'next';
import { Suspense } from 'react';

import { ArtistProfileSkeleton } from '@/entities/artist/ui/skeletons/ArtistProfileSkeleton';
import { ConcertListSkeleton } from '@/entities/concert/ui/skeletons/ConcertListSkeleton';
import { ArtistProfileFetcher, ArtistService } from '@/features/artists';
import { ArtistConcertList } from '@/features/concerts';

interface ArtistDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ArtistDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const artist = await ArtistService.getArtistProfile(id);

  if (!artist) {
    return {
      title: '아티스트를 찾을 수 없습니다',
    };
  }

  return {
    title: `${artist.name} | 아티스트 정보`,
    description: artist.description?.slice(0, 160) || `${artist.name}의 공연 정보를 확인하세요.`,
    openGraph: {
      title: `${artist.name} | 아티스트 정보`,
      description: artist.description?.slice(0, 160) || `${artist.name}의 공연 정보를 확인하세요.`,
      images: artist.image ? [artist.image] : [],
    },
  };
}

export default function ArtistDetailPage({ params }: ArtistDetailPageProps) {
  // Extract id promise for specialized components
  const idPromise = params.then((p) => p.id);

  return (
    <main className="min-h-screen bg-background pb-20 pt-8">
      <div className="container mx-auto px-4 space-y-12">
        <Suspense fallback={<ArtistProfileSkeleton />}>
          <ArtistProfileFetcher artistId={idPromise} />
        </Suspense>

        <section>
          <h2 className="text-2xl font-bold mb-6">예정된 공연</h2>
          <Suspense fallback={<ConcertListSkeleton />}>
            <ArtistConcertList artistId={idPromise} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
