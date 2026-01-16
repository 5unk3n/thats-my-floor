'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { useDebounce } from '@/shared/hooks/use-debounce';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/ui/command';

import { searchAction } from '../api/actions';

interface SearchCommandProps {
  type?: 'all' | 'concert' | 'artist';
}

export function SearchCommand({ type = 'all' }: SearchCommandProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const { data: results, isLoading } = useQuery({
    queryKey: ['search', type, debouncedQuery],
    queryFn: async () => {
      const response = await searchAction(debouncedQuery, type);
      if (!response.success) {
        throw new Error(response.error?.message);
      }
      return response.data;
    },
    enabled: debouncedQuery.trim().length > 0,
  });

  const hasResults = results && (results.concerts.length > 0 || results.artists.length > 0);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(url);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <Command shouldFilter={false} className="rounded-lg border shadow-none bg-transparent">
        <div className="relative">
          <CommandInput
            placeholder="공연 또는 아티스트 검색..."
            value={query}
            onValueChange={(value) => {
              setQuery(value);
              if (value.trim()) setIsOpen(true);
            }}
            onFocus={() => {
              if (hasResults) setIsOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }}
            className="pr-8"
          />
          {(query || isLoading) && (
            <div className="absolute right-2 top-2.5 flex items-center gap-1 z-10">
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : query ? (
                <button onClick={handleClear} type="button">
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              ) : null}
            </div>
          )}
        </div>

        {isOpen && query.trim() && (
          <CommandList className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border bg-popover shadow-md max-h-[80vh]">
            {!hasResults && !isLoading && <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>}

            {results?.concerts && results.concerts.length > 0 && (
              <CommandGroup heading="공연">
                {results.concerts.map((concert) => (
                  <CommandItem
                    key={concert.id}
                    value={`concert-${concert.id}-${concert.title}`}
                    onSelect={() => handleSelect(`/concerts/${concert.id}`)}
                    className="gap-3 px-3 py-2"
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
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {results?.artists && results.artists.length > 0 && (
              <CommandGroup heading="아티스트">
                {results.artists.map((artist) => (
                  <CommandItem
                    key={artist.mbid}
                    value={`artist-${artist.mbid}-${artist.name}`}
                    onSelect={() => handleSelect(`/artists/${artist.mbid}`)}
                    className="gap-3 px-3 py-2"
                  >
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      {artist.imageUrl ? (
                        <Image
                          src={artist.imageUrl}
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
                      {artist.comment && (
                        <p className="truncate text-xs text-muted-foreground">{artist.comment}</p>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
}
