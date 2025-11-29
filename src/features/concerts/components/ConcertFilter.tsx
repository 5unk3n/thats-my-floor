'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { GENRES, REGIONS } from '../model/types';

export function ConcertFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRegion = searchParams.get('region') || '';
  const currentGenre = searchParams.get('genre') || '';

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset page when filter changes
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-8 flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">지역</label>
        <select
          value={currentRegion}
          onChange={(e) => handleFilterChange('region', e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">전체</option>
          {REGIONS.map((region) => (
            <option key={region.code} value={region.code}>
              {region.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">장르</label>
        <select
          value={currentGenre}
          onChange={(e) => handleFilterChange('genre', e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">전체</option>
          {GENRES.map((genre) => (
            <option key={genre.code} value={genre.code}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
