import { getServerSession } from 'next-auth';

import SpotifyConnect from '@/features/artists/components/SpotifyConnect';
import { authOptions } from '@/shared/lib/auth';

export async function SpotifyConnectFetcher() {
  const session = await getServerSession(authOptions);
  const isConnected = !!session?.user?.accessToken;

  return <SpotifyConnect isConnected={isConnected} />;
}
