import { ConcertDetail } from '@/features/concerts/server/db';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';

interface ConcertInfoProps {
  concert: ConcertDetail;
}

export function ConcertInfo({ concert }: ConcertInfoProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <CardTitle className="text-2xl font-bold break-keep">{concert.title}</CardTitle>
          <div className="flex gap-2 shrink-0">
            {/* Genre removed */}
            <Badge variant={concert.status === '공연중' ? 'default' : 'secondary'}>
              {concert.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">공연 기간</h4>
            <p className="font-medium">
              {concert.startDate} ~ {concert.endDate}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">공연 장소</h4>
            <p className="font-medium">{concert.place}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">티켓 가격</h4>
            <p className="font-medium">{concert.price}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">런타임</h4>
            <p className="font-medium">{concert.runtime}</p>
          </div>
        </div>

        {/* Booking Links - Temporarily hidden until db.ts mapping is fixed or if empty */}
      </CardContent>
    </Card>
  );
}
