'use server';

import { NotificationSettings, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { ERROR_CODES } from '@/shared/constants/error-codes';
import { authOptions } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { ActionResponse } from '@/shared/types/action-response';

type NotificationWithConcert = Prisma.NotificationGetPayload<{
  include: {
    concert: {
      select: {
        id: true;
        title: true;
        posterUrl: true;
        startDate: true;
      };
    };
  };
}>;

export async function getNotifications(
  page = 1,
  limit = 20
): Promise<
  ActionResponse<{
    notifications: NotificationWithConcert[];
    total: number;
    totalPages: number;
    currentPage: number;
    unreadCount: number;
  }>
> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  try {
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

    const data = {
      notifications: notifications.map((n) => ({
        ...n,
        concert: n.concert
          ? {
              id: n.concert.id,
              title: n.concert.title,
              posterUrl: n.concert.posterUrl,
              startDate: n.concert.startDate,
            }
          : null,
      })),
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      unreadCount,
    };

    return { success: true, data };
  } catch (error) {
    console.error('getNotifications Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to fetch notifications' },
    };
  }
}

export async function markAsRead(notificationId: number): Promise<ActionResponse> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  try {
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
    return { success: true, data: undefined };
  } catch (error) {
    console.error('markAsRead Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to mark as read' },
    };
  }
}

export async function markAllAsRead(): Promise<ActionResponse> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  try {
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
    return { success: true, data: undefined };
  } catch (error) {
    console.error('markAllAsRead Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to mark all as read' },
    };
  }
}

export async function getNotificationSettingsAction(): Promise<
  ActionResponse<NotificationSettings>
> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  try {
    let settings = await prisma.notificationSettings.findUnique({
      where: { userId: session.user.id },
    });

    if (!settings) {
      // Should be created on signup, but fallback just in case
      settings = await prisma.notificationSettings.create({
        data: { userId: session.user.id },
      });
    }

    return { success: true, data: settings };
  } catch (error) {
    console.error('getNotificationSettings Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to fetch settings' },
    };
  }
}

export async function updateNotificationSettingsAction(
  data: Partial<{
    ticketOpenAlert: boolean;
    concertRegistrationAlert: boolean;
    emailNotification: boolean;
  }>
): Promise<ActionResponse> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  try {
    await prisma.notificationSettings.update({
      where: { userId: session.user.id },
      data,
    });

    revalidatePath('/mypage');
    return { success: true, data: undefined };
  } catch (error) {
    console.error('updateNotificationSettings Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to update settings' },
    };
  }
}
