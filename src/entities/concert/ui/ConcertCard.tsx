import Image from 'next/image';
import Link from 'next/link';

import { Concert } from '@/entities/concert';
import { Card, CardContent } from '@/shared/ui/card';

interface ConcertCardProps {
  concert: Concert;
}

export function ConcertCard({ concert }: ConcertCardProps) {
  return (
    <Link href={`/concerts/${concert.id}`} className="group block h-full">
      <Card className="relative flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
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
            {concert.status}
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col justify-center p-3">
          <h3 className="line-clamp-2 text-sm font-bold text-gray-900 dark:text-white">
            {concert.title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
