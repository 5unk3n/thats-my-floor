'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { ScrollArea } from '@/shared/ui/scroll-area';

import type { CalendarConcert } from '../../model/types';
import { CONCERT_TYPE_COLORS } from '../../model/types';

interface CalendarConcertPopoverProps {
  concerts: CalendarConcert[];
  dateLabel: string;
  children: React.ReactNode;
}

/**
 * 공연 상세 Popover 컴포넌트
 * 특정 날짜의 공연 목록을 Popover로 표시
 */
export function CalendarConcertPopover({
  concerts,
  dateLabel,
  children,
}: CalendarConcertPopoverProps) {
  if (concerts.length === 0) {
    return <>{children}</>;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="border-b px-4 py-3">
          <h4 className="font-semibold">{dateLabel}</h4>
          <p className="text-sm text-muted-foreground">{concerts.length}개의 공연</p>
        </div>
        <ScrollArea className="h-80">
          <div className="divide-y">
            {concerts.map((concert) => (
              <Link
                key={concert.id}
                href={`/concerts/${concert.id}`}
                className="flex gap-3 p-3 transition-colors hover:bg-muted"
              >
                {/* 포스터 썸네일 */}
                <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded bg-muted">
                  {concert.posterUrl ? (
                    <Image
                      src={concert.posterUrl}
                      alt={concert.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      No Image
                    </div>
                  )}
                </div>

                {/* 공연 정보 */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${CONCERT_TYPE_COLORS[concert.type].bg} ${CONCERT_TYPE_COLORS[concert.type].text}`}
                    >
                      {CONCERT_TYPE_COLORS[concert.type].label}
                    </span>
                  </div>
                  {/* 제목: 2줄까지 표시 */}
                  <p className="mt-1 line-clamp-2 text-sm font-medium leading-tight">
                    {concert.title}
                  </p>
                  {/* 아티스트 목록 */}
                  {concert.artistNames.length > 0 && (
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {concert.artistNames.join(', ')}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
