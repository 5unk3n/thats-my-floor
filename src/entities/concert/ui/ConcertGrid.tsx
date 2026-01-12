import { Concert } from '@/entities/concert';
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area';

import { ConcertCard } from './ConcertCard';

interface ConcertGridProps {
  concerts: Concert[];
  layout?: 'grid' | 'horizontal';
}

export function ConcertGrid({ concerts, layout = 'grid' }: ConcertGridProps) {
  if (concerts.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl bg-muted text-muted-foreground">
        검색 결과가 없습니다.
      </div>
    );
  }

  if (layout === 'horizontal') {
    return (
      <ScrollArea className="w-full whitespace-nowrap rounded-md pb-4">
        <div className="flex w-max space-x-4 p-4">
          {concerts.map((concert) => (
            <div key={concert.id} className="w-40 shrink-0 md:w-50">
              <ConcertCard concert={concert} />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
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
