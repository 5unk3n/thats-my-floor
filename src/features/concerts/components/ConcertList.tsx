import { Concert } from '../types';
import { ConcertCard } from './ConcertCard';

interface ConcertListProps {
  concerts: Concert[];
}

export function ConcertList({ concerts }: ConcertListProps) {
  if (concerts.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl bg-muted text-muted-foreground">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {concerts.map((concert) => (
        <ConcertCard key={concert.id} concert={concert} />
      ))}
    </div>
  );
}
