import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';

export function UserProfileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-20" /> {/* Title */}
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" /> {/* Name */}
            <Skeleton className="h-4 w-48" /> {/* Email */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
