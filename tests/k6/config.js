export const CONFIG = {
  BASE_URL: __ENV.BASE_URL || 'https://thatsmyfloor.live',
  THRESHOLDS: {
    // Warm Cache Targets (Google RAIL)
    WARM: {
      http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
      http_req_failed: ['rate<0.01'], // Error rate < 1%
    },
    // Cold Cache Targets (Standard Web)
    COLD: {
      http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2s
      http_req_failed: ['rate<0.01'],
    },
  },
};
