import { lastFmClient } from '@/shared/lib/lastfm/client';
import { prisma } from '@/shared/lib/prisma';

export const findLinkedAccounts = async (userId: string) => {
  return prisma.account.findMany({
    where: { userId },
    select: { provider: true },
  });
};

export const findUserProfile = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, image: true },
  });
};

export const linkLastFmAccount = async (userId: string, token: string) => {
  // 1. Exchange token for session
  const sessionData = await lastFmClient.getSession(token);

  if (!sessionData || !sessionData.session) {
    throw new Error('Failed to get Last.fm session');
  }

  const { name: lastfmUsername, key: sessionKey } = sessionData.session;

  // 2. Save to Account table
  // Last.fm doesn't use standard OAuth2, so we adapt it to the Account model
  return prisma.account.upsert({
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
};

export const getLastFmSession = async (userId: string) => {
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
};

export const unlinkLastFmAccount = async (userId: string) => {
  return prisma.account.deleteMany({
    where: {
      userId,
      provider: 'lastfm',
    },
  });
};
