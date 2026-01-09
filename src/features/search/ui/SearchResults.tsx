'use client';

import Image from 'next/image';
import * as React from 'react';

import { SearchResult } from '../model/types';

interface SearchResultsProps {
  results: SearchResult;
  onSelect: (url: string) => void;
}

export function SearchResults({ results, onSelect }: SearchResultsProps) {
  const hasConcerts = results.concerts.length > 0;
  const hasArtists = results.artists.length > 0;

  if (!hasConcerts && !hasArtists) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">검색 결과가 없습니다.</div>
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto py-2">
      {hasConcerts && (
        <div className="mb-2">
          <h3 className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">공연</h3>
          <ul>
            {results.concerts.map((concert) => (
              <li key={concert.id}>
                <button
                  onClick={() => onSelect(`/concerts/${concert.id}`)}
                  className="flex w-full items-center gap-3 px-3 py-2 hover:bg-accent hover:text-accent-foreground text-left"
                >
                  <div className="relative h-10 w-8 shrink-0 overflow-hidden rounded bg-gray-100 dark:bg-gray-800">
                    {concert.posterUrl ? (
                      <Image
                        src={concert.posterUrl}
                        alt={concert.title}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        No
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{concert.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{concert.place}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasArtists && (
        <div>
          <h3 className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">아티스트</h3>
          <ul>
            {results.artists.map((artist) => (
              <li key={artist.id}>
                <button
                  onClick={() => onSelect(`/artists/${artist.id}`)} // Assuming artist page exists
                  className="flex w-full items-center gap-3 px-3 py-2 hover:bg-accent hover:text-accent-foreground text-left"
                >
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    {artist.image ? (
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-medium text-muted-foreground">
                        {artist.name.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{artist.name}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
