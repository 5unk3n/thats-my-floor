import { eachDayOfInterval, getDay, startOfDay } from 'date-fns';

export interface ScheduleEntry {
  days: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  times: string[]; // ["19:00", "14:00"]
}

const DAY_MAP: Record<string, number> = {
  일요일: 0,
  일: 0,
  월요일: 1,
  월: 1,
  화요일: 2,
  화: 2,
  수요일: 3,
  수: 3,
  목요일: 4,
  목: 4,
  금요일: 5,
  금: 5,
  토요일: 6,
  토: 6,
};

/**
 * 파싱 가능한 스케줄 문자열 패턴
 * 예: "토요일(19:00), 일요일(18:00)"
 * 예: "화요일 ~ 금요일(20:00)"
 * 예: "HOL(14:00)"
 */
const PATTERN = /([가-힣a-zA-Z~\s,]+)\(([\d:,]+)\)/g;

export function parseSchedule(schedule: string): ScheduleEntry[] {
  const entries: ScheduleEntry[] = [];
  let match;

  // 정규식 초기화 (global flag 사용 시 필수)
  PATTERN.lastIndex = 0;

  while ((match = PATTERN.exec(schedule)) !== null) {
    const dayPart = match[1].trim().replace(/^,\s*/, ''); // 앞부분 쉼표 제거
    const timePart = match[2];

    const days = parseDayPart(dayPart);
    const times = timePart.split(',').map((t) => t.trim());

    if (days.length > 0) {
      entries.push({ days, times });
    }
  }

  return entries;
}

function parseDayPart(dayPart: string): number[] {
  // 1. 범위 처리 (~)
  if (dayPart.includes('~')) {
    const [startStr, endStr] = dayPart.split('~').map((s) => s.trim());
    const startDay = DAY_MAP[startStr];
    const endDay = DAY_MAP[endStr];

    if (startDay !== undefined && endDay !== undefined) {
      const days = [];
      // 요일 순환 처리 (하지만 보통 월~금이므로 1~5)
      // 그냥 간단히 start <= end 가정 (일요일 시작이 0이라 좀 꼬일 수 있음)
      // 예: 금(5) ~ 월(1) -> 5, 6, 0, 1
      let current = startDay;
      while (current !== endDay) {
        days.push(current);
        current = (current + 1) % 7;
      }
      days.push(endDay);
      return days;
    }
  }

  // 2. 단일 또는 쉼표 나열 처리 (화요일, 목요일)
  // 정규식에서 이미 쉼표로 크게 잘렸을 수도 있지만, "화요일, 목요일" 처럼 묶여있을 수도 있음
  // 하지만 KOPIS 데이터 특성상 보통 "화요일(20:00), 목요일(20:00)" 식이 많음
  // 그래도 "화,목(20:00)" 형식이 있다면 여기서 처리
  const parts = dayPart.split(/,|\s+/).filter(Boolean); // 콤마나 공백으로 분리
  const days: number[] = [];

  for (const part of parts) {
    const day = DAY_MAP[part];
    if (day !== undefined) {
      days.push(day);
    }
    // HOL 등 처리 안된건 무시
  }

  return days;
}

/**
 * 주어진 기간 내에서 스케줄에 해당하는 실제 공연 날짜를 반환
 */
export function getActualConcertDates(
  startDate: Date,
  endDate: Date,
  schedule: string | null
): Date[] {
  const start = startOfDay(startDate);
  const end = startOfDay(endDate);

  if (!schedule) {
    return eachDayOfInterval({ start, end });
  }

  const entries = parseSchedule(schedule);
  if (entries.length === 0) {
    // 파싱 실패 시에도 fallback으로 모든 날짜 반환
    return eachDayOfInterval({ start, end });
  }

  const resultDates: Date[] = [];
  const validDays = new Set<number>();

  // 모든 유효 요일 수집
  entries.forEach((entry) => {
    entry.days.forEach((d) => validDays.add(d));
  });

  const interval = eachDayOfInterval({ start, end });

  for (const date of interval) {
    const dayOfWeek = getDay(date);
    if (validDays.has(dayOfWeek)) {
      resultDates.push(date);
    }
  }

  // HACK: 공휴일은 처리하지 않음

  return resultDates;
}
