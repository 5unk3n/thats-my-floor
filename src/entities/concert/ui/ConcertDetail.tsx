import { ConcertDetailModel } from '@/entities/concert';

import { ConcertImages } from './ConcertImages';
import { ConcertInfo } from './ConcertInfo';

interface ConcertDetailProps {
  concert: ConcertDetailModel;
}

export function ConcertDetail({ concert }: ConcertDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
      <ConcertInfo concert={concert} />
      <ConcertImages concert={concert} />
    </div>
  );
}
