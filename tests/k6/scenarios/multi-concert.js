import { check } from 'k6';
import http from 'k6/http';

import { CONFIG } from '../config.js';
import { getRandomConcertId } from '../utils/random-data.js';

// Configuration for Multi Concert (Cold Cache / DB Pool Limit)
// Target is lower because DB connection pool (5-10) will be the bottleneck
const TARGET_RPS = __ENV.RPS ? parseInt(__ENV.RPS) : 10;

export const options = {
  scenarios: {
    multi_concert_load: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 10,
      maxVUs: 50, // Limit VUs as we expect DB bottlenecks, not client CPU
      stages: [
        { target: TARGET_RPS, duration: '1m' },
        { target: TARGET_RPS, duration: '3m' },
        { target: 0, duration: '1m' },
      ],
    },
  },
  thresholds: CONFIG.THRESHOLDS.COLD,
};

export default function () {
  // Use random ID to force Cold Start / DB Hits
  const concertId = getRandomConcertId();
  const res = http.get(`${CONFIG.BASE_URL}/concerts/${concertId}`, {
    tags: { name: 'concert_detail', type: 'cold' },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Note: No sleep needed - ramping-arrival-rate controls pacing
}
