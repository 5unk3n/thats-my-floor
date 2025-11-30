import { NextResponse } from 'next/server';

import { collectConcerts } from '@/features/concerts/server/collector';
import { notificationService } from '@/features/notifications/server/services';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', {
      status: 401,
    });
  }

  try {
    const newConcerts = await collectConcerts();

    for (const concert of newConcerts) {
      if (concert.artistId) {
        await notificationService.notifyConcertRegistration(concert.id);
      }
    }

    return NextResponse.json({ success: true, count: newConcerts.length });
  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
