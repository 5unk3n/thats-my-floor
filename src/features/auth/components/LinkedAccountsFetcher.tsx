import { getServerSession } from 'next-auth';

import LinkedAccounts from '@/features/auth/components/LinkedAccounts';
import * as authRepository from '@/features/auth/server/db';
import { authOptions } from '@/shared/lib/auth';

export async function LinkedAccountsFetcher() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const accounts = await authRepository.findLinkedAccounts(session.user.id);
  const linkedProviders = accounts.map((a) => a.provider);

  return <LinkedAccounts linkedProviders={linkedProviders || []} />;
}
