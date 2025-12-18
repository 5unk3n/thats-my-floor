'use server';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export async function getLinkedAccounts() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [];
  }

  const accounts = await prisma.account.findMany({
    where: { userId: session.user.id },
    select: { provider: true },
  });

  return accounts.map((account) => account.provider);
}
