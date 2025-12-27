import LinkedAccounts from '@/features/auth/components/LinkedAccounts';
import { getLinkedAccounts } from '@/features/auth/server/actions';

export async function LinkedAccountsFetcher() {
  const response = await getLinkedAccounts();
  const linkedProviders = response.success ? response.data : [];

  return <LinkedAccounts linkedProviders={linkedProviders || []} />;
}
