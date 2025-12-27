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
