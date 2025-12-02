import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/shared/components/ui/card';

import { Concert } from '../model/types';

interface ConcertCardProps {
  concert: Concert;
}

export function ConcertCard({ concert }: ConcertCardProps) {
  return (
    <Link href={`/concerts/${concert.id}`} className="group block">
      <Card className="relative flex flex-col overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-100">
          {concert.posterUrl ? (
            <Image
              src={concert.posterUrl}
              alt={concert.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <div className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {concert.state}
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col p-4">
          <div className="mb-2 text-xs font-medium text-blue-600 dark:text-blue-400">
            {concert.genre}
          </div>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
            {concert.title}
          </h3>
          <div className="mt-auto space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>📅</span>
              <span>
                {concert.startDate} ~ {concert.endDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span className="line-clamp-1">{concert.venue}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
