'use client';

import { format, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';

import { cn } from '@/shared/lib/utils';

import type { CalendarConcert, DayConcerts } from '../../model/types';
import { CONCERT_TYPE_COLORS } from '../../model/types';
import { CalendarConcertPopover } from './CalendarConcertPopover';

interface CalendarCellProps {
  day: DayConcerts;
  isCurrentMonth: boolean;
}

const MAX_VISIBLE_CONCERTS = 4;

/**
 * 개별 캘린더 셀 컴포넌트
 * 날짜와 공연 목록 표시 (최대 4개)
 */
export function CalendarCell({ day, isCurrentMonth }: CalendarCellProps) {
  const date = new Date(day.date);
  const dayNumber = date.getDate();
  const isCurrentDay = isToday(date);
  const { concerts } = day;
  const visibleConcerts = concerts.slice(0, MAX_VISIBLE_CONCERTS);
  const remainingCount = concerts.length - MAX_VISIBLE_CONCERTS;

  const dateLabel = format(date, 'M월 d일 (EEEE)', { locale: ko });

  return (
    <CalendarConcertPopover concerts={concerts} dateLabel={dateLabel}>
      <button
        type="button"
        className={cn(
          'group relative flex h-24 w-full flex-col rounded-md border p-0.5 text-left transition-colors hover:bg-muted/50 md:h-32 md:p-1',
          !isCurrentMonth && 'bg-muted/30 text-muted-foreground opacity-50',
          isCurrentDay && 'border-primary bg-primary/5'
        )}
        disabled={concerts.length === 0}
      >
        {/* 날짜 숫자 */}
        <span
          className={cn(
            'text-xs font-medium md:text-sm',
            isCurrentDay &&
              'flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground md:h-6 md:w-6'
          )}
        >
          {dayNumber}
        </span>

        {/* 공연 목록 */}
        <div className="mt-0.5 flex flex-1 flex-col gap-0.5 overflow-hidden">
          {visibleConcerts.map((concert) => (
            <ConcertBadge key={concert.id} concert={concert} />
          ))}

          {/* 추가 공연 수 */}
          {remainingCount > 0 && (
            <span className="text-[10px] font-medium text-muted-foreground md:text-xs">
              +{remainingCount}개
            </span>
          )}
        </div>
      </button>
    </CalendarConcertPopover>
  );
}

/**
 * 공연 배지 컴포넌트
 */
function ConcertBadge({ concert }: { concert: CalendarConcert }) {
  const colors = CONCERT_TYPE_COLORS[concert.type];

  return (
    <div
      className={cn(
        'truncate rounded px-1 py-0.5 text-[10px] leading-tight md:text-xs',
        colors.bg,
        colors.text
      )}
    >
      {concert.title}
    </div>
  );
}
