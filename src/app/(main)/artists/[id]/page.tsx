import { notFound } from 'next/navigation';

import { ArtistProfile } from '@/features/artists/components/ArtistProfile';
import { getFollowStatus } from '@/features/artists/server/actions';
import { getArtistDetail } from '@/features/artists/server/db';
import { ConcertCard } from '@/features/concerts/components/ConcertCard';
import { Concert } from '@/features/concerts/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ArtistDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [artist, followStatusResponse] = await Promise.all([
    getArtistDetail(id),
    getFollowStatus(id),
  ]);
  const isFollowing = followStatusResponse.success ? followStatusResponse.data : false;

  if (!artist) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <ArtistProfile artist={artist} isFollowing={isFollowing} />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          🎟️ 참여하는 공연
          <span className="text-muted-foreground text-lg font-normal">
            ({artist.concerts.length})
          </span>
        </h2>

        {artist.concerts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artist.concerts.map((concert) => (
              <ConcertCard key={concert.id} concert={concert as unknown as Concert} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-gray-500 text-lg">아직 예정된 공연이 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}
