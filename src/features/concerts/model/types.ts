export interface Concert {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  venue: string;
  posterUrl: string;
  genre: string;
  state: string;
  openRun: boolean;
}

export interface ConcertFilterState {
  region?: string;
  genre?: string;
  page: number;
}

export const REGIONS = [
  { code: '11', name: '서울' },
  { code: '41', name: '경기' },
  { code: '28', name: '인천' },
  { code: '26', name: '부산' },
  { code: '27', name: '대구' },
  { code: '30', name: '대전' },
  { code: '29', name: '광주' },
  { code: '31', name: '울산' },
  { code: '36', name: '세종' },
  { code: '42', name: '강원' },
  { code: '43', name: '충북' },
  { code: '44', name: '충남' },
  { code: '45', name: '전북' },
  { code: '46', name: '전남' },
  { code: '47', name: '경북' },
  { code: '48', name: '경남' },
  { code: '50', name: '제주' },
];

export const GENRES = [
  { code: 'CCCD', name: '대중음악' },
  { code: 'FESTIVAL', name: '페스티벌' },
];
