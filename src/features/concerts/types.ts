export interface Concert {
  id: string;
  title: string;
  posterUrl: string;
  startDate: string;
  endDate: string;
  place: string;
  status: string;
}

export interface BookingLink {
  name: string;
  url: string;
}

export interface ConcertDetail extends Concert {
  runtime: string;
  price: string;
  description: string;
  images: string[];
  schedule: string;
  relates: BookingLink[];
  artists: { id: string; name: string }[];
}

export interface ConcertFilterParams {
  page?: number;
  size?: number;
  type?: 'DOMESTIC' | 'GLOBAL' | 'FESTIVAL';
  startDate?: string;
  endDate?: string;
  keyword?: string;
}

export interface ConcertFilterState {
  region?: string;
  genre?: string;
  page: number;
}

export const REGIONS = [
  { code: '11', name: '서울' },
  { code: '28', name: '인천' },
  { code: '41', name: '경기' },
  { code: '26', name: '부산' },
  { code: '27', name: '대구' },
  { code: '29', name: '광주' },
  { code: '30', name: '대전' },
  { code: '31', name: '울산' },
  { code: '36', name: '세종' },
  { code: '51', name: '강원' },
  { code: '43', name: '충북' },
  { code: '44', name: '충남' },
  { code: '45', name: '전북' },
  { code: '46', name: '전남' },
  { code: '47', name: '경북' },
  { code: '48', name: '경남' },
  { code: '50', name: '제주' },
];

export const CONCERT_TYPES = [
  { code: 'DOMESTIC', name: '국내공연' },
  { code: 'GLOBAL', name: '내한공연' },
  { code: 'FESTIVAL', name: '페스티벌' },
];
