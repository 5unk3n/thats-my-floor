import { describe, expect, it } from 'vitest';

import { getActualConcertDates, parseSchedule } from './parse-schedule';

describe('parseSchedule', () => {
  it('should parse simple schedule correctly', () => {
    const input = '토요일(19:00), 일요일(18:00)';
    const result = parseSchedule(input);
    expect(result).toEqual([
      { days: [6], times: ['19:00'] },
      { days: [0], times: ['18:00'] },
    ]);
  });

  it('should parse multiple time schedule correctly', () => {
    const input = '금요일(19:30), 토요일(15:00,19:00), 일요일(14:00,18:00)';
    const result = parseSchedule(input);
    expect(result).toEqual([
      { days: [5], times: ['19:30'] },
      { days: [6], times: ['15:00', '19:00'] },
      { days: [0], times: ['14:00', '18:00'] },
    ]);
  });

  it('should parse range schedule correctly', () => {
    const input = '화요일 ~ 금요일(20:00), 토요일(15:00,19:00), 일요일(15:00)';
    const result = parseSchedule(input);
    expect(result).toEqual([
      { days: [2, 3, 4, 5], times: ['20:00'] },
      { days: [6], times: ['15:00', '19:00'] },
      { days: [0], times: ['15:00'] },
    ]);
  });

  it('should handle holiday (HOL) as empty or ignored', () => {
    const input = 'HOL(15:00,19:00)';
    const result = parseSchedule(input);
    expect(result).toEqual([]);
  });
});

describe('getActualConcertDates', () => {
  it('should generate correct dates for a given schedule', () => {
    const startDate = new Date('2024-01-01'); // Monday
    const endDate = new Date('2024-01-14'); // Sunday next week
    // 2 weeks range

    // Case: "토요일(19:00)" -> Should be Jan 6 (Sat) and Jan 13 (Sat)
    const dates = getActualConcertDates(startDate, endDate, '토요일(19:00)');

    expect(dates).toHaveLength(2);
    expect(dates[0].getDate()).toBe(6);
    expect(dates[1].getDate()).toBe(13);
  });
});
