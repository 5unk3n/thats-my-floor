import { Skeleton } from '@/shared/ui/skeleton';

/**
 * 캘린더 로딩 스켈레톤 UI
 */
export function CalendarSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-2">
      {/* 헤더 스켈레톤 */}
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-8 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>

      {/* 요일 헤더 스켈레톤 */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>

      {/* 캘린더 그리드 스켈레톤 */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 35 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
