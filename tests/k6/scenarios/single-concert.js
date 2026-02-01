import { check } from 'k6';
import http from 'k6/http';

import { CONFIG } from '../config.js';
import { getFixedConcertId } from '../utils/random-data.js';

// Specific configuration for Single Concert (Warm Cache)
const IS_DRY_RUN = __ENV.DRY_RUN === 'true';
const TARGET_RPS = __ENV.RPS ? parseInt(__ENV.RPS) : IS_DRY_RUN ? 5 : 50;

const STAGES = IS_DRY_RUN
  ? [{ target: TARGET_RPS, duration: '10s' }]
  : [
      { target: TARGET_RPS, duration: '30s' }, // Hammer Effect - rapid spike
      { target: TARGET_RPS, duration: '5m' }, // Hold at peak (0~5min window)
      { target: 0, duration: '30s' }, // Quick drop
    ];

export const options = {
  scenarios: {
    single_concert_load: {
      executor: 'ramping-arrival-rate',
      startRate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 20, // Start with 20 VUs
      maxVUs: 200, // Don't exceed 200 VUs to avoid client-side bottleneck
      stages: STAGES,
    },
  },
  thresholds: CONFIG.THRESHOLDS.WARM,
};

// Fixed ID for "Single Concert" scenario (Warm Cache Focus)
const FIXED_CONCERT_ID = getFixedConcertId();

export default function () {
  const res = http.get(`${CONFIG.BASE_URL}/concerts/${FIXED_CONCERT_ID}`, {
    tags: { name: 'concert_detail' },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Note: No sleep needed - ramping-arrival-rate controls pacing
}
