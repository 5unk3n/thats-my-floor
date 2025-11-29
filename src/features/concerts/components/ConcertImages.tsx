import { KopisConcertDetailResponse } from '@/shared/lib/kopis/types';
import Image from 'next/image';

type ConcertDetailData = KopisConcertDetailResponse['dbs']['db'];

interface ConcertImagesProps {
  concert: ConcertDetailData;
}

export function ConcertImages({ concert }: ConcertImagesProps) {
  const styurls = concert.styurls?.styurl;
  const images = Array.isArray(styurls) ? styurls : styurls ? [styurls] : [];

  return (
    <div className="space-y-8">
      <div className="flex justify-center bg-muted/30 p-8 rounded-lg">
        <div className="relative w-full max-w-sm aspect-[3/4] shadow-xl rounded-lg overflow-hidden">
          <Image src={concert.poster} alt={concert.prfnm} fill className="object-cover" priority />
        </div>
      </div>

      {images.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-b pb-2">공연 소개</h3>
          <div className="flex flex-col gap-4 items-center">
            {images.map((url, index) => (
              <div key={index} className="relative w-full max-w-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Introduction ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-sm"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
