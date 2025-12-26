import { ConcertCard } from '@/features/concerts/components/ConcertCard';
import * as concertRepository from '@/features/concerts/server/db';
import { Concert } from '@/features/concerts/types';

interface ArtistConcertListProps {
  artistId: Promise<string> | string;
}

export async function ArtistConcertList({ artistId }: ArtistConcertListProps) {
  const id = await artistId;
  const concerts = await concertRepository.getConcertsByArtistId(id);

  if (concerts.length === 0) {
    return (
      <div className="py-12 text-center bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <p className="text-gray-500 text-lg">아직 예정된 공연이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {concerts.map((concert) => (
        <ConcertCard key={concert.id} concert={concert as unknown as Concert} />
      ))}
    </div>
  );
}
