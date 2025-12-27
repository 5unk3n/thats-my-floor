'use server';

import { ERROR_CODES } from '@/shared/constants/error-codes';
import { ActionResponse } from '@/shared/types/action-response';

import { SearchResult } from '../types';
import * as searchService from './services/search.service';

export async function searchAction(
  query: string,
  type: 'all' | 'concert' | 'artist' = 'all'
): Promise<ActionResponse<SearchResult>> {
  try {
    const data = await searchService.getSearchResults(query, type);
    return { success: true, data };
  } catch (error) {
    console.error('Search Action Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Search failed' },
    };
  }
}
