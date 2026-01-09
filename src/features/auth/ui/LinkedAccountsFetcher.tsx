import { getServerSession } from 'next-auth';

import { UserRepository } from '@/entities/user';
import { authOptions } from '@/shared/lib/auth';

import LinkedAccounts from './LinkedAccounts';

export async function LinkedAccountsFetcher() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const linkedAccounts = await UserRepository.findLinkedAccounts(session.user.id);
  const linkedProviders = linkedAccounts.map((a) => a.provider);

  return <LinkedAccounts linkedProviders={linkedProviders || []} />;
}
