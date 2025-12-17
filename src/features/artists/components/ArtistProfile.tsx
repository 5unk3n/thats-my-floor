import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

import { ArtistDetail } from '../types';
import { FollowButton } from './FollowButton';

interface ArtistProfileProps {
  artist: ArtistDetail;
  isFollowing: boolean;
}

export function ArtistProfile({ artist, isFollowing }: ArtistProfileProps) {
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
            <FollowButton artistId={artist.id} initialIsFollowing={isFollowing} />

            {artist.spotifyArtistId && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-[#1DB954] text-[#1DB954] hover:bg-[#1DB954] hover:text-white transition-colors"
              >
                <Link
                  href={`https://open.spotify.com/artist/${artist.spotifyArtistId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="20"
                    width="20"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.48.66.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.46-1.02 15.66 1.44.539.3.66.96.359 1.5-.3.48-.96.66-1.44.36z" />
                  </svg>
                  Spotify
                </Link>
              </Button>
            )}

            {/* Description removed as per request */}
          </div>
        </div>

        {/* Removed redundant Spotify button block that was below description */}
      </div>
    </div>
  );
}
