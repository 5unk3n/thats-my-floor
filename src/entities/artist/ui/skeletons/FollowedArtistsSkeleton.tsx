import { Skeleton } from '@/shared/ui/skeleton';

export function FollowedArtistsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="aspect-square w-full rounded-full" /> {/* Artist Image */}
          <div className="space-y-2 flex flex-col items-center">
            <Skeleton className="h-5 w-3/4" /> {/* Artist Name */}
            <Skeleton className="h-4 w-1/2" /> {/* Genre/Info */}
          </div>
        </div>
      ))}
    </div>
  );
}
