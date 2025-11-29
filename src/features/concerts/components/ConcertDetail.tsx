import { KopisConcertDetailResponse } from '@/shared/lib/kopis/types';

import { ConcertImages } from './ConcertImages';
import { ConcertInfo } from './ConcertInfo';

type ConcertDetailData = KopisConcertDetailResponse['dbs']['db'];

interface ConcertDetailProps {
  concert: ConcertDetailData;
}

export function ConcertDetail({ concert }: ConcertDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
      <ConcertInfo concert={concert} />
      <ConcertImages concert={concert} />
    </div>
  );
}
