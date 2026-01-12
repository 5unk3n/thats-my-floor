import { UserRepository } from '@/entities/user';
import { lastFmClient } from '@/shared/lib/lastfm/client';

export const linkLastFmAccount = async (userId: string, token: string) => {
  // 1. Exchange token for session
  const sessionData = await lastFmClient.getSession(token);

  if (!sessionData || !sessionData.session) {
    throw new Error('Failed to get Last.fm session');
  }

  const { name: lastfmUsername, key: sessionKey } = sessionData.session;

  // 2. Save to Account table via User Entity Repository
  return UserRepository.upsertAccount({
    userId,
    provider: 'lastfm',
    providerAccountId: lastfmUsername,
    type: 'oauth',
    accessToken: sessionKey,
  });
};

export const unlinkLastFmAccount = async (userId: string) => {
  return UserRepository.deleteAccount(userId, 'lastfm');
};

export const getLastFmSession = async (userId: string) => {
  const account = await UserRepository.findAccount(userId, 'lastfm');

  if (!account) return null;

  // Transform to session object expected by consumers
  return {
    username: account.providerAccountId,
    sessionKey: account.access_token,
  };
};
