import { ExternalLink } from 'lucide-react';

import { ConcertDetail } from '@/features/concerts/server/db';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
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

        {concert.relates && concert.relates.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">예매처</h4>
            <div className="flex flex-wrap gap-2">
              {concert.relates.map((link, index) => (
                <Button key={index} variant="outline" size="sm" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.name}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
