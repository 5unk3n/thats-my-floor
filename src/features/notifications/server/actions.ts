'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';

export async function getNotifications(page = 1, limit = 20) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const skip = (page - 1) * limit;

  const [notifications, total] = await Promise.all([
    prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { sentAt: 'desc' },
      skip,
      take: limit,
      include: {
        concert: {
          select: {
            id: true,
            title: true,
            posterUrl: true,

            startDate: true,
          },
        },
      },
    }),
    prisma.notification.count({
      where: { userId: session.user.id },
    }),
  ]);

  const unreadCount = await prisma.notification.count({
    where: {
      userId: session.user.id,
      readAt: null,
    },
  });

  return {
    notifications: notifications.map((n) => ({
      ...n,
      concert: n.concert
        ? {
            id: n.concert.id,
            title: n.concert.title,
            posterUrl: n.concert.posterUrl,
            openDate: n.concert.startDate,
          }
        : null,
    })),
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    unreadCount,
  };
}

export async function markAsRead(notificationId: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await prisma.notification.update({
    where: {
      id: notificationId,
      userId: session.user.id, // Ensure ownership
    },
    data: {
      readAt: new Date(),
    },
  });

  revalidatePath('/notifications');
}

export async function markAllAsRead() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await prisma.notification.updateMany({
    where: {
      userId: session.user.id,
      readAt: null,
    },
    data: {
      readAt: new Date(),
    },
  });

  revalidatePath('/notifications');
}

export async function getNotificationSettingsAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const settings = await prisma.notificationSettings.findUnique({
    where: { userId: session.user.id },
  });

  if (!settings) {
    // Should be created on signup, but fallback just in case
    return await prisma.notificationSettings.create({
      data: { userId: session.user.id },
    });
  }

  return settings;
}

export async function updateNotificationSettingsAction(
  data: Partial<{
    ticketOpenAlert: boolean;
    concertRegistrationAlert: boolean;
    emailNotification: boolean;
  }>
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await prisma.notificationSettings.update({
    where: { userId: session.user.id },
    data,
  });

  revalidatePath('/mypage');
}
