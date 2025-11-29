import { Concert } from '../model/types';
import { ConcertCard } from './ConcertCard';

interface ConcertListProps {
  concerts: Concert[];
}

export function ConcertList({ concerts }: ConcertListProps) {
  if (concerts.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl bg-gray-50 text-gray-500 dark:bg-gray-800/50">
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
