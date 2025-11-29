import Image from 'next/image';

import { Concert } from '../model/types';

interface ConcertCardProps {
  concert: Concert;
}

export function ConcertCard({ concert }: ConcertCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md dark:bg-gray-800">
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

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 text-xs font-medium text-blue-600 dark:text-blue-400">
          {concert.genre}
        </div>
        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
          {concert.title}
        </h3>
        <div className="mt-auto space-y-1 text-sm text-gray-600 dark:text-gray-300">
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
      </div>
    </div>
  );
}
