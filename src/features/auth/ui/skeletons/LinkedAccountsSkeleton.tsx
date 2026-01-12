import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export function LinkedAccountsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-20" /> {/* Title */}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Render 1 skeleton item to match current provider list */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-5 w-16" /> {/* Provider Name */}
          </div>
          <Skeleton className="h-5 w-16" /> {/* Action Button / Status */}
        </div>
      </CardContent>
    </Card>
  );
}
