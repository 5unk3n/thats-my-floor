import { Skeleton } from '@/shared/components/ui/skeleton';

export function ConcertListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="aspect-[3/4] w-full rounded-xl" /> {/* Poster */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-3/4" /> {/* Title */}
            <Skeleton className="h-3 w-1/2" /> {/* Date/Venue */}
          </div>
        </div>
      ))}
    </div>
  );
}
