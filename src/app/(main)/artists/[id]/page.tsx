import { Suspense } from 'react';

import { ArtistProfileFetcher } from '@/features/artists/components/ArtistProfileFetcher';
import { ArtistProfileSkeleton } from '@/features/artists/components/skeletons/ArtistProfileSkeleton';
import { ArtistConcertList } from '@/features/concerts/components/ArtistConcertList';
import { ConcertListSkeleton } from '@/features/concerts/components/skeletons/ConcertListSkeleton';

interface ArtistDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ArtistDetailPage({ params }: ArtistDetailPageProps) {
  // Extract id promise for specialized components
  const idPromise = params.then((p) => p.id);

  return (
    <main className="min-h-screen bg-background pb-20">
      <Suspense fallback={<ArtistProfileSkeleton />}>
        <ArtistProfileFetcher artistId={idPromise} />
      </Suspense>

      <div className="container mx-auto px-4 mt-8 space-y-8">
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
