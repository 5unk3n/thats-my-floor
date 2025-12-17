'use client';

import { Loader2, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Input } from '@/shared/components/ui/input';

import { search } from '../server/actions';
import { SearchResult } from '../types';
import { SearchResults } from './SearchResults';

export function SearchInput() {
  const router = useRouter();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  // Custom debounce logic if hook not found, but let's check hook first.
  // For now I'll implement standard useEffect debounce to be safe.

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length === 0) {
        setResults(null);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await search(query);
        setResults(data);
        setIsOpen(true);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setResults(null);
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
