import { Prisma } from '@prisma/client';

import { prisma } from '@/shared/lib/prisma';

// --- Notification Queries ---

export const findNotifications = async (userId: string, skip: number, take: number) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { sentAt: 'desc' },
    skip,
    take,
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
  });
};

export const countNotifications = async (userId: string) => {
  return prisma.notification.count({
    where: { userId },
  });
};

export const countUnreadNotifications = async (userId: string) => {
  return prisma.notification.count({
    where: {
      userId,
      readAt: null,
    },
  });
};

export const updateNotificationReadStatus = async (
  notificationId: number,
  userId: string,
  readAt: Date = new Date()
) => {
  return prisma.notification.update({
    where: {
      id: notificationId,
      userId, // Ensure ownership
    },
    data: {
      readAt,
    },
  });
};

export const updateAllNotificationsReadStatus = async (
  userId: string,
  readAt: Date = new Date()
) => {
  return prisma.notification.updateMany({
    where: {
      userId,
      readAt: null,
    },
    data: {
      readAt,
    },
  });
};

export const createNotification = async (data: Prisma.NotificationUncheckedCreateInput) => {
  return prisma.notification.create({
    data,
  });
};

// --- Notification Settings Queries ---

export const findNotificationSettings = async (userId: string) => {
  return prisma.notificationSettings.findUnique({
    where: { userId },
  });
};

export const createNotificationSettings = async (userId: string) => {
  return prisma.notificationSettings.create({
    data: { userId },
  });
};

export const upsertNotificationSettings = async (
  userId: string,
  data: Prisma.NotificationSettingsUpdateInput
) => {
  return prisma.notificationSettings.upsert({
    where: { userId },
    update: data,
    create: {
      userId,
      ticketOpenAlert: (data.ticketOpenAlert as boolean) ?? true,
      concertRegistrationAlert: (data.concertRegistrationAlert as boolean) ?? true,
      emailNotification: (data.emailNotification as boolean) ?? true,
    },
  });
};

export const updateNotificationSettingsOnly = async (
  userId: string,
  data: Prisma.NotificationSettingsUpdateInput
) => {
  return prisma.notificationSettings.update({
    where: { userId },
    data,
  });
};
