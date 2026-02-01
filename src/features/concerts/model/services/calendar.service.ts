'use cache';

import { eachDayOfInterval, endOfMonth, format, parseISO, startOfMonth } from 'date-fns';
import { cacheLife, cacheTag } from 'next/cache';

import { ArtistRepository } from '@/entities/artist';
import { ConcertRepository } from '@/entities/concert';

import { getActualConcertDates } from '../../lib/parse-schedule';
import type { CalendarConcert, ConcertType, DayConcerts, MonthCalendarData } from '../types';

/**
 * Raw 공연 데이터를 CalendarConcert 형식으로 변환
 */
function toConcertType(isGlobal: boolean, isFestival: boolean): ConcertType {
  if (isFestival) return 'FESTIVAL';
  if (isGlobal) return 'GLOBAL';
  return 'DOMESTIC';
}

/**
 * 월별 캘린더 데이터 조회 (캐싱)
 */
export async function getMonthCalendarData(
  year: number,
  month: number
): Promise<MonthCalendarData> {
  cacheLife('hours');
  cacheTag(`calendar-${year}-${month}`);

  const concerts = await ConcertRepository.findConcertsByMonth(year, month);

  // 모든 아티스트 mbid 수집
  const allMbids = new Set<string>();
  concerts.forEach((c) => {
    c.artists.forEach((a) => {
      if (a.artist.mbid) {
        allMbids.add(a.artist.mbid);
      }
    });
  });

  // MusicBrainz에서 아티스트 이름 조회
  const mbidArray = Array.from(allMbids);
  const mbArtists =
    mbidArray.length > 0 ? await ArtistRepository.findMusicBrainzArtistsByMbids(mbidArray) : [];

  const mbidToName = new Map(mbArtists.map((a) => [a.gid, a.name]));

  // 해당 월의 모든 날짜 생성
  const monthStart = startOfMonth(new Date(year, month - 1));
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  type CalendarConcertWithDates = CalendarConcert & {
    startDateObj: Date;
    endDateObj: Date;
    schedule: string | null;
  };

  const calendarConcerts: CalendarConcertWithDates[] = concerts.map((c) => ({
    id: c.id,
    title: c.title,
    startDate: format(c.startDate, 'yyyy-MM-dd'),
    endDate: format(c.endDate, 'yyyy-MM-dd'),
    type: toConcertType(c.isGlobal, c.isFestival),
    place: c.place,
    posterUrl: c.posterUrl,
    artistNames: c.artists
      .map((a) => mbidToName.get(a.artist.mbid) || '')
      .filter((name) => name !== ''),
    startDateObj: c.startDate,
    endDateObj: c.endDate,
    schedule: c.schedule,
  }));

  // 각 공연별 실제 진행 날짜 미리 계산
  const concertActiveDates = new Map<string, Set<string>>();
  calendarConcerts.forEach((c) => {
    const dates = getActualConcertDates(c.startDateObj, c.endDateObj, c.schedule);
    const dateSet = new Set(dates.map((d) => format(d, 'yyyy-MM-dd')));
    concertActiveDates.set(c.id, dateSet);
  });

  // 날짜별로 공연 그룹화
  const days: DayConcerts[] = daysInMonth.map((day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const concertsOnDay = calendarConcerts
      .filter((c) => {
        const activeDates = concertActiveDates.get(c.id);
        return activeDates?.has(dateStr) ?? false;
      })
      .map((c) => ({
        id: c.id,
        title: c.title,
        startDate: c.startDate,
        endDate: c.endDate,
        type: c.type,
        place: c.place,
        posterUrl: c.posterUrl,
        artistNames: c.artistNames,
      }));

    return {
      date: dateStr,
      concerts: concertsOnDay,
    };
  });

  return { year, month, days };
}

/**
 * 특정 날짜의 공연 목록 조회
 */
export async function getConcertsForDate(dateStr: string): Promise<CalendarConcert[]> {
  const date = parseISO(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const data = await getMonthCalendarData(year, month);
  const dayData = data.days.find((d) => d.date === dateStr);

  return dayData?.concerts ?? [];
}
