import { ConcertDetail } from '@/features/concerts/types';

interface ConcertImagesProps {
  concert: ConcertDetail;
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
