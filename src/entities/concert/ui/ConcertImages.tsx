import Image from 'next/image';

import { ConcertDetailModel } from '@/entities/concert';

interface ConcertImagesProps {
  concert: ConcertDetailModel;
}

export function ConcertImages({ concert }: ConcertImagesProps) {
  const images = concert.images || [];

  return (
    <div className="space-y-8">
      {images.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-b pb-2">공연 소개</h3>
          <div className="flex flex-col gap-4 items-center">
            {images.map((url, index) => (
              <div key={index} className="relative w-full max-w-3xl">
                <Image
                  src={url}
                  alt={`Introduction ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-sm"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
