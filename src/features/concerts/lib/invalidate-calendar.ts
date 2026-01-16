import { differenceInMonths, eachMonthOfInterval, format } from 'date-fns';
import { revalidateTag } from 'next/cache';

/**
 * 공연 기간에 해당하는 캘린더 캐시 무효화
 * 시작월부터 종료월까지 모든 월의 캐시를 무효화
 */
export function invalidateCalendarCache(startDate: Date, endDate: Date) {
  // 6개월 이상 차이나는 경우 방어
  const monthDiff = differenceInMonths(endDate, startDate);
  if (monthDiff > 6) {
    console.warn('[Calendar Cache] Skipping invalidation: date range too large');
    return;
  }

  const months = eachMonthOfInterval({ start: startDate, end: endDate });

  months.forEach((monthDate) => {
    const tag = `calendar-${format(monthDate, 'yyyy-M')}`;
    revalidateTag(tag, { expire: 0 });
    console.log(`[Calendar Cache] Invalidated: ${tag}`);
  });
}
