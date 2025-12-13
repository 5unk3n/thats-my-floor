'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

import { CONCERT_TYPES, REGIONS } from '../types';

export function ConcertFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRegion = searchParams.get('region') || '';
  const currentType = searchParams.get('type') || '';

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== 'ALL') {
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
        <Select
          value={currentRegion || 'ALL'}
          onValueChange={(value) => handleFilterChange('region', value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">전체</SelectItem>
            {REGIONS.map((region) => (
              <SelectItem key={region.code} value={region.code}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">공연 형태</label>
        <Select
          value={currentType || 'ALL'}
          onValueChange={(value) => handleFilterChange('type', value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">전체</SelectItem>
            {CONCERT_TYPES.map((type) => (
              <SelectItem key={type.code} value={type.code}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
