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

export interface ConcertDetailModel extends Concert {
  runtime: string;
  price: string;
  description: string;
  images: string[];
  schedule: string;
  relates: BookingLink[];
  artists: { id: string; mbid: string; name: string }[];
  region?: string;
}

export interface ConcertFilterParams {
  page?: number;
  size?: number;
  type?: 'DOMESTIC' | 'GLOBAL' | 'FESTIVAL';
  region?: 'METRO' | 'OTHERS';
}

export interface ConcertFilterState {
  region?: string;
  genre?: string;
  page: number;
}

export const REGIONS = [
  { code: 'METRO', name: '수도권' },
  { code: 'OTHERS', name: '비수도권' },
];

export const CONCERT_TYPES = [
  { code: 'DOMESTIC', name: '국내공연' },
  { code: 'GLOBAL', name: '내한공연' },
  { code: 'FESTIVAL', name: '페스티벌' },
];
