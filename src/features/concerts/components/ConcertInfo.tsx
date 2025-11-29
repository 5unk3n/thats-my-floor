import { KopisConcertDetailResponse } from '@/shared/lib/kopis/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';

type ConcertDetailData = KopisConcertDetailResponse['dbs']['db'];

interface ConcertInfoProps {
  concert: ConcertDetailData;
}

export function ConcertInfo({ concert }: ConcertInfoProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <CardTitle className="text-2xl font-bold break-keep">{concert.prfnm}</CardTitle>
          <div className="flex gap-2 shrink-0">
            <Badge variant="outline">{concert.genrenm}</Badge>
            <Badge variant={concert.state === '공연중' ? 'default' : 'secondary'}>
              {concert.state}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">공연 기간</h4>
            <p className="font-medium">
              {concert.prfpdfrom} ~ {concert.prfpdto}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">공연 장소</h4>
            <p className="font-medium">{concert.fcltynm}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">관람 연령</h4>
            <p className="font-medium">{concert.prfage}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">티켓 가격</h4>
            <p className="font-medium">{concert.pcseguidance}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">런타임</h4>
            <p className="font-medium">{concert.prfruntime}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">출연진</h4>
            <p className="font-medium">{concert.prfcast || '-'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">제작진</h4>
            <p className="font-medium">{concert.prfcrew || '-'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">제작사</h4>
            <p className="font-medium">{concert.entrpsnm || '-'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
