import { ConcertDetail as ConcertDetailType } from '@/features/concerts/server/db';

import { ConcertImages } from './ConcertImages';
import { ConcertInfo } from './ConcertInfo';

interface ConcertDetailProps {
  concert: ConcertDetailType;
}

export function ConcertDetail({ concert }: ConcertDetailProps) {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
      <ConcertInfo concert={concert} />
      <ConcertImages concert={concert} />
    </div>
  );
}
