import { getFirebaseAdmin } from '@/shared/lib/firebase-admin';
import { prisma } from '@/shared/lib/prisma';

export const checkTicketOpenAndSendNotifications = async () => {
  console.log(
    '[TicketOpenScheduler] Feature disabled due to schema changes (ticketOpenDate removed).'
  );
  // Logic disabled until ticketOpenDate is restored or replaced.
  /*
  const now = new Date();

  // Find concerts with ticket open date between now and 1 hour later
  // We check a range to avoid missing concerts if the cron runs slightly off
  // But strictly we want to notify exactly 1 hour before.
  // Given 10 min cron interval, we look for tickets opening in [50 mins, 60 mins] from now?
  // Or simpler: look for tickets opening in [now, now + 1 hour] and check if we already sent notification?
  // Let's go with: Find concerts opening in the next 1 hour (specifically around the 1 hour mark).
  // To be safe with 10 min cron: check for tickets opening between (now + 50min) and (now + 60min).

  const startRange = new Date(now.getTime() + 50 * 60 * 1000);
  const endRange = new Date(now.getTime() + 60 * 60 * 1000);

  const concerts = await prisma.concert.findMany({
    where: {
      ticketOpenDate: {
        gte: startRange,
        lte: endRange,
      },
    },
    include: {
      artist: true,
    },
  });

  console.log(`[TicketOpenScheduler] Found ${concerts.length} concerts opening soon.`);

  for (const concert of concerts) {
    if (!concert.artistId) continue;

    // Find users who follow this artist and have ticket open alert enabled
    const followers = await prisma.userArtist.findMany({
      where: {
        artistId: concert.artistId,
        user: {
          notificationSettings: {
            ticketOpenAlert: true,
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
      `[TicketOpenScheduler] Concert ${concert.prfnm}: Found ${followers.length} followers to notify.`
    );

    for (const follower of followers) {
      const user = follower.user;
      const tokens = user.devices.map((d) => d.fcmToken);

      if (tokens.length === 0) continue;

      // Check if we already sent this notification to this user
      const existingNotification = await prisma.notification.findFirst({
        where: {
          userId: user.id,
          concertId: concert.id,
          type: 'TICKET_OPEN',
        },
      });

      if (existingNotification) {
        console.log(
          `[TicketOpenScheduler] Already notified user ${user.id} for concert ${concert.id}`
        );
        continue;
      }

      const title = '티켓 오픈 임박!';
      const body = `'${concert.artist?.name}'의 공연 '${concert.prfnm}' 티켓 오픈이 1시간 남았습니다.`;

      // Send FCM
      try {
        const message = {
          notification: {
            title,
            body,
          },
          data: {
            url: `/concerts/${concert.id}`,
            concertId: concert.id,
          },
          tokens: tokens,
        };

        const response = await getFirebaseAdmin().messaging().sendEachForMulticast(message);
        console.log(
          `[TicketOpenScheduler] FCM sent to user ${user.id}: ${response.successCount} success, ${response.failureCount} failure`
        );

        // Log to DB
        if (response.successCount > 0) {
          await prisma.notification.create({
            data: {
              userId: user.id,
              type: 'TICKET_OPEN',
              title,
              body,
              concertId: concert.id,
              sentAt: new Date(),
            },
          });
        }
      } catch (error) {
        console.error(`[TicketOpenScheduler] Failed to send FCM to user ${user.id}:`, error);
      }
    }
  }
  */
};
