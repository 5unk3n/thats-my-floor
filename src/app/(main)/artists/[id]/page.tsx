import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { ArtistConcerts } from '@/features/artists/components/ArtistConcerts';
import { ArtistProfile } from '@/features/artists/components/ArtistProfile';
import { getArtistProfile } from '@/features/artists/server/db';
import { Skeleton } from '@/shared/components/ui/skeleton';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtistDetailPage({ params }: PageProps) {
  const { id } = await params;
  const artist = await getArtistProfile(id);

  if (!artist) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <ArtistProfile artist={artist} />

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
          <ArtistConcerts artistId={id} />
        </Suspense>
      </section>
    </div>
  );
}
