import Image from 'next/image';
import Link from 'next/link';

import { Artist } from '@/entities/artist/model/types';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';

import { FollowButton } from './FollowButton';

interface ArtistProfileProps {
  artist: Artist;
}

export function ArtistProfile({ artist }: ArtistProfileProps) {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      <div className="relative w-full md:w-1/3 aspect-square rounded-xl overflow-hidden shadow-lg bg-gray-100">
        {artist.image ? (
          <Image
            src={artist.image}
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
            {artist.genre && (
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {artist.genre}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <FollowButton artistId={artist.id} />

            {artist.lastfmArtistId && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-[#B90000] text-[#B90000] hover:bg-[#B90000] hover:text-white transition-colors"
              >
                <Link
                  href={`https://www.last.fm/music/${encodeURIComponent(artist.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {/* Simple Last.fm like icon (Note) or just text 'Last.fm' */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="20"
                    width="20"
                    aria-hidden="true"
                  >
                    <path d="M12.0003 0C5.3727 0 0 5.37274 0 12.0003C0 18.6279 5.3727 24.0006 12.0003 24.0006C18.6279 24.0006 24.0006 18.6279 24.0006 12.0003C24.0006 5.37274 18.6279 0 12.0003 0ZM15.4549 16.9419C14.3644 16.9419 13.5615 16.2995 13.5615 15.3468C13.5615 13.7997 15.3469 13.6806 16.5562 13.3831C16.5562 13.1251 16.5562 12.9862 16.5562 12.8077C16.5562 12.0735 16.0801 11.6966 15.366 11.6966C14.8306 11.6966 14.1858 11.9545 13.3432 12.4505V9.93081C14.047 9.53401 14.9496 9.35547 15.8222 9.35547C17.7268 9.35547 19.3338 10.0895 19.3338 12.4704V16.7634H17.0719V15.5254C16.5956 16.478 16.0009 16.9419 15.4549 16.9419ZM8.24458 16.9419C6.41943 16.9419 4.93152 15.446 4.93152 13.165C4.93152 10.9626 6.35999 9.35552 8.42314 9.35552C9.55395 9.35552 10.5062 9.77215 11.1609 10.4268V7.15344L13.5418 6.6773V16.7634H11.1609V15.7039C10.5855 16.5375 9.51419 16.9419 8.24458 16.9419ZM16.5562 15.3072V14.593C15.9809 14.7319 15.604 14.8906 15.604 15.4262C15.604 15.5453 15.6238 15.6444 15.6635 15.7237C15.8222 16.0411 16.1594 16.0609 16.3578 15.9221C16.4965 15.8229 16.5562 15.6245 16.5562 15.3072ZM9.25626 15.0094C9.91097 15.0094 10.7442 14.6127 11.1609 13.7993V12.4503C10.7045 11.6963 9.93082 11.2798 9.25626 11.2798C8.28424 11.2798 7.5502 12.0734 7.5502 13.1449C7.5502 14.1963 8.28424 15.0094 9.25626 15.0094Z" />
                  </svg>
                  Last.fm
                </Link>
              </Button>
            )}

            {/* Description removed as per request */}
          </div>
        </div>

        {/* Removed redundant button block */}
      </div>
    </div>
  );
}
