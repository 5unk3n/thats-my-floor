import { ArtistService } from '@/entities/artist';
import * as ConcertRepository from '@/entities/concert/api/repository';
import * as NotificationRepository from '@/entities/notification/api/repository';
import { getFirebaseAdmin } from '@/shared/lib/firebase/admin';

export async function notifyConcertRegistration(concertId: string, artistNames: string) {
  const concert = await ConcertRepository.findConcertById(concertId);

  if (!concert || concert.artists.length === 0) return;

  // Collect all artist IDs from the concert
  const artistIds = concert.artists.map((ca) => ca.artistId);

  // Find users who follow ANY of these artists and have concert registration alert enabled
  const followers = await ArtistService.findSubscribedFollowers(artistIds);

  // Deduplicate users (findSubscribedFollowers returns unique users if implemented correctly, but explicit dedup is safe)
  const uniqueFollowersMap = new Map();
  followers.forEach((user) => {
    uniqueFollowersMap.set(user.id, user);
  });
  const uniqueFollowers = Array.from(uniqueFollowersMap.values());

  console.log(
    `[NotificationFeature] Concert ${concert.title}: Found ${uniqueFollowers.length} followers to notify.`
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
        await NotificationRepository.createNotification({
          userId: user.id,
          type: 'CONCERT_REGISTRATION',
          title,
          body,
          concertId: concert.id,
          sentAt: new Date(),
        });
      }
    } catch (error) {
      console.error(`[NotificationFeature] Failed to send FCM to user ${user.id}:`, error);
    }
  }
}
