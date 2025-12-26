import { Skeleton } from '@/shared/components/ui/skeleton';

export function AdminReviewListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 p-4 border rounded shadow-sm">
          <Skeleton className="aspect-3/4 w-full rounded-lg" /> {/* Poster area or info */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" /> {/* Title */}
            <Skeleton className="h-3 w-1/2" /> {/* Subtitle */}
          </div>
          <div className="flex gap-2 mt-auto">
            <Skeleton className="h-9 w-full rounded-md" /> {/* Button */}
            <Skeleton className="h-9 w-16 rounded-md" /> {/* Button */}
          </div>
        </div>
      ))}
    </div>
  );
}
