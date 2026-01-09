import { Skeleton } from '@/shared/ui/skeleton';

export function ConcertFilterSkeleton() {
  return (
    <div className="mb-8 flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-12" /> {/* Label */}
        <Skeleton className="h-10 w-[140px] rounded-md" /> {/* Select Trigger */}
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-16" /> {/* Label */}
        <Skeleton className="h-10 w-[140px] rounded-md" /> {/* Select Trigger */}
      </div>
    </div>
  );
}
