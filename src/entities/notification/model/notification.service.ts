import * as notificationRepository from '@/entities/notification/api/notification.queries';
import { getFirebaseAdmin } from '@/shared/lib/firebase/admin';

export async function notifyConcertRegistration(concertId: string, artistNames: string) {
  const concert = await notificationRepository.findConcertForNotification(concertId);

  if (!concert || concert.artists.length === 0) return;

  // Collect all artist IDs from the concert

  const artistIds = concert.artists.map((ca) => ca.artistId);

  // Find users who follow ANY of these artists and have concert registration alert enabled
  const followers = await notificationRepository.findFollowersForNotification(artistIds);

  // Deduplicate users (a user might follow multiple artists in the lineup)
  const uniqueFollowersMap = new Map();
  followers.forEach((f) => {
    uniqueFollowersMap.set(f.userId, f.user);
  });
  const uniqueFollowers = Array.from(uniqueFollowersMap.values());

  console.log(
    `[NotificationService] Concert ${concert.title}: Found ${uniqueFollowers.length} followers to notify.`
  );

  const title = '새로운 공연 소식';
  const body = `'${artistNames}'의 새 공연 '${concert.title}' 정보가 등록되었습니다.`;

  for (const user of uniqueFollowers) {
    // Correctly typed from Prisma result, but if implicit any occurs, use specific type or unknown
    // uniqueFollowers is User[] here based on Prisma query structure
    const tokens = user.devices.map((d: { fcmToken: string }) => d.fcmToken);

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
        await notificationRepository.createNotification({
          userId: user.id,
          type: 'CONCERT_REGISTRATION',
          title,
          body,
          concertId: concert.id,
          sentAt: new Date(),
        });
      }
    } catch (error) {
      console.error(`[NotificationService] Failed to send FCM to user ${user.id}:`, error);
    }
  }
}

export async function getNotificationSettings(userId: string) {
  const settings = await notificationRepository.findNotificationSettings(userId);

  if (!settings) {
    // Create default settings if not exists
    return await notificationRepository.createNotificationSettings(userId);
  }

  return settings;
}

export async function updateNotificationSettings(
  userId: string,
  settings: {
    ticketOpenAlert?: boolean;
    concertRegistrationAlert?: boolean;
    emailNotification?: boolean;
  }
) {
  return await notificationRepository.upsertNotificationSettings(userId, settings);
}
