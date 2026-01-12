'use client';

import { useQuery } from '@tanstack/react-query';
import { Loader2, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { useDebounce } from '@/shared/hooks/use-debounce';
import { Input } from '@/shared/ui/input';

import { searchAction } from '../api/actions';
import { SearchResults } from './SearchResults';

interface SearchInputProps {
  type?: 'all' | 'concert' | 'artist';
}

export function SearchInput({ type = 'all' }: SearchInputProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

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

  React.useEffect(() => {
    if (results) {
      setIsOpen(true);
    }
  }, [results]);

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  const handleSelect = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="공연 또는 아티스트 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8 pr-8"
          onFocus={() => {
            if (results) setIsOpen(true);
          }}
        />
        {(query || isLoading) && (
          <div className="absolute right-2 top-2.5 flex items-center gap-1">
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

      {isOpen && results && (
        <React.Fragment>
          <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
            <SearchResults results={results} onSelect={handleSelect} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
