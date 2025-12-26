import { Skeleton } from '@/shared/components/ui/skeleton';

export function SpotifySyncSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="aspect-square w-full rounded-full" /> {/* Artist Image */}
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-4 w-3/4" /> {/* Artist Name */}
              <Skeleton className="h-8 w-full rounded-md" /> {/* Button */}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Skeleton className="h-10 w-32 rounded-md" /> {/* Load More Button */}
      </div>
    </div>
  );
}
