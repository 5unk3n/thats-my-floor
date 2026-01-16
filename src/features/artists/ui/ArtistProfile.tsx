import Image from 'next/image';
import Link from 'next/link';

import { Artist } from '@/entities/artist/model/types';

import { FollowButton } from './FollowButton';

interface ArtistProfileProps {
  artist: Artist;
  isFollowing: boolean;
}

export function ArtistProfile({ artist, isFollowing }: ArtistProfileProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="relative w-full md:w-1/3 aspect-square rounded-xl overflow-hidden shadow-lg bg-gray-100">
        {artist.imageUrl ? (
          <Image
            src={artist.imageUrl}
            alt={artist.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="flex-1 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {artist.name}
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <FollowButton mbid={artist.mbid} initialIsFollowing={isFollowing} />
            </div>

            {artist.externalLinks && (
              <div className="flex flex-col gap-2">
                <h3 className="text-md font-semibold text-muted-foreground">링크</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  {[
                    { key: 'appleMusic', label: 'Apple Music', color: '#FA243C' },
                    { key: 'spotify', label: 'Spotify', color: '#1DB954' },
                    { key: 'youtube', label: 'YouTube', color: '#FF0000' },
                    { key: 'melon', label: 'Melon', color: '#00CD3C' },
                  ].map((service) => {
                    const url =
                      artist.externalLinks?.[service.key as keyof typeof artist.externalLinks];
                    if (!url) return null;

                    return (
                      <Link
                        key={service.key}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline font-medium transition-colors"
                        style={{ color: service.color }}
                      >
                        {service.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
