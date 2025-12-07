import { XMLParser } from 'fast-xml-parser';

import { KopisConcertDetailResponse, KopisConcertListResponse } from './types';

const KOPIS_BASE_URL = 'http://www.kopis.or.kr/openApi/restful';
const KOPIS_API_KEY = process.env.KOPIS_API_KEY;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

// Rate Limiter: KOPIS API 제한 - 1초당 10회
// 안전을 위해 125ms 간격으로 요청 (1초당 최대 8회)
class RateLimiter {
  private queue: Array<() => void> = [];
  private isProcessing = false;
  private readonly minInterval = 125; // 125ms = 1초당 최대 8회
  private lastRequestTime = 0;

  async throttle<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  private async processQueue() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const task = this.queue.shift();

    if (task) {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;

      if (timeSinceLastRequest < this.minInterval) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.minInterval - timeSinceLastRequest)
        );
      }

      this.lastRequestTime = Date.now();
      await task();
    }

    // 다음 작업 처리
    this.processQueue();
  }
}

const rateLimiter = new RateLimiter();

async function fetchKopis<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  if (!KOPIS_API_KEY) {
    throw new Error('KOPIS_API_KEY is not defined');
  }

  return rateLimiter.throttle(async () => {
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
  });
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
    festival?: string; // 페스티벌 여부 (Y/N)
  }) => {
    return fetchKopis<KopisConcertListResponse>('pblprfr', params);
  },

  getConcertDetail: async (mt20id: string) => {
    return fetchKopis<KopisConcertDetailResponse>(`pblprfr/${mt20id}`);
  },

  getFestivalList: async (params: {
    stdate: string;
    eddate: string;
    cpage: string;
    rows: string;
    signgucode?: string;
    shcate?: string;
  }) => {
    return fetchKopis<KopisConcertListResponse>('prffest', params);
  },
};
