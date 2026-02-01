import { check, sleep } from 'k6';
import http from 'k6/http';

import { CONFIG } from '../config.js';
import { getRandomConcertId } from '../utils/random-data.js';

export const options = {
  scenarios: {
    smoke_test: {
      executor: 'constant-vus',
      vus: 1,
      duration: '30s',
    },
  },
  thresholds: CONFIG.THRESHOLDS.WARM,
};

export default function () {
  // 1. Visit Main Page
  const resMain = http.get(CONFIG.BASE_URL);
  check(resMain, {
    'Main Page status is 200': (r) => r.status === 200,
  });

  sleep(1);

  // 2. Visit a random Concert Detail Page
  const concertId = getRandomConcertId();
  const resConcert = http.get(`${CONFIG.BASE_URL}/concerts/${concertId}`);

  check(resConcert, {
    'Concert Page status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
