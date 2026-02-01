import { SharedArray } from 'k6/data';

// Load IDs from JSON file efficiently
const concertIds = new SharedArray('valid concert ids', function () {
  return JSON.parse(open('../data/concert-ids.json'));
});

export function getRandomConcertId() {
  const randomIndex = Math.floor(Math.random() * concertIds.length);
  return concertIds[randomIndex];
}

export function getFixedConcertId() {
  // Always return the first ID for "Single Concert" scenarios to ensure consistency
  return concertIds[0];
}
