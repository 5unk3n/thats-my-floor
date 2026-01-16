'use client';

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useState } from 'react';

import { Button } from '@/shared/ui/button';

import { useCalendarConcerts } from '../../model/hooks/useCalendarConcerts';
import type { DayConcerts } from '../../model/types';
import { CalendarCell } from './CalendarCell';
import { CalendarSkeleton } from './CalendarSkeleton';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

/**
 * 월별 캘린더 그리드 컴포넌트
 * React Query를 사용하여 상태 관리
 */
export function CalendarGrid() {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // React Query로 데이터 조회
  const { data: calendarData, isLoading, isFetching } = useCalendarConcerts(year, month);

  // 이전 월 이동
  const handlePrevMonth = useCallback(() => {
    setCurrentDate((prev) => subMonths(prev, 1));
  }, []);

  // 다음 월 이동
  const handleNextMonth = useCallback(() => {
    setCurrentDate((prev) => addMonths(prev, 1));
  }, []);

  // 오늘로 이동
  const handleToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  // 캘린더 그리드 날짜 계산 (이전/다음 월 포함)
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  // 데이터와 날짜 매핑
  const getDayData = (date: Date): DayConcerts => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayData = calendarData?.days.find((d) => d.date === dateStr);
    return dayData ?? { date: dateStr, concerts: [] };
  };

  if (isLoading) {
    return <CalendarSkeleton />;
  }

  return (
    <div className="relative rounded-lg border bg-card p-2">
      {/* 헤더: 월 표시 및 네비게이션 */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {format(currentDate, 'yyyy년 M월', { locale: ko })}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToday}
            className="hidden sm:inline-flex"
          >
            오늘
          </Button>
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">이전 월</span>
          </Button>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">다음 월</span>
          </Button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAY_LABELS.map((label, index) => (
          <div
            key={label}
            className={`text-center text-xs font-medium ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* 캘린더 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          return (
            <CalendarCell
              key={day.toISOString()}
              day={getDayData(day)}
              isCurrentMonth={isCurrentMonth}
            />
          );
        })}
      </div>

      {/* 데이터 새로고침 중 표시 */}
      {isFetching && !isLoading && (
        <div className="absolute right-4 top-4">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
    </div>
  );
}
