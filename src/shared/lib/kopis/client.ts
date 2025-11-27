import { XMLParser } from 'fast-xml-parser';

import { KopisConcertDetailResponse, KopisConcertListResponse } from './types';

const KOPIS_BASE_URL = 'http://www.kopis.or.kr/openApi/restful';
const KOPIS_API_KEY = process.env.KOPIS_API_KEY;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

async function fetchKopis<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!KOPIS_API_KEY) {
    throw new Error('KOPIS_API_KEY is not defined');
  }

  const queryParams = new URLSearchParams({
    service: KOPIS_API_KEY,
    ...params,
  });

  const url = `${KOPIS_BASE_URL}/${endpoint}?${queryParams.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`KOPIS API Error: ${response.status} ${response.statusText}`);
  }

  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder('utf-8');
  const xmlText = decoder.decode(buffer);
  const jsonData = parser.parse(xmlText);

  return jsonData as T;
}

export const kopisClient = {
  getConcertList: async (params: {
    stdate: string; // 시작일 (YYYYMMDD)
    eddate: string; // 종료일 (YYYYMMDD)
    cpage: string; // 현재 페이지
    rows: string; // 페이지당 목록 수
    shcate?: string; // 장르 코드
    signgucode?: string; // 지역 코드
    shprfnm?: string; // 공연명
  }) => {
    return fetchKopis<KopisConcertListResponse>('pblprfr', params);
  },

  getConcertDetail: async (mt20id: string) => {
    return fetchKopis<KopisConcertDetailResponse>(`pblprfr/${mt20id}`);
  },
};
