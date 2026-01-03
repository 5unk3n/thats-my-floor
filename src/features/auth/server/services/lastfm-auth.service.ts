import { lastFmClient } from '@/shared/lib/lastfm/client';
import { prisma } from '@/shared/lib/prisma';

export async function linkLastFmAccount(userId: string, token: string) {
  // 1. Exchange token for session
  const sessionData = await lastFmClient.getSession(token);

  if (!sessionData || !sessionData.session) {
    throw new Error('Failed to get Last.fm session');
  }

  const { name: lastfmUsername, key: sessionKey } = sessionData.session;

  // 2. Save to Account table
  // Last.fm doesn't use standard OAuth2, so we adapt it to the Account model
  return await prisma.account.upsert({
    where: {
      provider_providerAccountId: {
        provider: 'lastfm',
        providerAccountId: lastfmUsername, // Use username as unique ID for Provider
      },
    },
    update: {
      access_token: sessionKey, // Store session key as access token
      userId,
    },
    create: {
      userId,
      type: 'oauth', // Using 'oauth' as a close approximation
      provider: 'lastfm',
      providerAccountId: lastfmUsername,
      access_token: sessionKey,
    },
  });
}

export async function getLastFmSession(userId: string) {
  const account = await prisma.account.findFirst({
    where: {
      userId,
      provider: 'lastfm',
    },
    select: {
      providerAccountId: true, // username
      access_token: true, // session key
    },
  });

  if (!account) return null;

  return {
    username: account.providerAccountId,
    sessionKey: account.access_token,
  };
}

export async function unlinkLastFmAccount(userId: string) {
  return await prisma.account.deleteMany({
    where: {
      userId,
      provider: 'lastfm',
    },
  });
}
