import { getServerSession } from 'next-auth';

import { authOptions } from '@/shared/lib/auth';

import { getLastFmSession } from '../model/services/lastfm-auth.service';
import { LastFmConnect } from './LastFmConnect';

export async function LastFmConnectFetcher() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return null;
  }

  const lastFmSession = await getLastFmSession(session.user.id);

  return (
    <LastFmConnect
      initialUsername={lastFmSession?.username}
      apiKey={process.env.LASTFM_API_KEY || ''}
    />
  );
}
