'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/shared/lib/auth';

import {
  getNotificationsFromDB,
  markAllNotificationsAsReadInDB,
  markNotificationAsReadInDB,
} from './db';
import { notificationService } from './services';

export async function getNotifications() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  return await getNotificationsFromDB(session.user.id);
}

export async function markNotificationAsRead(notificationId: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await markNotificationAsReadInDB(notificationId, session.user.id);
  revalidatePath('/notifications'); // Assuming a notifications page will exist
}

export async function markAllNotificationsAsRead() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await markAllNotificationsAsReadInDB(session.user.id);
  revalidatePath('/notifications');
}

export async function getNotificationSettingsAction() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  return await notificationService.getNotificationSettings(session.user.id);
}

export async function updateNotificationSettingsAction(settings: {
  ticketOpenAlert?: boolean;
  concertRegistrationAlert?: boolean;
  emailNotification?: boolean;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await notificationService.updateNotificationSettings(session.user.id, settings);
  revalidatePath('/mypage');
}
