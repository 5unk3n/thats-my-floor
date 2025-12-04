import { getFirebaseAdmin } from '@/shared/lib/firebase-admin';
import { prisma } from '@/shared/lib/prisma';

export const notificationService = {
  notifyConcertRegistration: async (concertId: string) => {
    const concert = await prisma.concert.findUnique({
      where: { id: concertId },
      include: { artist: true },
    });

    if (!concert || !concert.artistId) return;

    // Find users who follow this artist and have concert registration alert enabled
    const followers = await prisma.userArtist.findMany({
      where: {
        artistId: concert.artistId,
        user: {
          notificationSettings: {
            concertRegistrationAlert: true,
          },
        },
      },
      include: {
        user: {
          include: {
            devices: true,
          },
        },
      },
    });

    console.log(
      `[NotificationService] Concert ${concert.title}: Found ${followers.length} followers to notify.`
    );

    const title = '새로운 공연 소식';
    const body = `'${concert.artist?.name}'의 새 공연 '${concert.title}' 정보가 등록되었습니다.`;

    for (const follower of followers) {
      const user = follower.user;
      const tokens = user.devices.map((d) => d.fcmToken);

      if (tokens.length === 0) continue;

      try {
        const message = {
          notification: {
            title,
            body,
          },
          data: {
            url: `/concerts/${concert.id}`,
            concertId: concert.id,
            type: 'CONCERT_REGISTRATION',
          },
          tokens: tokens,
        };

        const response = await getFirebaseAdmin().messaging().sendEachForMulticast(message);

        if (response.successCount > 0) {
          await prisma.notification.create({
            data: {
              userId: user.id,
              type: 'CONCERT_REGISTRATION',
              title,
              body,
              concertId: concert.id,
              sentAt: new Date(),
            },
          });
        }
      } catch (error) {
        console.error(`[NotificationService] Failed to send FCM to user ${user.id}:`, error);
      }
    }
  },

  getNotificationSettings: async (userId: string) => {
    const settings = await prisma.notificationSettings.findUnique({
      where: { userId },
    });

    if (!settings) {
      // Create default settings if not exists
      return await prisma.notificationSettings.create({
        data: { userId },
      });
    }

    return settings;
  },

  updateNotificationSettings: async (
    userId: string,
    settings: {
      ticketOpenAlert?: boolean;
      concertRegistrationAlert?: boolean;
      emailNotification?: boolean;
    }
  ) => {
    return await prisma.notificationSettings.upsert({
      where: { userId },
      update: settings,
      create: {
        userId,
        ...settings,
      },
    });
  },
};
