'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/shared/lib/auth';

import {
  getNotificationsFromDB,
  markAllNotificationsAsReadInDB,
  markNotificationAsReadInDB,
} from './db';

export async function getNotifications() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  return await getNotificationsFromDB(session.user.id);
}

export async function markNotificationAsRead(notificationId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await markNotificationAsReadInDB(notificationId, session.user.id);
  revalidatePath('/notifications'); // Assuming a notifications page will exist
}

export async function markAllNotificationsAsRead() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await markAllNotificationsAsReadInDB(session.user.id);
  revalidatePath('/notifications');
}
