import { LRUCache } from 'lru-cache';

// Options for the LRU Cache
const options = {
  // Max number of items
  max: 500,

  // Time to live (1 hour)
  ttl: 1000 * 60 * 60,

  // Allow storing null values (optional, but good for caching 'not found' results if needed)
  allowStale: false,
};

// Create a singleton cache instance for Search Results
export const searchCache = new LRUCache<string, {}>(options);
