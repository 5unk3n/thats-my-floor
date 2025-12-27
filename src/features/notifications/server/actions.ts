'use server';
import { NotificationSettings, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { ERROR_CODES } from '@/shared/constants/error-codes';
import { authOptions } from '@/shared/lib/auth';
import { ActionResponse } from '@/shared/types/action-response';

import * as notificationRepository from './db';
import * as notificationService from './services/notification.service';

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
      notificationRepository.findNotifications(session.user.id, skip, limit),
      notificationRepository.countNotifications(session.user.id),
    ]);

    const unreadCount = await notificationRepository.countUnreadNotifications(session.user.id);

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
    const settings = await notificationService.getNotificationSettings(session.user.id);
    return { success: true, data: settings };
  } catch (error) {
    console.error('getNotificationSettings Error:', error);
    return {
      success: false,
      error: { code: ERROR_CODES.INTERNAL_SERVER_ERROR, message: 'Failed to fetch settings' },
    };
  }
}

// --- Mutations ONLY ---

export async function markAsRead(notificationId: number): Promise<ActionResponse> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      success: false,
      error: { code: ERROR_CODES.UNAUTHORIZED, message: 'Unauthorized' },
    };
  }

  try {
    await notificationRepository.updateNotificationReadStatus(notificationId, session.user.id);

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
    await notificationRepository.updateAllNotificationsReadStatus(session.user.id);

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
    await notificationRepository.updateNotificationSettingsOnly(session.user.id, data);

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
