/**
 * 공연 캘린더 관련 타입 정의
 */

/** 공연 유형 (국내/내한/페스티벌) */
export type ConcertType = 'DOMESTIC' | 'GLOBAL' | 'FESTIVAL';

/** 캘린더에 표시되는 공연 정보 */
export interface CalendarConcert {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  type: ConcertType;
  place: string;
  posterUrl: string | null;
  artistNames: string[]; // 아티스트 이름 목록
}

/** 특정 날짜의 공연 목록 */
export interface DayConcerts {
  date: string; // YYYY-MM-DD
  concerts: CalendarConcert[];
}

/** 월별 캘린더 데이터 */
export interface MonthCalendarData {
  year: number;
  month: number;
  days: DayConcerts[];
}

/** 공연 타입별 색상 설정 */
export const CONCERT_TYPE_COLORS: Record<ConcertType, { bg: string; text: string; label: string }> =
  {
    DOMESTIC: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-700 dark:text-blue-400',
      label: '국내',
    },
    GLOBAL: {
      bg: 'bg-purple-500/20',
      text: 'text-purple-700 dark:text-purple-400',
      label: '내한',
    },
    FESTIVAL: {
      bg: 'bg-orange-500/20',
      text: 'text-orange-700 dark:text-orange-400',
      label: '페스티벌',
    },
  };
