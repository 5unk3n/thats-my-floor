'use server';

import { ERROR_CODES } from '@/shared/constants/error-codes';
import { ActionResponse } from '@/shared/types/action-response';

import { CreateSetlistInput, Setlist } from '../types';
import * as setlistRepository from './db';

// --- Mutations ONLY ---

export async function createSetlist(data: CreateSetlistInput): Promise<ActionResponse<Setlist>> {
  try {
    const setlist = await setlistRepository.createSetlist(data);

    return { success: true, data: setlist };
  } catch (error) {
    console.error('Failed to create setlist:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to create setlist' },
    };
  }
}
