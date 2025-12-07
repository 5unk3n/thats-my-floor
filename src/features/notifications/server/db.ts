import { prisma } from '@/shared/lib/prisma';

export const createNotificationInDB = async (data: {
  userId: string;
  type: string;
  title: string;
  body: string;
  concertId?: string;
}) => {
  return await prisma.notification.create({
    data,
  });
};

export const getNotificationsFromDB = async (userId: string) => {
  return await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      concert: {
        select: {
          id: true,
          prfnm: true,
          poster: true,
        },
      },
    },
  });
};

export const markNotificationAsReadInDB = async (notificationId: number, userId: string) => {
  // Ensure the notification belongs to the user
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId },
  });

  if (!notification || notification.userId !== userId) {
    throw new Error('Notification not found or unauthorized');
  }

  return await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      readAt: new Date(),
    },
  });
};

export const markAllNotificationsAsReadInDB = async (userId: string) => {
  return await prisma.notification.updateMany({
    where: {
      userId,
      readAt: null,
    },
    data: {
      readAt: new Date(),
    },
  });
};
