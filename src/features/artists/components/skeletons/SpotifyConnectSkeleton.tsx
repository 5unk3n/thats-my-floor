import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import { Skeleton } from '@/shared/components/ui/skeleton';

export function SpotifyConnectSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <Skeleton className="h-6 w-32" /> {/* Title */}
          <Skeleton className="h-5 w-16" /> {/* Status Badge */}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" /> {/* Description */}
        <Skeleton className="h-10 w-full" /> {/* Button */}
      </CardContent>
    </Card>
  );
}
