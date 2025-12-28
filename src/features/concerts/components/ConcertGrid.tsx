import { Concert } from '../types';
import { ConcertCard } from './ConcertCard';

interface ConcertGridProps {
  concerts: Concert[];
}

export function ConcertGrid({ concerts }: ConcertGridProps) {
  if (concerts.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl bg-muted text-muted-foreground">
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {concerts.map((concert) => (
        <ConcertCard key={concert.id} concert={concert} />
      ))}
    </div>
  );
}
