'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { ERROR_CODES } from '@/shared/constants/error-codes';
import { authOptions } from '@/shared/lib/auth';
import { ActionResponse } from '@/shared/types/action-response';

import { linkLastFmAccount, unlinkLastFmAccount } from '../model/services/lastfm-auth.service';

export async function connectLastFmAction(
  token: string
): Promise<ActionResponse<{ username: string }>> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: '로그인이 필요합니다.' },
    };
  }

  try {
    const account = await linkLastFmAccount(session.user.id, token);
    revalidatePath('/mypage');
    return {
      success: true,
      data: { username: account.providerAccountId },
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Last.fm 연결 실패' },
    };
  }
}

export async function disconnectLastFmAction() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error('Unauthorized');
  }

  await unlinkLastFmAccount(session.user.id);
  revalidatePath('/mypage');
}
