'use server';

import { getServerSession } from 'next-auth';

import { ERROR_CODES } from '@/shared/constants/error-codes';
import { authOptions } from '@/shared/lib/auth';
import { ActionResponse } from '@/shared/types/action-response';

import * as authRepository from './db';

export async function getLinkedAccounts(): Promise<ActionResponse<string[]>> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  try {
    const accounts = await authRepository.findLinkedAccounts(session.user.id);
    return { success: true, data: accounts.map((account) => account.provider) };
  } catch (error) {
    console.error('getLinkedAccounts Error:', error);
    return {
      success: false,
      error: {
        code: ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch linked accounts',
      },
    };
  }
}

export async function getUserProfile(): Promise<ActionResponse<unknown>> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  try {
    const user = await authRepository.findUserProfile(session.user.id);

    if (!user) {
      return {
        success: false,
        error: { code: ERROR_CODES.NOT_FOUND, message: 'User not found' },
      };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error('getUserProfile Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to fetch profile' },
    };
  }
}
