'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/shared/lib/auth';

import { linkLastFmAccount, unlinkLastFmAccount } from '../model/services/lastfm-auth.service';

export async function connectLastFmAction(token: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error('Unauthorized');
  }

  await linkLastFmAccount(session.user.id, token);
  revalidatePath('/mypage');
}

export async function disconnectLastFmAction() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    throw new Error('Unauthorized');
  }

  await unlinkLastFmAccount(session.user.id);
  revalidatePath('/mypage');
}
