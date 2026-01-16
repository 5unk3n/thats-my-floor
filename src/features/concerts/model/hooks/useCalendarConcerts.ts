'use client';

import { useQuery } from '@tanstack/react-query';

import { getCalendarConcertsAction } from '../../api/actions';

/**
 * 월별 캘린더 데이터 조회 훅
 */
export function useCalendarConcerts(year: number, month: number) {
  return useQuery({
    queryKey: ['calendar', year, month],
    queryFn: () => getCalendarConcertsAction(year, month),
  });
}
