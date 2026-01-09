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

export const findAccount = async (userId: string, provider: string) => {
  return prisma.account.findFirst({
    where: {
      userId,
      provider,
    },
  });
};

export const deleteAccount = async (userId: string, provider: string) => {
  return prisma.account.deleteMany({
    where: {
      userId,
      provider,
    },
  });
};

interface UpsertAccountParams {
  userId: string;
  provider: string;
  providerAccountId: string;
  accessToken?: string;
  refreshToken?: string;
  type: string;
}

export const upsertAccount = async (params: UpsertAccountParams) => {
  const { userId, provider, providerAccountId, accessToken, refreshToken, type } = params;

  return prisma.account.upsert({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId,
      },
    },
    update: {
      access_token: accessToken,
      refresh_token: refreshToken,
      userId,
    },
    create: {
      userId,
      type,
      provider,
      providerAccountId,
      access_token: accessToken,
      refresh_token: refreshToken,
    },
  });
};
