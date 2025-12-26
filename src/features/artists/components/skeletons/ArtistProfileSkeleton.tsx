import { Skeleton } from '@/shared/components/ui/skeleton';

export function ArtistProfileSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Image Skeleton */}
      <Skeleton className="w-full md:w-1/3 aspect-square rounded-xl shadow-lg" />

      {/* Info Skeleton */}
      <div className="flex-1 space-y-6 w-full">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-2/3 md:w-1/2" /> {/* Name */}
            <Skeleton className="h-6 w-16 rounded-full" /> {/* Genre Badge */}
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-24 rounded-md" /> {/* Follow Button */}
            <Skeleton className="h-10 w-32 rounded-full" /> {/* Spotify Button */}
          </div>
        </div>
      </div>
    </div>
  );
}
