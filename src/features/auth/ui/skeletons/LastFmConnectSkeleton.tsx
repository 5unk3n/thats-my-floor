import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export function LastFmConnectSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <Skeleton className="h-6 w-32" /> {/* Title */}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" /> {/* Description */}
        <Skeleton className="h-10 w-full" /> {/* Button */}
      </CardContent>
    </Card>
  );
}
