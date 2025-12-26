import { Suspense } from 'react';

import { ArtistConcerts } from '@/features/artists/components/ArtistConcerts';
import { ArtistProfileFetcher } from '@/features/artists/components/ArtistProfileFetcher';
import { ArtistProfileSkeleton } from '@/features/artists/components/skeletons/ArtistProfileSkeleton';
import { Skeleton } from '@/shared/components/ui/skeleton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ArtistDetailPage({ params }: PageProps) {
  const idPromise = params.then((p) => p.id);

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <Suspense fallback={<ArtistProfileSkeleton />}>
        <ArtistProfileFetcher artistId={idPromise} />
      </Suspense>

      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">🎟️ 참여하는 공연</h2>

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-xl" />
              ))}
            </div>
          }
        >
          <ArtistConcerts artistId={idPromise} />
        </Suspense>
      </section>
    </div>
  );
}
